type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  value: string;
  label: string;
  options: SelectOption[];
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function Select({
  id,
  value,
  label,
  options,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  onChange,
  onBlur,
}: SelectProps) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      aria-label={label}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      className="form-control"
    >
      <option value="">Select an option</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
