"use client";

import { useField } from "formik";
import { FC, InputHTMLAttributes, useState } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  place: string;
  className?: string;
  name: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  place,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState<string>("");
  const showError = Boolean(meta.touched && meta.error);
  const errorId = `${field.name}-error`;

  return (
    <div className='forminput'>
      <label
        htmlFor={field.name}
        className={`form-label ${value !== "" ? "form-label-input-value" : ""}`}
      >
        {label}
      </label>
      <input
        placeholder={place}
        type='text'
        className={`form-input ${className} ${showError ? "is-invalid" : ""}`}
        {...field}
        {...props}
        id={field.name}
        aria-invalid={showError || undefined}
        aria-describedby={showError ? errorId : undefined}
        onChange={e => {
          setValue(e.target.value);
          field.onChange(e);
        }}
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

export default FormInput;
