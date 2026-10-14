type TextareaProps = {
  id: string;
  value: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function Textarea({
  id,
  value,
  label,
  placeholder,
  maxLength,
  onChange,
  onBlur,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={id}
      value={value}
      aria-label={label}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      className="form-control form-control--textarea"
      rows={4}
    />
  );
}
