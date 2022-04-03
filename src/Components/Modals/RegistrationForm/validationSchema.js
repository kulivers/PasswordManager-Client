import * as yup from "yup";

export const SignupSchema = () =>
  yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Invalid email").required("Email is required"),
    userName: yup
      .string()
      .typeError("It should be string")
      .min(4, "Too short name")
      .max(256, "To BIG name")
      .required("Please, tell me who are u"),
    phoneNumber: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(40, "Password is too long - should be 256 chars maximum.")
      .matches(/[A-Za-z0-9_*-]/, "Password must contain chars and digits."),
  });
