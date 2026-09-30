'use client';

import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/common/Modal/Modal';
import styles from './ModalAttention.module.css';

type ModalAttentionProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalAttention({
  isOpen,
  onClose,
}: ModalAttentionProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Authorization required">
      <div className={styles.wrapper}>
        <div className={styles.icon} aria-hidden="true">
          <PawPrint size={44} strokeWidth={1.5} />
        </div>

        <h2 className={styles.title}>Attention</h2>

        <p className={styles.text}>
          We would like to remind you that certain functionality is available
          only to authorized users.
        </p>

        <div className={styles.actions}>
          <Link className={styles.login} href="/login" onClick={onClose}>
            Log in
          </Link>

          <Link className={styles.register} href="/register" onClick={onClose}>
            Registration
          </Link>
        </div>
      </div>
    </Modal>
  );
}
