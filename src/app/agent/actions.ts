'use server';

/**
 * Server actions for the site assistant (`onIdentify` / `onLead`).
 * Do NOT call POST /api/contact — LeadPayload is unsupported there.
 * Do NOT import scoreLead.
 * Do NOT use Resend here — assistant enquiries are stored in Supabase only.
 */

import { headers } from 'next/headers';
import { isEmail, type LeadPayload, type LeadResult } from '@/lib/pix';
import { DurableContactDeliveryControl } from '@/lib/contactDeliveryControl';
import {
  saveAssistantContact,
  saveAssistantEnquiry,
} from '@/lib/enquiryStore';
import { getServiceSupabase } from '@/lib/supabase/server';

const EVENT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LEAD_ENTITY = 'AGENT_LEAD';

const SUCCESS_MESSAGE = 'Thanks, your message has been sent.';
const UNAVAILABLE_MESSAGE =
  'Pixelette Marketing is temporarily unable to receive messages through the assistant. Please try again shortly, or email sales@pixelettemarketing.com.';

function leadProviderConfiguration() {
  const rateLimitSecret = process.env.MARKETING_CONTACT_RATE_LIMIT_SECRET?.trim();
  const supabase = getServiceSupabase();
  if (!rateLimitSecret || !supabase) return null;
  return { rateLimitSecret, supabase };
}

async function sourceAddress(): Promise<string> {
  const requestHeaders = await headers();
  return (
    (requestHeaders.get('x-forwarded-for') ?? '').split(',', 1)[0].trim() ||
    requestHeaders.get('x-real-ip')?.trim() ||
    ''
  );
}

/**
 * Store name/email in Supabase without emailing the team.
 * If Supabase is not configured, return { ref: null } quietly.
 */
export async function identifyAssistant(input: {
  name: string;
  email: string;
}): Promise<{ ref: string | null }> {
  const name = String(input?.name ?? '').trim().slice(0, 120);
  const email = String(input?.email ?? '').trim().slice(0, 200);
  if (!name || !isEmail(email)) return { ref: null };
  return saveAssistantContact({ name, email });
}

/**
 * Persist the assistant discovery enquiry to Supabase only.
 * Never calls Resend or POST /api/contact. Never scores the lead.
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
      supabase: configuration.supabase,
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

  const saved = await saveAssistantEnquiry(clean);
  if (!saved) {
    await control.fail(decision.lease).catch(() => undefined);
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }

  try {
    await control.complete(decision.lease, `supabase_${clean.eventId}`);
  } catch {
    return { status: 'error', message: UNAVAILABLE_MESSAGE };
  }

  return { status: 'success', message: SUCCESS_MESSAGE, ref: clean.eventId };
}
