'use client';

import axios from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormField from '@/components/auth/FormField/FormField';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/auth/authSlice';
import { loginUser } from '@/services/auth';
import { loginValidationSchema } from '@/utils/authValidation';
import styles from './LoginForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

type ApiErrorResponse = {
  message?: string;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          const data = await loginUser(values);
          const { token, ...user } = data;

          window.localStorage.setItem('petlove-token', token);

          dispatch(
            setCredentials({
              user,
              token,
            }),
          );

          toast.success('Вхід виконано успішно.');
          router.replace('/profile');
        } catch (error) {
          const message = axios.isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data?.message
            : undefined;

          toast.error(message || 'Не вдалося увійти. Перевірте введені дані.');
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.fields}>
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>

          <p className={styles.account}>
            Don&apos;t have an account?{' '}
            <Link className={styles.link} href="/register">
              Register
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
