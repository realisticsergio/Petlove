'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import ModalEditUser from '@/components/profile/ModalEditUser/ModalEditUser';
import styles from './EditUserBtn.module.css';

export default function EditUserBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-label="Edit profile"
        onClick={() => setIsModalOpen(true)}
      >
        <Pencil size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <ModalEditUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
