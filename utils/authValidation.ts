import * as Yup from 'yup';

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const emailSchema = Yup.string()
  .matches(emailPattern, 'Enter a valid Email')
  .required('Email is required');

const passwordSchema = Yup.string()
  .min(7, 'Password must contain at least 7 characters')
  .required('Password is required');

export const loginValidationSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registrationValidationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),

  email: emailSchema,

  password: passwordSchema,

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const avatarPattern =
  /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)(?:\?.*)?$/i;

const phonePattern = /^\+38\d{10}$/;

export const editUserValidationSchema = Yup.object({
  name: Yup.string().trim(),

  email: Yup.string().matches(emailPattern, {
    message: 'Enter a valid Email',
    excludeEmptyString: true,
  }),

  phone: Yup.string().matches(phonePattern, {
    message: 'Use format +38XXXXXXXXXX',
    excludeEmptyString: true,
  }),

  avatar: Yup.string().matches(avatarPattern, {
    message: 'Enter a valid image URL',
    excludeEmptyString: true,
  }),
});
