import React from "react";

type Props = {
  type?: "button" | "reset" | "submit";
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
};

function Button({
  type = "button",
  className = "",
  children,
  isLoading = false,
  isDisabled = false,
  error = false,
  icon,
}: Props) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${
        className
          ? className
          : `group relative flex w-full justify-center rounded-md border border-transparent
           bg-indigo-600
           py-2
           px-4
           text-sm
           font-medium text-white hover:bg-indigo-700
           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `
      } ${error ? "bg-red-600 hover:bg-red-700" : ""} ${
        isLoading ? "opacity-50" : ""
      } ${isDisabled ? "opacity-50" : ""}`}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
