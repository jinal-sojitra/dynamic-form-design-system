import type { ChangeEvent, FocusEvent } from "react";

type InputProps = {
  id: string;
  value: string;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  value,
  label,
  type = "text",
  placeholder,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  onChange,
  onBlur,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      aria-label={label}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur}
      className="form-control"
    />
  );
}
