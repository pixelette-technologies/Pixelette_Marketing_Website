import * as Yup from "yup";

/**
 * Version stamp for the consent copy + the linked policy. Bump this whenever the
 * consent wording or the linked policy materially changes, so every stored
 * consent record stays auditable against the exact text the person agreed to.
 */
export const CONSENT_VERSION = "2026-08-07";

export const contactUSvalidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name cannot exceed 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .trim()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name cannot exceed 50 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .max(160, "Email cannot exceed 160 characters")
    .required("Email is required"),
  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  // Governed consent — must be ticked to submit.
  dataConsent: Yup.boolean()
    .oneOf([true], "Please accept the privacy notice to continue.")
    .required("Please accept the privacy notice to continue.")
});
