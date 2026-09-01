"use client";

import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { contactUSvalidationSchema } from "@/validations/contactUsValidation";
import { Button, FormInput, FormTextArea, Heading } from "../feature";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  consent: boolean;
  noticeVersion: string;
  formStartedAt: string;
  sourcePage: string;
  _website: string;
}

type SubmitState = "idle" | "success" | "error";

const ContactUsForm: React.FC = () => {
  const privacyNoticeUrl = process.env.NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_URL?.trim() ?? "";
  const noticeVersion = process.env.NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_VERSION?.trim() ?? "";
  const consentText = process.env.NEXT_PUBLIC_CONTACT_CONSENT_TEXT?.trim() ?? "";
  const governanceReady = Boolean(privacyNoticeUrl && noticeVersion && consentText);
  const [initialValues] = useState<FormValues>(() => ({
    firstName: "",
    lastName: "",
    email: "",
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
        <Heading className='secondry font_family_glory uppercase'>
          contact form temporarily unavailable
        </Heading>
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
      <Heading className='secondry font_family_glory uppercase'>
        book a call with us
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={contactUSvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='hidden' name='noticeVersion' />
            <Field type='hidden' name='formStartedAt' />
            <Field type='hidden' name='sourcePage' />
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
              label='Email'
              name='email'
              place='Enter your email'
              type='email'
            />
            <FormTextArea
              label='Description'
              name='description'
              place='Write your query here'
            />
            <label style={{ display: "flex", gap: "0.46875rem", alignItems: "flex-start" }}>
              <Field type='checkbox' name='consent' />
              <span>
                {consentText}{" "}
                <a href={privacyNoticeUrl} target='_blank' rel='noreferrer'>
                  Read the privacy notice
                </a>
              </span>
            </label>
            <Button type='submit' className='primary-full' disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book A Call"}
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
