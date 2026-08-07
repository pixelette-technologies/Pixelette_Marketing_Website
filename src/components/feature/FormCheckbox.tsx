"use client";

import { ErrorMessage, useField } from "formik";
import { FC, ReactNode } from "react";

interface FormCheckboxProps {
  name: string;
  children: ReactNode;
  className?: string;
}

const FormCheckbox: FC<FormCheckboxProps> = ({
  name,
  children,
  className = ""
}) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div className={`formCheckbox ${className}`}>
      <label
        htmlFor={name}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.5rem",
          cursor: "pointer"
        }}
      >
        <input
          id={name}
          type='checkbox'
          {...field}
          aria-invalid={meta.touched && Boolean(meta.error)}
          style={{ marginTop: "0.25rem", flexShrink: 0 }}
        />
        <span className='form-consent-text'>{children}</span>
      </label>
      <ErrorMessage component='div' name={name} className='form-error' />
    </div>
  );
};

export default FormCheckbox;
