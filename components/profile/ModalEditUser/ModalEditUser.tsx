'use client';

import axios from 'axios';
import { Form, Formik } from 'formik';
import { CircleUserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from '@/components/auth/FormField/FormField';
import Modal from '@/components/common/Modal/Modal';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { editCurrentUser } from '@/services/auth';
import type { EditUserValues } from '@/types/auth';
import { editUserValidationSchema } from '@/utils/authValidation';
import styles from './ModalEditUser.module.css';

type ModalEditUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ApiErrorResponse = {
  message?: string;
};

export default function ModalEditUser({ isOpen, onClose }: ModalEditUserProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  const initialValues: EditUserValues = {
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    avatar: user.avatar ?? '',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Edit user information">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Edit information</h2>

        <Formik<EditUserValues>
          initialValues={initialValues}
          validationSchema={editUserValidationSchema}
          enableReinitialize
          onSubmit={async (values, actions) => {
            try {
              const updatedUser = await editCurrentUser(values);

              dispatch(updateUser(updatedUser));
              toast.success('Дані профілю оновлено.');
              onClose();
            } catch (error) {
              const message = axios.isAxiosError<ApiErrorResponse>(error)
                ? error.response?.data?.message
                : undefined;

              toast.error(message || 'Не вдалося оновити дані профілю.');
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form} noValidate>
              <div className={styles.avatarWrapper}>
                {values.avatar ? (
                  <img
                    className={styles.avatar}
                    src={values.avatar}
                    alt="Avatar preview"
                    width={86}
                    height={86}
                  />
                ) : (
                  <CircleUserRound
                    size={64}
                    strokeWidth={1.4}
                    aria-label="Default avatar"
                  />
                )}
              </div>

              <div className={styles.fields}>
                <FormField
                  name="avatar"
                  label="Avatar URL"
                  type="url"
                  placeholder="Avatar URL"
                  autoComplete="url"
                />

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
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+380000000000"
                  autoComplete="tel"
                />
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
