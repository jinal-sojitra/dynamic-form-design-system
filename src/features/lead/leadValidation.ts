import type { LeadFieldConfig } from "./leadForm.config";

export type LeadValues = Record<string, string | boolean>;
export type LeadErrors = Record<string, string>;

export function validateLeadForm(
  config: LeadFieldConfig[],
  values: LeadValues,
): LeadErrors {
  const errors: LeadErrors = {};

  for (const field of config) {
    if (field.condition) {
      const dependencyValue = values[field.condition.field];

      if (dependencyValue !== field.condition.equals) {
        continue;
      }
    }

    const value = values[field.name];
    const stringValue = String(value ?? "");

    for (const rule of field.validations) {
      if (rule.type === "required") {
        const isEmpty =
          field.type === "checkbox"
            ? value !== true
            : stringValue.trim() === "";

        if (isEmpty) {
          errors[field.name] = rule.message;
          break;
        }
      }

      if (rule.type === "email" && stringValue.trim() !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(stringValue)) {
          errors[field.name] = rule.message;
          break;
        }
      }

      if (rule.type === "pattern" && stringValue !== "") {
        if (!new RegExp(rule.value).test(stringValue)) {
          errors[field.name] = rule.message;
          break;
        }
      }

      if (rule.type === "maxLength") {
        if (stringValue.length > rule.value) {
          errors[field.name] = rule.message;
          break;
        }
      }
    }
  }

  return errors;
}
