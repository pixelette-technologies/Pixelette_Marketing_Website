'use server';

/**
 * Server actions for the site assistant (`onIdentify` / `onLead`).
 * Do NOT call POST /api/contact — LeadPayload is unsupported there.
 * Do NOT import scoreLead.
 */

import { randomUUID } from 'node:crypto';
import { mkdir, open } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { isEmail, type LeadPayload, type LeadResult } from '@/lib/pix';
import {
  DurableContactDeliveryControl,
  sendWithBoundedRetry,
} from '@/lib/contactDeliveryControl';
import { emailPalette } from '@/lib/emailPalette';

const EVENT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LEAD_ENTITY = 'AGENT_LEAD';

const SUCCESS_MESSAGE = 'Thanks, your message has been sent.';
const UNAVAILABLE_MESSAGE =
  'Pixelette Marketing is temporarily unable to receive messages through the assistant. Please try again shortly, or email sales@pixelettemarketing.com.';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function leadProviderConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const storeDirectory = process.env.MARKETING_CONTACT_STORE_DIR?.trim();
  const rateLimitSecret = process.env.MARKETING_CONTACT_RATE_LIMIT_SECRET?.trim();
  if (!apiKey || !to || !from || !storeDirectory || !rateLimitSecret) return null;
  return { apiKey, to, from, storeDirectory, rateLimitSecret };
}

async function sourceAddress(): Promise<string> {
  const requestHeaders = await headers();
  return (
    (requestHeaders.get('x-forwarded-for') ?? '').split(',', 1)[0].trim() ||
    requestHeaders.get('x-real-ip')?.trim() ||
    ''
  );
}

function buildLeadText(payload: LeadPayload, date: string): string {
  return [
    `New assistant enquiry - submitted via the pixelettemarketing.com site assistant on ${date}`,
    '',
    `Event: ${payload.eventId}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || 'not supplied'}`,
    `Trying to grow/improve: ${payload.objective || 'not stated'}`,
    `What's happening today: ${payload.existing || 'not supplied'}`,
    `Deadline: ${payload.deadline || 'not supplied'}`,
    `Success looks like: ${payload.success || 'not supplied'}`,
    `Source: ${payload.source || 'not supplied'}`,
    '',
    `Reply directly to ${payload.email}`,
  ].join('\n');
}

function buildLeadHtml(payload: LeadPayload, date: string): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const company = escapeHtml(payload.company || 'not supplied');
  const objective = escapeHtml(payload.objective || 'not stated');
  const existing = escapeHtml(payload.existing || 'not supplied');
  const deadline = escapeHtml(payload.deadline || 'not supplied');
  const success = escapeHtml(payload.success || 'not supplied');
  const source = escapeHtml(payload.source || 'not supplied');
  const event = escapeHtml(payload.eventId);
  const when = escapeHtml(date);

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
          <span style="display:inline-block; background-color:${emailPalette.pillBg}; color:${emailPalette.pillText}; font-size:11px; font-weight:700; letter-spacing:1.5px; padding:7px 14px; border-radius:999px; text-transform:uppercase;">Assistant Enquiry</span>
          <h1 style="color:${emailPalette.heading}; font-size:26px; font-weight:700; margin:18px 0 6px;">New Assistant Enquiry</h1>
          <p style="color:${emailPalette.muted}; font-size:13px; margin:0 0 26px;">Submitted via the site assistant &middot; ${when}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${emailPalette.panelBg}; border:1px solid ${emailPalette.border}; border-radius:12px;">
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Name:</strong> <span style="color:${emailPalette.body};">${name}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Email:</strong> <a href="mailto:${email}" style="color:${emailPalette.link};">${email}</a></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Company:</strong> <span style="color:${emailPalette.body};">${company}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Trying to grow/improve:</strong> <span style="color:${emailPalette.body};">${objective}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">What's happening today:</strong> <span style="color:${emailPalette.body};">${existing}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Deadline:</strong> <span style="color:${emailPalette.body};">${deadline}</span></td></tr>
            <tr><td style="padding:16px 18px; border-bottom:1px solid ${emailPalette.border};"><strong style="color:${emailPalette.heading};">Success looks like:</strong> <span style="color:${emailPalette.body};">${success}</span></td></tr>
            <tr><td style="padding:16px 18px; color:${emailPalette.body}; font-size:13px;">Event ${event}<br/>Source ${source}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Store name/email without emailing the team.
 * If MARKETING_CONTACT_STORE_DIR is missing, return { ref: null } quietly.
 */
