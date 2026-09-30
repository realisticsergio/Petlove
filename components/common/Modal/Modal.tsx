'use client';
import { X } from 'lucide-react';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={ariaLabel}
      onCancel={onClose}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          aria-label="Закрити модальне вікно"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>

        {children}
      </div>
    </dialog>
  );
}
