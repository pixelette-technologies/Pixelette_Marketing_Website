import "server-only";

import type { GovernedContactSubmission } from "@/lib/contactContract";
import type { LeadPayload } from "@/lib/pix";
import { getServiceSupabase } from "@/lib/supabase/server";

const ASSISTANT_SOURCE = "pixelettemarketing.com/assistant";

/**
 * Best-effort persistence. Never throws to the caller — enquiry email delivery
 * must not fail solely because the backup store is unavailable.
 */
export async function saveAssistantContact(input: {
  name: string;
  email: string;
}): Promise<{ ref: string | null }> {
  const supabase = getServiceSupabase();
  if (!supabase) return { ref: null };

  try {
    const { data, error } = await supabase
      .from("assistant_contacts")
      .insert({
        name: input.name,
        email: input.email,
        source: ASSISTANT_SOURCE,
      })
      .select("id")
      .single();

    if (error || !data?.id) return { ref: null };
    return { ref: String(data.id) };
  } catch {
    return { ref: null };
  }
}

export async function saveAssistantEnquiry(
  payload: LeadPayload,
  leadRef?: string | null,
): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (!supabase) return false;

  try {
    const row = {
      event_id: payload.eventId.toLowerCase(),
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      objective: payload.objective || "not stated",
      existing: payload.existing || null,
      deadline: payload.deadline || null,
      success: payload.success || null,
      source: payload.source || ASSISTANT_SOURCE,
      lead_ref: leadRef || null,
    };

    const { error } = await supabase.from("contact_enquiries").upsert(row, {
      onConflict: "event_id",
      ignoreDuplicates: false,
    });

    return !error;
  } catch {
    return false;
  }
}

export async function saveContactSubmission(
  submission: GovernedContactSubmission,
  consentText: string,
  resendMessageId?: string | null,
): Promise<boolean> {
  const supabase = getServiceSupabase();
  if (!supabase) return false;

  const name = `${submission.firstName} ${submission.lastName}`.trim();
  try {
    const row = {
      id: submission.eventId.toLowerCase(),
      event_id: submission.eventId.toLowerCase(),
      first_name: submission.firstName,
      last_name: submission.lastName,
      name,
      email: submission.email,
      company: submission.company ?? null,
      company_website: submission.companyWebsite ?? null,
      improve: submission.improve ?? null,
      message: submission.description,
      consent_given: true as const,
      consent_text: consentText,
      privacy_policy_version: submission.noticeVersion,
      consent_timestamp: new Date().toISOString(),
      source_page: submission.sourcePage,
      attribution: submission.attribution ?? {},
      resend_message_id: resendMessageId ?? null,
    };

    const { error } = await supabase.from("contact_submissions").upsert(row, {
      onConflict: "event_id",
      ignoreDuplicates: false,
    });

    return !error;
  } catch {
    return false;
  }
}
