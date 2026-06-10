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
  const from = process.env.CONTACT_FROM_EMAIL || "Pixelette Marketing <onboarding@resend.dev>";
  const name = `${firstName} ${lastName ?? ""}`.trim();

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New website enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${description}`,
    html: `<h2>New website enquiry</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(description).replace(/\n/g, "<br/>")}</p>`
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
