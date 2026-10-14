export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export type ValidationRule =
  | { type: "required"; message: string }
  | { type: "email"; message: string }
  | { type: "pattern"; value: string; message: string }
  | { type: "maxLength"; value: number; message: string };

export type LeadFieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: { label: string; value: string }[];
  validations: ValidationRule[];
  condition?: {
    field: string;
    equals: string;
  };
  fullWidth?: boolean;
};

export const leadFormConfig: LeadFieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    validations: [{ type: "required", message: "Full name is required." }],
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
    validations: [
      { type: "required", message: "Email is required." },
      { type: "email", message: "Enter a valid email address." },
    ],
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead Type",
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Company", value: "Company" },
    ],
    validations: [{ type: "required", message: "Please select a lead type." }],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company Name",
    placeholder: "Enter company name",
    condition: { field: "leadType", equals: "Company" },
    validations: [{ type: "required", message: "Company name is required." }],
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    placeholder: "10-digit phone number",
    validations: [
      { type: "required", message: "Phone is required." },
      {
        type: "pattern",
        value: "^\\d{10}$",
        message: "Phone must contain exactly 10 digits.",
      },
    ],
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Tell us more (optional)",
    hint: "Maximum 200 characters.",
    fullWidth: true,
    validations: [
      {
        type: "maxLength",
        value: 200,
        message: "Notes cannot exceed 200 characters.",
      },
    ],
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted.",
    fullWidth: true,
    validations: [{ type: "required", message: "Consent is required." }],
  },
];
