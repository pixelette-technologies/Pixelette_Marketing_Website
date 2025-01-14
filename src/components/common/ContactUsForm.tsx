"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { contactUSvalidationSchema } from "@/validations/contactUsValidation";
import { Button, FormInput, FormTextArea, Heading } from "../feature";

const ContactUsForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    description: ""
  };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    console.log("Form Submitted", values);
    resetForm();
  };

  return (
    <div className='contactUsForm'>
      <Heading>Contact Us</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={contactUSvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <FormInput
              label='Email'
              name='email'
              place='Enter your email'
              type='email'
            />
            <FormTextArea
              label='Description'
              name='description'
              place='Enter your message'
            />
            <Button type='submit' className='submit-button'>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
