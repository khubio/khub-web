import * as yup from 'yup';

export const validateLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Your email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be maximum 32 characters')
    .required('Password is required'),
  firstName: yup.string().required('First name is required').optional(),
  lastName: yup.string().required('Last name is required').optional(),
});

export const validateSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Your email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be maximum 32 characters')
    .required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

export const validateForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Your email must be valid')
    .required('Email is required'),
});

export const validateResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be maximum 32 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const validateEditProfileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters').max(11, 'Phone must be maximum 11 characters'),
});
