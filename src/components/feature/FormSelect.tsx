"use client";

import { useField } from "formik";
import { FC, SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  /** The disabled leading option, shown while nothing is chosen. */
  place: string;
  options: readonly string[];
  className?: string;
  name: string;
}

const FormSelect: FC<FormSelectProps> = ({
  label,
  place,
  options,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(props);
  const showError = Boolean(meta.touched && meta.error);
  const errorId = `${field.name}-error`;

  return (
    <div className='formselect'>
      <label htmlFor={field.name} className='form-label'>
        {label}
      </label>
      <select
        className={`form-input ${className} ${showError ? "is-invalid" : ""}`}
        {...field}
        {...props}
        id={field.name}
        aria-invalid={showError || undefined}
        aria-describedby={showError ? errorId : undefined}
        style={{
          border: showError ? "1px solid var(--color-danger)" : undefined
        }}
      >
        <option value=''>{place}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {showError ? (
        <div id={errorId} className='form-error' role='alert'>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FormSelect;
