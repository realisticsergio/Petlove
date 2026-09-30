'use client';

import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { removePet } from '@/services/pets';
import type { Pet } from '@/types/pets';
import styles from './PetsItem.module.css';

type PetsItemProps = {
  pet: Pet;
};

type ApiErrorResponse = {
  message?: string;
};

export default function PetsItem({ pet }: PetsItemProps) {
  const dispatch = useAppDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    try {
      setIsRemoving(true);

      const updatedUser = await removePet(pet._id);

      dispatch(updateUser(updatedUser));
      toast.success(`${pet.name} видалено з профілю.`);
    } catch (error) {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || 'Не вдалося видалити улюбленця.');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={pet.imgURL}
        alt={pet.name}
        width={90}
        height={90}
        loading="lazy"
      />

      <div className={styles.content}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{pet.title}</h3>

          <button
            type="button"
            className={styles.removeButton}
            aria-label={`Remove ${pet.name}`}
            disabled={isRemoving}
            onClick={handleRemove}
          >
            <Trash2 size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>Name</dt>
            <dd>{pet.name}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Birthday</dt>
            <dd>{pet.birthday}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Sex</dt>
            <dd>{pet.sex}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Species</dt>
            <dd>{pet.species}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
