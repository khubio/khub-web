import * as yup from 'yup';

const validateLoginSchema = yup.object().shape({
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

const validateSignUpSchema = yup.object().shape({
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

export { validateLoginSchema, validateSignUpSchema };
