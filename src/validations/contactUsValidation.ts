import * as Yup from "yup";
export const contactUSvalidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name cannot exceed 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name cannot exceed 50 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required")
});
