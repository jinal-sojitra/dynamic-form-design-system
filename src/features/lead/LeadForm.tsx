import { useState } from "react";

import { Input } from "../../design-system/atoms/Input";
import { Select } from "../../design-system/atoms/Select";
import { Checkbox } from "../../design-system/atoms/Checkbox";
import { Textarea } from "../../design-system/atoms/Textarea";
import { Button } from "../../design-system/atoms/Button";
import { Field } from "../../design-system/molecules/Field";

import { leadFormConfig } from "./leadForm.config";
import type { LeadFieldConfig } from "./leadForm.config";
import {
  validateLeadForm,
  type LeadValues,
  type LeadErrors,
} from "./leadValidation";

import styles from "./LeadForm.module.css";

const initialValues: LeadValues = {
  fullName: "",
  email: "",
  leadType: "",
  companyName: "",
  phone: "",
  notes: "",
  consent: false,
};

function isVisible(field: LeadFieldConfig, values: LeadValues): boolean {
  if (!field.condition) return true;

  return values[field.condition.field] === field.condition.equals;
}

export function LeadForm() {
  const [values, setValues] = useState<LeadValues>(initialValues);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submittedValues, setSubmittedValues] = useState<LeadValues | null>(
    null,
  );

  function updateValue(name: string, value: string | boolean) {
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);
    setSubmittedValues(null);

    // Clear the error for a field when its value changes.
    setErrors((previous) => {
      const nextErrors = { ...previous };
      delete nextErrors[name];

      // A hidden company field should not keep an error.
      const companyField = leadFormConfig.find(
        (field) => field.name === "companyName",
      );

      if (companyField && !isVisible(companyField, nextValues)) {
        delete nextErrors.companyName;
      }

      return nextErrors;
    });
  }

  function validateField(name: string) {
    const field = leadFormConfig.find((item) => item.name === name);

    if (!field) return;

    if (!isVisible(field, values)) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
      return;
    }

    const allErrors = validateLeadForm(leadFormConfig, values);

    setErrors((previous) => {
      const next = { ...previous };

      if (allErrors[name]) {
        next[name] = allErrors[name];
      } else {
        delete next[name];
      }

      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLeadForm(leadFormConfig, values);

    // Also remove errors for fields that aren't visible.
    for (const field of leadFormConfig) {
      if (!isVisible(field, values)) {
        delete nextErrors[field.name];
      }
    }

    setErrors(nextErrors);
    setSubmittedValues(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmittedValues({ ...values });
  }

  function renderControl(field: LeadFieldConfig) {
    const value = values[field.name] ?? "";
    const commonProps = {
      id: field.name,
      label: field.label,
      "aria-describedby": undefined as string | undefined,
      "aria-invalid": undefined as boolean | undefined,
    };

    switch (field.type) {
      case "text":
      case "email":
        return (
          <Input
            {...commonProps}
            type={field.type}
            value={String(value)}
            placeholder={field.placeholder}
            onChange={(next) => updateValue(field.name, next)}
            onBlur={() => validateField(field.name)}
          />
        );

      case "select":
        return (
          <Select
            {...commonProps}
            value={String(value)}
            options={field.options ?? []}
            onChange={(next) => updateValue(field.name, next)}
            onBlur={() => validateField(field.name)}
          />
        );

      case "textarea":
        return (
          <Textarea
            {...commonProps}
            value={String(value)}
            placeholder={field.placeholder}
            maxLength={200}
            onChange={(next) => updateValue(field.name, next)}
            onBlur={() => validateField(field.name)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            {...commonProps}
            checked={value === true}
            onChange={(next) => updateValue(field.name, next)}
            onBlur={() => validateField(field.name)}
          />
        );

      default:
        return null;
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {leadFormConfig
          .filter((field) => isVisible(field, values))
          .map((field) => (
            <div
              key={field.name}
              className={field.fullWidth ? styles.fullWidth : undefined}
            >
              <Field
                id={field.name}
                label={field.label}
                required={field.validations.some(
                  (rule) => rule.type === "required",
                )}
                hint={field.hint}
                error={errors[field.name]}
              >
                {renderControl(field)}
              </Field>
            </div>
          ))}
      </div>

      <div className={styles.actions}>
        <Button type="submit" label="Submit inquiry" />
      </div>

      {submittedValues && (
        <section className={styles.result} aria-live="polite">
          <h2>Form submitted successfully</h2>
          <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
        </section>
      )}
    </form>
  );
}
