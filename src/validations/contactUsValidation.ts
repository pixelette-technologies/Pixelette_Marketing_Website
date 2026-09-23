import * as Yup from "yup";
import { IMPROVE_OPTIONS } from "@/lib/contactContract";

// Bounds here are NUMERICALLY IDENTICAL to contactContract.ts. Anywhere they
// differ, the client would accept a value the server then rejects with a
// generic failure the visitor cannot act on.
export const contactUSvalidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // The brief collects Company and Website so sales can prepare, but neither
  // is required: a missing company name must never cost an enquiry.
  company: Yup.string().max(200, "Company cannot exceed 200 characters"),
  companyWebsite: Yup.string()
    // Deliberately NOT Yup.url(), which rejects "pixelette.com" for having no
    // scheme — the single most likely thing a visitor types in this box.
    .max(200, "Website cannot exceed 200 characters"),
  improve: Yup.string().oneOf(
    [...IMPROVE_OPTIONS, ""],
    "Choose one of the listed options"
  ),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters")
    .required("Description is required"),
  consent: Yup.boolean()
    .oneOf([true], "Please confirm the privacy notice before submitting")
    .required(),
  noticeVersion: Yup.string().required(),
  formStartedAt: Yup.string().required(),
  sourcePage: Yup.string().required(),
  _website: Yup.string().max(0)
});
