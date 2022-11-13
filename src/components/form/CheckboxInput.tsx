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

function CheckboxInput({
  label,
  name,
  type = "checkbox",
  placeholder,
  required = true,
  isDisabled = false,
  autoComplete,
  inputProps,
}: Props) {
  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        disabled={isDisabled}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        placeholder={placeholder}
        {...inputProps}
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}

export default CheckboxInput;
