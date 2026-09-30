'use client';

import { Search, X } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import styles from './SearchField.module.css';

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
};

export default function SearchField({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search',
  ariaLabel = 'Пошук',
}: SearchFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <form className={styles.form} role="search" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="search-field">
        {ariaLabel}
      </label>

      <input
        id="search-field"
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
      />

      <div className={styles.actions}>
        {value && (
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Очистити пошук"
            onClick={handleClear}
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}

        <button
          type="submit"
          className={styles.iconButton}
          aria-label="Виконати пошук"
        >
          <Search size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
