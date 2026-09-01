import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactPayload, type GovernedContactSubmission } from "@/lib/contactContract";
import { DurableContactDeliveryControl, sendWithBoundedRetry } from "@/lib/contactDeliveryControl";
import { emailPalette } from "@/lib/emailPalette";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function providerConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const noticeVersion = process.env.CONTACT_PRIVACY_NOTICE_VERSION?.trim();
  const storeDirectory = process.env.MARKETING_CONTACT_STORE_DIR?.trim();
  const rateLimitSecret = process.env.MARKETING_CONTACT_RATE_LIMIT_SECRET?.trim();
  const allowedOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!apiKey || !to || !from || !noticeVersion || !storeDirectory || !rateLimitSecret || allowedOrigins.length === 0) return null;
  return { apiKey, to, from, noticeVersion, storeDirectory, rateLimitSecret, allowedOrigins };
}

function buildTextMessage(
  submission: GovernedContactSubmission,
  name: string,
  date: string,
  submissionId: string
): string {
  const campaign = submission.attribution.campaignId || submission.attribution.utmCampaign || "not supplied";
  return [
    `New Project Enquiry - submitted via pixelettemarketing.com on ${date}`,
    "",
    `Submission: ${submissionId}`,
    `Name: ${name}`,
    `Email: ${submission.email}`,
    `Source: ${submission.sourcePage}`,
    `Campaign: ${campaign}`,
    `Privacy notice version: ${submission.noticeVersion}`,
    "",
    "Message:",
    submission.description,
    "",
    `Reply directly to ${submission.email}`
  ].join("\n");
}

function buildEmailHtml(opts: {
  name: string;
  email: string;
  message: string;
  date: string;
  submissionId: string;
  sourcePage: string;
  campaign: string;
}): string {
  const name = escapeHtml(opts.name);
  const email = escapeHtml(opts.email);
  const message = escapeHtml(opts.message).replace(/\n/g, "<br/>");
  const date = escapeHtml(opts.date);
  const submissionId = escapeHtml(opts.submissionId);
  const sourcePage = escapeHtml(opts.sourcePage);
  const campaign = escapeHtml(opts.campaign || "not supplied");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0; padding:0; background-color:${emailPalette.pageBg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${emailPalette.pageBg}; padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; font-family:Helvetica,Arial,sans-serif;">
        <tr><td style="background-color:${emailPalette.headerBg}; border-radius:16px 16px 0 0; padding:34px 32px; text-align:center;">
          <img src="https://www.pixelettemarketing.com/email-logo.png" alt="Pixelette Marketing" width="210" style="display:inline-block; width:210px; max-width:62%; height:auto; border:0;"/>
        </td></tr>
        <tr><td style="background-color:${emailPalette.cardBg}; padding:34px 32px;">
          <span style="display:inline-block; background-color:${emailPalette.pillBg}; color:${emailPalette.pillText}; font-size:11px; font-weight:700; letter-spacing:1.5px; padding:7px 14px; border-radius:999px; text-transform:uppercase;">New Enquiry</span>
          <h1 style="color:${emailPalette.heading}; font-size:26px; font-weight:700; margin:18px 0 6px;">New Project Enquiry</h1>
          <p style="color:${emailPalette.muted}; font-size:13px; margin:0 0 26px;">Submitted via the contact page &middot; ${date}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${emailPalette.panelBg}; border:1px solid ${emailPalette.border}; border-radius:12px;">
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Name:</strong> <span style="color:${emailPalette.body};">${name}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Email:</strong> <a href="mailto:${email}" style="color:${emailPalette.link};">${email}</a></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Message:</strong><div style="color:${emailPalette.body}; margin-top:6px;">${message}</div></td></tr>
            <tr><td style="padding:16px 18px; color:${emailPalette.body}; font-size:13px;">Submission ${submissionId}<br/>Source ${sourcePage}<br/>Campaign ${campaign}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  const configuration = providerConfiguration();
  if (!configuration) {
    return NextResponse.json({ error: "Governed contact route is not configured" }, { status: 503 });
  }
  const mediaType = (req.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength < 0 || contentLength > 16_384) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  const origin = req.headers.get("origin");
  if (!origin || !configuration.allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > 16_384) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const validation = validateContactPayload(body, configuration.noticeVersion);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.code }, { status: 400 });
  }

  const submission = validation.value;
  const sourceAddress = (req.headers.get("x-forwarded-for") ?? "").split(",", 1)[0].trim()
    || req.headers.get("x-real-ip")?.trim()
    || "";
  if (!sourceAddress) {
    return NextResponse.json({ error: "Request source unavailable" }, { status: 400 });
  }
  let control: DurableContactDeliveryControl;
  let decision;
  try {
    control = new DurableContactDeliveryControl({
      entity: "MARKETING",
      storeDirectory: configuration.storeDirectory,
      hmacSecret: configuration.rateLimitSecret,
    });
    decision = await control.begin(submission.eventId, submission, sourceAddress);
  } catch {
    return NextResponse.json({ error: "Durable submission control unavailable" }, { status: 503 });
  }
  if (decision.action === "RATE_LIMITED") {
    return NextResponse.json(
      { error: "Submission rate limit reached" },
      { status: 429, headers: { "Retry-After": String(decision.retryAfterSeconds) } },
    );
  }
  if (decision.action === "IN_PROGRESS") {
    return NextResponse.json({ error: "Submission already in progress" }, { status: 409 });
  }
  if (decision.action === "CONFLICT") {
    return NextResponse.json({ error: "Submission identity conflict" }, { status: 409 });
  }
  if (decision.action === "EXHAUSTED") {
    return NextResponse.json({ error: "Submission retry limit exhausted" }, { status: 503 });
  }
  if (decision.action === "REPLAY") {
    return NextResponse.json({ ok: true, submissionId: decision.submissionId, replayed: true });
  }

  const resend = new Resend(configuration.apiKey);
  const name = `${submission.firstName} ${submission.lastName}`.trim();
  const submissionId = submission.eventId;
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const campaign = submission.attribution.campaignId || submission.attribution.utmCampaign || "";
  const delivery = await sendWithBoundedRetry(
    () => resend.emails.send({
      from: configuration.from,
      to: configuration.to,
      replyTo: submission.email,
      subject: `New Project Enquiry from ${name} - Pixelette Marketing`,
      text: buildTextMessage(submission, name, date, submissionId),
      html: buildEmailHtml({
        name,
        email: submission.email,
        message: submission.description,
        date,
        submissionId,
        sourcePage: submission.sourcePage,
        campaign
      })
    }, { idempotencyKey: decision.idempotencyKey }),
    (result) => !result.error && Boolean(result.data?.id),
  );

  if (!delivery.ok) {
    await control.fail(decision.lease).catch(() => undefined);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
  try {
    await control.complete(decision.lease, delivery.value.data!.id);
  } catch {
    return NextResponse.json({ error: "Delivery receipt could not be committed" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, submissionId, replayed: false });
}
