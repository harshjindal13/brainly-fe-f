import * as React from "react";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          className={cn(
            "m-2 rounded border px-4 py-2 transition-colors outline-none",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-gray-500",
            className,
          )}
          {...props}
        />

        {error && <p className="ml-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