export async function identifyAssistant(input: {
  name: string;
  email: string;
}): Promise<{ ref: string | null }> {
  const name = String(input?.name ?? '').trim().slice(0, 120);
  const email = String(input?.email ?? '').trim().slice(0, 200);
  if (!name || !isEmail(email)) return { ref: null };

  const storeDirectory = process.env.MARKETING_CONTACT_STORE_DIR?.trim();
  if (!storeDirectory || !isAbsolute(storeDirectory)) return { ref: null };

  const ref = randomUUID();
  try {
    const directory = join(
      resolve(storeDirectory),
      'assistant-contacts',
    );
    const path = join(directory, `${ref}.json`);
    await mkdir(dirname(path), { recursive: true });
    const handle = await open(path, 'wx', 0o600);
    try {
      await handle.writeFile(
        `${JSON.stringify({
          schemaVersion: 1,
          ref,
          name,
          email,
          capturedAt: new Date().toISOString(),
        })}\n`,
        'utf8',
      );
    } finally {
      await handle.close();
    }
    return { ref };
  } catch {
    return { ref: null };
  }
}

/**
 * One Resend email with discovery fields + DurableContactDeliveryControl.
 * Never calls POST /api/contact. Never scores the lead.
 */
export async function submitAssistantLead(
  payload: LeadPayload,
): Promise<LeadResult> {
  const configuration = leadProviderConfiguration();
  if (!configuration) {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }

  const name = String(payload?.name ?? '').trim().slice(0, 120);
  const email = String(payload?.email ?? '').trim().slice(0, 200);
  const eventId = String(payload?.eventId ?? '');
  if (!name || !isEmail(email) || !EVENT_ID.test(eventId)) {
    return {
      status: 'error',
      message:
        'Something about that submission did not look right. Please try again.',
    };
  }

  const clean: LeadPayload = {
    name,
    email,
    company: String(payload.company ?? '').trim().slice(0, 160),
    objective: String(payload.objective ?? '').trim().slice(0, 4000),
    existing: String(payload.existing ?? '').trim().slice(0, 4000),
    deadline: String(payload.deadline ?? '').trim().slice(0, 200),
    success: String(payload.success ?? '').trim().slice(0, 4000),
    source: String(payload.source ?? '').trim().slice(0, 200),
    eventId: eventId.toLowerCase(),
  };

  const source = await sourceAddress();
  if (!source) {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }

  let control: DurableContactDeliveryControl;
  let decision;
  try {
    control = new DurableContactDeliveryControl({
      entity: LEAD_ENTITY,
      storeDirectory: configuration.storeDirectory,
      hmacSecret: configuration.rateLimitSecret,
    });
    decision = await control.begin(clean.eventId, clean, source);
  } catch {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }

  if (decision.action === 'RATE_LIMITED') {
    return {
      status: 'error',
      message:
        'You have sent a few messages in a short time. Please wait a moment and try again.',
    };
  }
  if (decision.action === 'IN_PROGRESS') {
    return {
      status: 'error',
      message: 'That message is already being sent. Please wait a moment.',
    };
  }
  if (decision.action === 'CONFLICT') {
    return {
      status: 'error',
      message:
        'Something about that submission did not look right. Please try again.',
    };
  }
  if (decision.action === 'EXHAUSTED') {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }
  if (decision.action === 'REPLAY') {
    return {
      status: 'success',
      message: SUCCESS_MESSAGE,
      ref: decision.submissionId,
    };
  }

  const resend = new Resend(configuration.apiKey);
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const delivery = await sendWithBoundedRetry(
    () =>
      resend.emails.send(
        {
          from: configuration.from,
          to: configuration.to,
          replyTo: clean.email,
          subject: `New assistant enquiry from ${clean.name} - Pixelette Marketing`,
          text: buildLeadText(clean, date),
          html: buildLeadHtml(clean, date),
        },
        { idempotencyKey: decision.idempotencyKey },
      ),
    result => !result.error && Boolean(result.data?.id),
  );

  if (!delivery.ok) {
    await control.fail(decision.lease).catch(() => undefined);
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }
  try {
    await control.complete(decision.lease, delivery.value.data!.id);
  } catch {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }
  return { status: 'success', message: SUCCESS_MESSAGE, ref: clean.eventId };
}
