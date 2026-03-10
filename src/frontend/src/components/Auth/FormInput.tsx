import React, { forwardRef, type InputHTMLAttributes } from "react";
import { type FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col items-start">
        <label className="pl-1">{label}</label>

        <input
          ref={ref}
          {...props}
          className={
            "border-2 p-2 rounded-main bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error " +
            (error && "border-error")
          }
        />

        {error && <span className="text-error pl-1">{error.message}</span>}
      </div>
    );
  },
);

export default FormInput;
