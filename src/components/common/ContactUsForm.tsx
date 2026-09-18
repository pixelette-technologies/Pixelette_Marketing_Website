"use client";

import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { contactUSvalidationSchema } from "@/validations/contactUsValidation";
import { IMPROVE_OPTIONS } from "@/lib/contactContract";
import {
  Button,
  FormInput,
  FormSelect,
  FormTextArea,
  Heading,
  Text
} from "../feature";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companyWebsite: string;
  improve: string;
  description: string;
  consent: boolean;
  noticeVersion: string;
  formStartedAt: string;
  sourcePage: string;
  _website: string;
}

type SubmitState = "idle" | "success" | "error";

// The three engagement routes on the homepage, and the sentence each one
// seeds into the message box.
//
// THE ROUTE DOES NOT PRESELECT "What are you trying to improve?". It would be
// a guess dressed as data: a Growth Diagnostic is not a statement about demand
// or pipeline, it is a request for a diagnosis, and quietly answering a
// question on the visitor's behalf with an arbitrary mapping is worse than
// leaving it for them. The route seeds the MESSAGE instead — visible, editable,
// and travelling in a field the notification email already renders.
const ENQUIRY_SEEDS: Record<string, string> = {
  diagnostic: "I would like to request a Growth Diagnostic.",
  managed: "I would like to discuss a Managed Growth Programme.",
  embedded: "I would like to discuss an Embedded Growth Team."
};

// Reads ?enquiry= once on mount and seeds the message.
//
// NOT useSearchParams: this form renders on the statically generated home page,
// and useSearchParams would opt the whole route out of static rendering unless
// it were wrapped in a Suspense boundary. The submit handler already reads
// window.location.search directly for attribution, so this is the same
// mechanism, in an effect where window is guaranteed.
//
// It cannot go in initialValues either — that is a useState lazy initializer,
// which runs during the server prerender, where window does not exist.
//
// Only seeds an EMPTY message, so it can never overwrite something typed.
const EnquirySeed: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  useEffect(() => {
    const enquiry = new URLSearchParams(window.location.search).get("enquiry");
    if (!enquiry) return;
    const seed = ENQUIRY_SEEDS[enquiry];
    if (seed && values.description === "") {
      setFieldValue("description", seed);
    }
    // Mount only: re-running would fight the visitor for the box.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const ContactUsForm: React.FC = () => {
  const privacyNoticeUrl = process.env.NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_URL?.trim() ?? "";
  const noticeVersion = process.env.NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_VERSION?.trim() ?? "";
  const consentText = process.env.NEXT_PUBLIC_CONTACT_CONSENT_TEXT?.trim() ?? "";
  const governanceReady = Boolean(privacyNoticeUrl && noticeVersion && consentText);
  const [initialValues] = useState<FormValues>(() => ({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companyWebsite: "",
    improve: "",
    description: "",
    consent: false,
    noticeVersion,
    formStartedAt: new Date().toISOString(),
    sourcePage: "/",
    _website: ""
  }));
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [eventId, setEventId] = useState<string | null>(null);

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitState("idle");
    try {
      const activeEventId = eventId ?? crypto.randomUUID();
      if (!eventId) setEventId(activeEventId);
      const params = new URLSearchParams(window.location.search);
      let referrer = "";
      try {
        const parsed = new URL(document.referrer);
        referrer = `${parsed.origin}${parsed.pathname}`;
      } catch {
        referrer = "";
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          eventId: activeEventId,
          noticeVersion,
          sourcePage: window.location.pathname,
          attribution: {
            campaignId: params.get("campaign_id") ?? "",
            utmSource: params.get("utm_source") ?? "",
            utmMedium: params.get("utm_medium") ?? "",
            utmCampaign: params.get("utm_campaign") ?? "",
            utmContent: params.get("utm_content") ?? "",
            utmTerm: params.get("utm_term") ?? "",
            landingPage: window.location.pathname,
            referrer
          }
        })
      });
      if (response.ok) {
        setSubmitState("success");
        setEventId(null);
        resetForm({
          values: {
            ...initialValues,
            noticeVersion,
            formStartedAt: new Date().toISOString()
          }
        });
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!governanceReady) {
    return (
      <div className='contactUsForm' role='status'>
        <Heading className='h3'>contact form temporarily unavailable</Heading>
        <p>
          The governed privacy notice and consent configuration must be approved before this form
          can accept enquiries.
        </p>
      </div>
    );
  }

  return (
    <div
      className='contactUsForm'
    >
      {/* The brief's form eyebrow and heading. */}
      <Text className='eyebrow'>Start here</Text>
      {/* The brief's form heading. It was `heading_secondry font_family_glory`,
          one of the twelve legacy variants, on a form that renders on six
          routes; .h3 is the same size on the guide's scale. */}
      <Heading className='h3'>Tell us what needs to grow.</Heading>
      <p className='body'>
        Give us enough context to make the first conversation useful. We will
        review the enquiry and come back with the most relevant next step.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={contactUSvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <EnquirySeed />
            <Field type='hidden' name='noticeVersion' />
            <Field type='hidden' name='formStartedAt' />
            <Field type='hidden' name='sourcePage' />
            {/* The spam trap. Its label reads "Website" and it must stay that
                way; the visitor-facing website field is companyWebsite. A real
                field named _website would fail every enquiry as SPAM_REJECTED. */}
            <div aria-hidden='true' style={{ position: "absolute", left: "-10000px" }}>
              <label htmlFor='contact-website'>Website</label>
              <Field id='contact-website' name='_website' tabIndex='-1' autoComplete='off' />
            </div>
            <div className='contactUsFormFlex'>
              <FormInput
                label='First Name'
                name='firstName'
                place='Enter your first name'
              />
              <FormInput
                label='Last Name'
                name='lastName'
                place='Enter your last name'
              />
            </div>
            <FormInput
              label='Work email'
              name='email'
              place='Enter your work email'
              type='email'
            />
            <div className='contactUsFormFlex'>
              <FormInput
                label='Company'
                name='company'
                place='Enter your company name'
              />
              <FormInput
                label='Website'
                name='companyWebsite'
                place='Enter your website'
              />
            </div>
            <FormSelect
              label='What are you trying to improve?'
              name='improve'
              place='Select one'
              options={IMPROVE_OPTIONS}
            />
            <FormTextArea
              label='What is happening now?'
              name='description'
              place='Tell us what you are trying to achieve, what is getting in the way and anything we should know before we speak.'
            />
            <label className='contactUsFormConsent'>
              <Field type='checkbox' name='consent' />
              <span>
                {consentText}{" "}
                <a
                  href={privacyNoticeUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='link'
                >
                  Read the privacy notice
                </a>
              </span>
            </label>
            <Button type='submit' className='primary-full' disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request a growth conversation"}
            </Button>
            {submitState === "success" && (
              <p role='status' style={{ marginTop: "0.625rem", color: "var(--color-ok)" }}>
                Thanks - your message has been sent. We&apos;ll be in touch shortly.
              </p>
            )}
            {submitState === "error" && (
              <p role='alert' style={{ marginTop: "0.625rem", color: "var(--color-danger)" }}>
                Sorry, the governed enquiry route is unavailable. No submission has been confirmed.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
