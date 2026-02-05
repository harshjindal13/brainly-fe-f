import { type ReactElement } from "react";
// Adjust this import path based on where you created the file in step 1
import { cn } from "../lib/utils";

interface ButtonProps {
  variant: "primary" | "secondary";
  // text: string;
  children: React.ReactNode;
  // startIcon: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  // // It is best practice to allow a className prop for external overrides
  className?: string;
}

const variantStyles = {
  primary: "bg-purple-dark text-white hover:bg-purple-700",
  secondary: "bg-purple-light text-purple-dark hover:bg-purple-300",
};

export function Button({
  variant,
  // text,  // not using anymore
  children, // • Allows icons, spans, strong tags, etc. • More reusable
  // startIcon,
  onClick,
  fullWidth,
  loading,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        // 1. Base styles (always applied)
        "flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2 font-normal drop-shadow-md drop-shadow-slate-400 transition-colors text-shadow-md",

        // 2. Variant styles (mapped from object)
        variantStyles[variant],

        // 3. Conditional styles
        // If fullWidth is true, these are added.
        // 'flex' and 'items-center' are redundant here as they are in Base,
        // but 'justify-center' is new. cn() handles this cleanly.
        fullWidth && "w-full justify-center",

        // Loading state
        loading && "cursor-not-allowed opacity-45",

        // 4. External overrides (allows you to pass className="m-4" to the component)
        className,
      )}
    >
      {/* <div className="pr-2">{startIcon}</div> */}
      {children}
    </button>
  );
}
