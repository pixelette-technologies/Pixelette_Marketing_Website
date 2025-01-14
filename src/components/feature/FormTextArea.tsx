"use client";

import React from "react";
import { ErrorMessage, useField, FieldHookConfig } from "formik";

interface FormTextAreaProps extends FieldHookConfig<string> {
  label: string;
  place?: string;
  name: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  place,
  ...props
}) => {
  // Ensure only Formik-related props are passed to useField
  const [field, meta] = useField(props);

  return (
    <div className='formtextArea'>
      <label htmlFor={field.name} className='form-label'>
        {label}
      </label>
      <textarea
        placeholder={place}
        id={field.name}
        className={`form-text ${meta.touched && meta.error ? "is-invalid" : ""}`}
        {...field} // Spread only Formik-related props
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
