"use client";

import React from "react";
import { useField, FieldHookConfig } from "formik";

type FormTextAreaProps = FieldHookConfig<string> & {
  label: string;
  place?: string;
  name: string;
};

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  place,
  ...props
}) => {
  const [field, meta] = useField(props);
  const showError = Boolean(meta.touched && meta.error);
  const errorId = `${field.name}-error`;

  return (
    <div className='formtextArea'>
      <label htmlFor={field.name} className='form-label'>
        {label}
      </label>
      <textarea
        placeholder={place}
        className={`form-text ${showError ? "is-invalid" : ""}`}
        {...field}
        id={field.name}
        aria-invalid={showError || undefined}
        aria-describedby={showError ? errorId : undefined}
        rows={4}
        style={{
          border: showError ? "1px solid var(--color-danger)" : undefined
        }}
      />
      {showError ? (
        <div id={errorId} className='form-error' role='alert'>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FormTextArea;
