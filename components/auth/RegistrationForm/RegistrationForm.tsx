'use client';

import axios from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormField from '@/components/auth/FormField/FormField';
import { setCredentials } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { registerUser } from '@/services/auth';
import { registrationValidationSchema } from '@/utils/authValidation';
import styles from './RegistrationForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type ApiErrorResponse = {
  message?: string;
};

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          const data = await registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
          });
          const { token, ...user } = data;

          window.localStorage.setItem('petlove-token', token);

          dispatch(
            setCredentials({
              user,
              token,
            }),
          );

          toast.success('Реєстрацію завершено успішно.');
          router.replace('/profile');
        } catch (error) {
          const message = axios.isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data?.message
            : undefined;

          toast.error(message || 'Не вдалося зареєструвати користувача.');
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.fields}>
            <FormField
              name="name"
              label="Name"
              placeholder="Name"
              autoComplete="name"
            />

            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />

            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />

            <FormField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Registration'}
          </button>

          <p className={styles.account}>
            Already have an account?{' '}
            <Link className={styles.link} href="/login">
              Log In
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
