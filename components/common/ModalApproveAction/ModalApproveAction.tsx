'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Modal from '@/components/common/Modal/Modal';
import { useAppDispatch } from '@/redux/hooks';
import { clearAuth } from '@/redux/auth/authSlice';
import { api } from '@/services/api';
import styles from './ModalApproveAction.module.css';

type ModalApproveActionProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalApproveAction({
  isOpen,
  onClose,
}: ModalApproveActionProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await api.post('/users/signout');
    } catch {
      toast.error(
        'Не вдалося завершити сесію на сервері. Локальний вихід виконано.',
      );
    } finally {
      window.localStorage.removeItem('petlove-token');
      dispatch(clearAuth());
      setIsLoading(false);
      onClose();
      router.replace('/home');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Підтвердження виходу">
      <div className={styles.wrapper}>
        <div className={styles.image} aria-hidden="true">
          🐈
        </div>

        <p className={styles.question}>Already leaving?</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.confirm}`}
            disabled={isLoading}
            onClick={handleLogout}
          >
            {isLoading ? 'Leaving...' : 'Yes'}
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.cancel}`}
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
