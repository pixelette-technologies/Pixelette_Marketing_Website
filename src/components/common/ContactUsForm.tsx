"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { contactUSvalidationSchema } from "@/validations/contactUsValidation";
import { Button, FormInput, FormTextArea, Heading } from "../feature";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

type SubmitState = "idle" | "success" | "error";

const ContactUsForm: React.FC = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    description: ""
  };

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitState("idle");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New website enquiry from ${values.firstName} ${values.lastName}`.trim(),
          from_name: "Pixelette Marketing Website",
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          message: values.description
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitState("success");
        resetForm();
      } else {
        setSubmitState("error");
      }
    } catch {
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

            <Button type='submit' className='primary-full'>
              {isSubmitting ? "Submitting..." : "Book A Call"}
            </Button>

            {submitState === "success" && (
              <p role='status' style={{ marginTop: "1rem", color: "#1e7e34" }}>
                Thanks — your message has been sent. We&apos;ll be in touch shortly.
              </p>
            )}
            {submitState === "error" && (
              <p role='alert' style={{ marginTop: "1rem", color: "#c0392b" }}>
                Sorry, something went wrong. Please try again, or email
                sales@pixelettemarketing.com.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
