"use client";

import { ErrorMessage, useField } from "formik";
import { FC, SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  /** The disabled leading option, shown while nothing is chosen. */
  place: string;
  options: readonly string[];
  className?: string;
  name: string;
}

// The first select control in the codebase. It follows FormInput's anatomy
// exactly — wrapper div, label, control, ErrorMessage as a DIRECT CHILD —
// because _formInput.scss and _formTextArea.scss both style by element inside
// the wrapper rather than by the form-label / form-error class names, which
// have no rules anywhere. A nested ErrorMessage would simply lose its colour.
//
// TWO DELIBERATE DIFFERENCES FROM FormInput:
//
// It carries an `id`. FormInput sets htmlFor={field.name} but never puts a
// matching id on its input, so its label is not actually associated with its
// control. That is a pre-existing fault worth fixing on its own; this file
// does not reproduce it.
//
// It does NOT set `outline: none` on focus. FormInput does, which removes the
// visible focus ring from a keyboard user. Also pre-existing, also not
// reproduced here.
const FormSelect: FC<FormSelectProps> = ({
  label,
  place,
  options,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className='formselect'>
      <label htmlFor={field.name} className='form-label'>
        {label}
      </label>
      <select
        id={field.name}
        className={`form-input ${className} ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
        {...field}
        {...props}
        style={{
          border:
            meta.touched && meta.error
              ? "1px solid var(--color-danger)"
              : undefined
        }}
      >
        <option value=''>{place}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage component='div' name={field.name} className='form-error' />
    </div>
  );
};

export default FormSelect;
