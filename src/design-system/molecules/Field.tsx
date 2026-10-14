import type { ReactElement } from "react";
import { cloneElement } from "react";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactElement<{
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }>;
};

export function Field({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: FieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const control = cloneElement(children, {
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
  });

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {control}

      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
