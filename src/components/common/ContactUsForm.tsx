"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { contactUSvalidationSchema } from "@/validations/contactUsValidation";
import { Button, FormInput, FormTextArea, Heading } from "../feature";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

const ContactUsForm: React.FC = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    description: ""
  };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("Form Submitted", values);
    resetForm();
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
