'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useField } from 'formik';
import { useState, type InputHTMLAttributes } from 'react';
import styles from './FormField.module.css';

type FormFieldProps = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'date';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'>;

export default function FormField({
  name,
  label,
  type = 'text',
  ...inputProps
}: FormFieldProps) {
  const [field, meta] = useField<string>(name);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const hasError = meta.touched && Boolean(meta.error);
  const isValid = meta.touched && !meta.error && Boolean(field.value);

  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  return (
    <div className={styles.field}>
      <label className="visually-hidden" htmlFor={name}>
        {label}
      </label>

      <div
        className={`${styles.control} ${
          hasError ? styles.error : ''
        } ${isValid ? styles.valid : ''}`}
      >
        <input
          {...inputProps}
          {...field}
          id={name}
          type={inputType}
          className={styles.input}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.passwordButton}
            aria-label={
              isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
            }
            onClick={() => setIsPasswordVisible((value) => !value)}
          >
            {isPasswordVisible ? (
              <Eye size={22} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <EyeOff size={22} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {hasError && (
        <p id={`${name}-error`} className={styles.message}>
          {meta.error}
        </p>
      )}
    </div>
  );
}
