import * as yup from "yup";

export const validationSignUpSchema = yup.object().shape({
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .required("Password is required"),

    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

    firstName: yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(32, "First Name must be at most 32 characters")
    .required("First Name is required"),

    lastName: yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(32, "Last Name must be at most 32 characters")
    .required("Last Name is required"),
});

export const validationLoginSchema = yup.object().shape({
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .required("Password is required"),
});