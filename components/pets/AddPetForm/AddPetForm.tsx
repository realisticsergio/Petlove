'use client';

import axios from 'axios';
import { Form, Formik } from 'formik';
import { Mars, PawPrint, Venus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FormField from '@/components/auth/FormField/FormField';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { addPet, fetchPetSpecies } from '@/services/pets';
import type { AddPetFormValues, AddPetSex, PetSpecies } from '@/types/pets';
import {
  addPetInitialValues,
  addPetValidationSchema,
} from '@/utils/petValidation';
import styles from './AddPetForm.module.css';

type ApiErrorResponse = {
  message?: string;
};

const sexOptions: Array<{
  value: AddPetSex;
  label: string;
  icon: typeof Mars;
}> = [
  {
    value: 'female',
    label: 'Female',
    icon: Venus,
  },
  {
    value: 'male',
    label: 'Male',
    icon: Mars,
  },
  {
    value: 'multiple',
    label: 'Multiple',
    icon: PawPrint,
  },
];

export default function AddPetForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [species, setSpecies] = useState<PetSpecies[]>([]);
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadSpecies() {
      try {
        const data = await fetchPetSpecies();

        if (!isCancelled) {
          setSpecies(data);
        }
      } catch {
        if (!isCancelled) {
          toast.error('Не вдалося завантажити види улюбленців.');
        }
      } finally {
        if (!isCancelled) {
          setIsSpeciesLoading(false);
        }
      }
    }

    void loadSpecies();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Formik<AddPetFormValues>
      initialValues={addPetInitialValues}
      validationSchema={addPetValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          const user = await addPet(values);

          dispatch(updateUser(user));
          toast.success('Улюбленця успішно додано.');
          router.replace('/profile');
        } catch (error) {
          const message = axios.isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data?.message
            : undefined;

          toast.error(message || 'Не вдалося додати улюбленця.');
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.heading}>
            <h1 className={styles.title}>Add my pet</h1>
            <span className={styles.subtitle}>/ Personal details</span>
          </div>

          <fieldset className={styles.sexFieldset}>
            <legend className="visually-hidden">Pet sex</legend>

            <div className={styles.sexOptions}>
              {sexOptions.map(({ value, label, icon: Icon }) => (
                <label
                  className={`${styles.sexOption} ${
                    values.sex === value ? styles.selectedSex : ''
                  }`}
                  key={value}
                  title={label}
                >
                  <input
                    className="visually-hidden"
                    type="radio"
                    name="sex"
                    value={value}
                    checked={values.sex === value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  <span className="visually-hidden">{label}</span>
                </label>
              ))}
            </div>

            {touched.sex && errors.sex && (
              <p className={styles.error}>{errors.sex}</p>
            )}
          </fieldset>

          <div className={styles.fields}>
            <FormField
              name="imgUrl"
              label="Photo URL"
              type="url"
              placeholder="Enter URL"
              autoComplete="url"
            />

            <FormField
              name="title"
              label="Title"
              placeholder="Title"
              autoComplete="off"
            />

            <div className={styles.row}>
              <FormField
                name="name"
                label="Pet's name"
                placeholder="Pet's name"
                autoComplete="off"
              />

              <div className={styles.selectField}>
                <label className="visually-hidden" htmlFor="species">
                  Type of pet
                </label>

                <select
                  id="species"
                  name="species"
                  value={values.species}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.select} ${
                    touched.species && errors.species ? styles.invalid : ''
                  }`}
                  disabled={isSpeciesLoading}
                  aria-invalid={touched.species && Boolean(errors.species)}
                  aria-describedby={
                    touched.species && errors.species
                      ? 'species-error'
                      : undefined
                  }
                >
                  <option value="">
                    {isSpeciesLoading ? 'Loading...' : 'Type of pet'}
                  </option>

                  {species.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {touched.species && errors.species && (
                  <p id="species-error" className={styles.error}>
                    {errors.species}
                  </p>
                )}
              </div>
            </div>

            <FormField
              name="birthday"
              label="Birthday"
              type="date"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => router.replace('/profile')}
            >
              Back
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || isSpeciesLoading}
            >
              {isSubmitting ? 'Adding...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
