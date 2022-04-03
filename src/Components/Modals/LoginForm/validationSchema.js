import * as yup from "yup";

export const SignupSchema = () =>
  yup.object().shape({
    userName: yup
      .string()
      .typeError("It should be string")
      .min(4, "Too short name")
      .max(256, "To BIG name")
      .required("Please, tell me who are u"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(40, "Password is too long - should be 256 chars maximum.")
      .matches(/[A-Za-z0-9_*-]/, "Password must contain chars and digits."),
  });
