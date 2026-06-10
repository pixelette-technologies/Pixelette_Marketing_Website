import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  description?: string;
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
}): string {
  const name = escapeHtml(opts.name);
  const email = escapeHtml(opts.email);
  const message = escapeHtml(opts.message).replace(/\n/g, "<br/>");
  const date = escapeHtml(opts.date);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0; padding:0; background-color:#0b0b0f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b0f; padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; font-family:Helvetica,Arial,sans-serif;">

        <!-- Header -->
        <tr><td style="background-color:#6d1239; background-image:linear-gradient(135deg,#3d0a22,#a3123f); border-radius:16px 16px 0 0; padding:34px 32px; text-align:center;">
          <span style="display:inline-block; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:3px;">PIXELETTE</span>
          <div style="color:#f3b6c8; font-size:12px; letter-spacing:5px; margin-top:4px; text-transform:uppercase;">Marketing</div>
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

  const { firstName, lastName, email, description } = body;
  if (!firstName || !email || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "sales@pixelettemarketing.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Pixelette Marketing <noreply@pixelettemarketing.com>";
  const name = `${firstName} ${lastName ?? ""}`.trim();
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
    text: `New Project Enquiry — submitted via pixelettemarketing.com on ${date}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${description}\n\nReply directly to ${email}`,
    html: buildEmailHtml({ name, email, message: description, date })
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
