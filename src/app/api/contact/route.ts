import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";

// Resend needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  description?: string;
  dataConsent?: boolean;
  consentVersion?: string;
  // Honeypot — genuine submissions leave this empty.
  companyWebsite?: string;
}

// Bounds mirror the client Yup schema; the server never trusts the client.
const LIMITS = {
  name: { min: 2, max: 50 },
  email: { max: 160 },
  message: { min: 10, max: 500 }
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(opts: {
  name: string;
  email: string;
  message: string;
  date: string;
  submissionId: string;
  consentVersion: string;
  receivedAt: string;
}): string {
  const name = escapeHtml(opts.name);
  const email = escapeHtml(opts.email);
  const message = escapeHtml(opts.message).replace(/\n/g, "<br/>");
  const date = escapeHtml(opts.date);
  const submissionId = escapeHtml(opts.submissionId);
  const consentVersion = escapeHtml(opts.consentVersion);
  const receivedAt = escapeHtml(opts.receivedAt);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0; padding:0; background-color:#0b0b0f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b0f; padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; font-family:Helvetica,Arial,sans-serif;">

        <!-- Header -->
        <tr><td style="background-color:#6d1239; background-image:linear-gradient(135deg,#3d0a22,#a3123f); border-radius:16px 16px 0 0; padding:34px 32px; text-align:center;">
          <img src="https://www.pixelettemarketing.com/email-logo.png" alt="Pixelette Marketing" width="210" style="display:inline-block; width:210px; max-width:62%; height:auto; border:0;"/>
        </td></tr>

        <!-- Body -->
        <tr><td style="background-color:#15151b; padding:34px 32px;">
          <span style="display:inline-block; background-color:#2a2a33; color:#f3b6c8; font-size:11px; font-weight:700; letter-spacing:1.5px; padding:7px 14px; border-radius:999px; text-transform:uppercase;">New Enquiry</span>
          <h1 style="color:#ffffff; font-size:26px; font-weight:700; margin:18px 0 6px;">New Project Enquiry</h1>
          <p style="color:#9296a1; font-size:13px; margin:0 0 26px;">Submitted via the contact page &middot; ${date}</p>

          <p style="color:#6f7480; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">Contact Details</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#101015; border:1px solid #25252e; border-radius:12px;">
            <tr><td style="padding:16px 18px; border-bottom:1px solid #25252e;">
              <div style="color:#6f7480; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Name</div>
              <div style="color:#ffffff; font-size:15px; font-weight:600; margin-top:3px;">${name}</div>
            </td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid #25252e;">
              <div style="color:#6f7480; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Email</div>
              <div style="margin-top:3px;"><a href="mailto:${email}" style="color:#f06292; font-size:15px; font-weight:600; text-decoration:none;">${email}</a></div>
            </td></tr>
            <tr><td style="padding:16px 18px;">
              <div style="color:#6f7480; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Message</div>
              <div style="color:#d7d9df; font-size:15px; line-height:1.6; margin-top:6px;">${message}</div>
            </td></tr>
          </table>

          <p style="color:#6f7480; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:24px 0 12px;">Consent &amp; Provenance</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#101015; border:1px solid #25252e; border-radius:12px;">
            <tr><td style="padding:12px 18px; border-bottom:1px solid #25252e;">
              <span style="color:#6f7480; font-size:12px;">Consent</span>
              <span style="color:#d7d9df; font-size:12px; float:right;">Given &middot; v${consentVersion}</span>
            </td></tr>
            <tr><td style="padding:12px 18px; border-bottom:1px solid #25252e;">
              <span style="color:#6f7480; font-size:12px;">Received (UTC)</span>
              <span style="color:#d7d9df; font-size:12px; float:right;">${receivedAt}</span>
            </td></tr>
            <tr><td style="padding:12px 18px;">
              <span style="color:#6f7480; font-size:12px;">Submission ID</span>
              <span style="color:#d7d9df; font-size:12px; float:right;">${submissionId}</span>
            </td></tr>
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;">
            <tr><td style="background-color:#a3123f; border-radius:10px;">
              <a href="mailto:${email}" style="display:inline-block; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; padding:13px 26px;">Reply to ${name}</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#101015; padding:20px 32px; text-align:center; border-radius:0 0 16px 16px; border-top:1px solid #25252e;">
          <p style="color:#6f7480; font-size:12px; margin:0;">
            Submitted via <a href="https://www.pixelettemarketing.com" style="color:#9296a1; text-decoration:none;">pixelettemarketing.com</a>
            &middot; Reply directly to <a href="mailto:${email}" style="color:#f06292; text-decoration:none;">${email}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden `companyWebsite` field. Accept
  // silently (mirroring the real success shape) so a bot cannot tell it was
  // caught.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation — never trust the client. Bounds mirror the Yup schema.
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const email = clean(body.email).toLowerCase();
  const description = clean(body.description);

  if (firstName.length < LIMITS.name.min || firstName.length > LIMITS.name.max) {
    return NextResponse.json(
      { error: "Please enter your first name (2–50 characters)." },
      { status: 400 }
    );
  }
  if (lastName.length < LIMITS.name.min || lastName.length > LIMITS.name.max) {
    return NextResponse.json(
      { error: "Please enter your last name (2–50 characters)." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email.max) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (
    description.length < LIMITS.message.min ||
    description.length > LIMITS.message.max
  ) {
    return NextResponse.json(
      { error: "Please add a short message (10–500 characters)." },
      { status: 400 }
    );
  }
  if (body.dataConsent !== true) {
    return NextResponse.json(
      { error: "Please accept the privacy notice to continue." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "sales@pixelettemarketing.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Pixelette Marketing <noreply@pixelettemarketing.com>";
  const name = `${firstName} ${lastName}`.trim();

  // Data-minimising provenance: an audit trail that stores consent + a
  // submission id, but never the raw IP address.
  const submissionId = randomUUID();
  const receivedAt = new Date().toISOString();
  const consentVersion = clean(body.consentVersion) || "unversioned";
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New Project Enquiry from ${name} — Pixelette Marketing`,
    text: `New Project Enquiry — submitted via pixelettemarketing.com on ${date}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${description}\n\n--\nConsent: Given (v${consentVersion})\nReceived (UTC): ${receivedAt}\nSubmission ID: ${submissionId}\n\nReply directly to ${email}`,
    html: buildEmailHtml({
      name,
      email,
      message: description,
      date,
      submissionId,
      consentVersion,
      receivedAt
    })
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, submissionId });
}
