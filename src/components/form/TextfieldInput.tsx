import React, { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  autoComplete?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

function TextfieldInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  isDisabled = false,
  autoComplete,
  inputProps,
}: Props) {
  return (
    <div className="flex flex-col mb-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        disabled={isDisabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
}

export default TextfieldInput;
