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
  options: { key: string; value: string }[];
  selectProps?: InputHTMLAttributes<HTMLSelectElement>;
};

function SelectInput({ label, name, options = [], selectProps }: Props) {
  return (
    <div className="flex flex-col mb-1">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        {...selectProps}
      >
        {options.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
