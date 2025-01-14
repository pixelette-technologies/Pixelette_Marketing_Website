"use client";

import { ErrorMessage, useField } from "formik";
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
        className={`form-input ${className} ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
        {...field}
        {...props}
        autoComplete='off'
        onChange={e => {
          setValue(e.target.value);
          field.onChange(e);
        }}
        style={{
          border: meta.touched && meta.error ? "1px solid red" : undefined
        }}
      />
      <ErrorMessage component='div' name={field.name} className='form-error' />
    </div>
  );
};

export default FormInput;
