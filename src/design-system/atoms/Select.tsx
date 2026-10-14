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
    <div className="select-wrapper">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className="form-control select-control"
        aria-label={label}
        aria-describedby={describedBy}
        aria-invalid={invalid}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="select-arrow" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
