'use client';

import { LogOut } from 'lucide-react';
import { useState } from 'react';
import ModalApproveAction from '@/components/common/ModalApproveAction/ModalApproveAction';
import styles from './LogOutBtn.module.css';

export default function LogOutBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsModalOpen(true)}
      >
        <LogOut size={18} strokeWidth={1.8} aria-hidden="true" />
        <span>Log out</span>
      </button>

      <ModalApproveAction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
