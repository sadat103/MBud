import * as yup from "yup";

export const nameValidation = yup.string().required("Name is required");

export const mobileValidation = yup
  .string()
  .matches(/(01)(\d){8}\b/, "Enter a valid phone number")
  .required("Phone number is required");

export const emailValidation = yup
  .string()
  .email("Please enter valid email")
  .required("Email is required");

export const passwordValidation = yup
  .string()
  .matches(/\w*[a-z]\w*/, "Password must have a small letter")
  .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
  .matches(/\d/, "Password must have a number")
  .matches(
    /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    "Password must have a special character"
  )
  .min(8, ({ min }) => `Password must be at least ${min} characters`)
  .required("Password is required");

export const conPassValidation = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords do not match")
  .required("Confirm password is required");
