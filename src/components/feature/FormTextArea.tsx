"use client";

import React from "react";
import { ErrorMessage, useField, FieldHookConfig } from "formik";

interface FormTextAreaProps extends FieldHookConfig<string> {
  label: string;
  place?: string;
  name: string;
  animation?: string;
  duration?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  place,
  animation,
  duration,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div
      className='formtextArea'
      data-aos={animation}
      data-aos-duration={duration}
    >
      <label htmlFor={field.name} className='form-label'>
        {label}
      </label>
      <textarea
        placeholder={place}
        id={field.name}
        className={`form-text ${meta.touched && meta.error ? "is-invalid" : ""}`}
        {...field}
        autoComplete='off'
        rows={4}
        style={{
          border:
            meta.touched && meta.error ? "1px solid red" : "1px solid #ccc"
        }}
      />
      <ErrorMessage component='div' name={field.name} className='form-error' />
    </div>
  );
};

export default FormTextArea;
