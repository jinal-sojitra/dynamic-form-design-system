import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function Button({
  label,
  type = "button",
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      className="form-button"
      {...props}
    >
      {label}
    </button>
  );
}
