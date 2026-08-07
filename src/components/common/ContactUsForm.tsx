"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  CONSENT_VERSION,
  contactUSvalidationSchema
} from "@/validations/contactUsValidation";
import {
  Button,
  FormCheckbox,
  FormInput,
  FormTextArea,
  Heading
} from "../feature";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  dataConsent: boolean;
  // Honeypot — must stay empty for genuine submissions.
  companyWebsite: string;
}

type SubmitState = "idle" | "success" | "error";

const DEFAULT_ERROR =
  "Sorry, something went wrong. Please try again, or email sales@pixelettemarketing.com.";

const ContactUsForm: React.FC = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    dataConsent: false,
    companyWebsite: ""
  };

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>(DEFAULT_ERROR);

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitState("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consentVersion: CONSENT_VERSION })
      });
      if (response.ok) {
        setSubmitState("success");
        resetForm();
      } else {
        const data = await response.json().catch(() => null);
        setErrorMsg(data?.error || DEFAULT_ERROR);
        setSubmitState("error");
      }
    } catch {
      setErrorMsg(DEFAULT_ERROR);
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className='contactUsForm bg_white'
      data-aos='fade-left'
      data-aos-duration='1000'
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

            {/* Honeypot: hidden from people; bots that fill it are rejected
                silently on the server. Kept out of the tab order and off
                autofill so it never traps a genuine user. */}
            <div
              aria-hidden='true'
              style={{
                position: "absolute",
                left: "-9999px",
                top: "auto",
                width: 1,
                height: 1,
                overflow: "hidden"
              }}
            >
              <label htmlFor='companyWebsite'>Company website</label>
              <Field
                id='companyWebsite'
                name='companyWebsite'
                type='text'
                tabIndex={-1}
                autoComplete='off'
              />
            </div>

            <FormCheckbox name='dataConsent'>
              I agree that Pixelette Marketing may use the details above to
              respond to my enquiry, in line with the{" "}
              <a
                href='/cookie-policy'
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: "#a3123f", textDecoration: "underline" }}
              >
                Cookie &amp; Privacy Policy
              </a>
              .
            </FormCheckbox>

            <Button type='submit' className='primary-full'>
              {isSubmitting ? "Submitting..." : "Book A Call"}
            </Button>

            {submitState === "success" && (
              <p role='status' style={{ marginTop: "1rem", color: "#1e7e34" }}>
                Thanks — your message has been sent. We&apos;ll be in touch
                shortly.
              </p>
            )}
            {submitState === "error" && (
              <p role='alert' style={{ marginTop: "1rem", color: "#c0392b" }}>
                {errorMsg}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
