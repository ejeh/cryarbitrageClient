import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(6, "Password should contain atleast 6 characters")
    .required("Enter your password"),
});

export const registrationValidationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: Yup.string().required("Enter your full name"),
  lastName: Yup.string().required("Enter your full name"),
  password: Yup.string("")
    .min(6, "Password should contain atleast 6 characters")
    .max(12, "Password cannot exceed more tha 12 characters")
    .required("Enter your password"),
  confirmPassword: Yup.string("")
    .min(6, "Password should contain atleast 6 characters")
    .max(12, "Password cannot exceed more tha 12 characters")
    .oneOf([Yup.ref("password")], "Password do not match"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordValidationSchema = Yup.object({
  newPassword: Yup.string("")
    .min(6, "New password should contain atleast 6 characters")
    .required(" Enter new password"),
  confirmPassword: Yup.string("")
    .min(6, "Confirm password should contain atleast 6 characters")
    .required(" Enter confirm password"),
});
