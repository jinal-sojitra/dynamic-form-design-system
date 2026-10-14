type CheckboxProps = {
  id: string;
  checked: boolean;
  label: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
};

export function Checkbox({
  id,
  checked,
  label,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  onChange,
  onBlur,
}: CheckboxProps) {
  return (
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      aria-label={label}
      onChange={(event) => onChange(event.target.checked)}
      onBlur={onBlur}
    />
  );
}
