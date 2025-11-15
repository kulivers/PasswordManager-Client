import * as yup from 'yup';

export const SignupSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  userName: yup
    .string()
    .min(4, 'Too short name')
    .max(256, 'Too BIG name')
    .required('Please, tell me who are u'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'That doesn\'t look like a phone number')
    .min(8, 'Phone number is too short'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(40, 'Password is too long - should be 40 chars maximum.')
    .matches(/[A-Za-z0-9_*-]/, 'Password must contain chars and digits.'),
});

