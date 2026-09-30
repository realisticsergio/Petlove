'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import AuthNav from '@/components/navigation/AuthNav/AuthNav';
import Nav from '@/components/navigation/Nav/Nav';
import UserNav from '@/components/navigation/UserNav/UserNav';
import Logo from '@/components/common/Logo/Logo';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export default function MobileMenu({
  isOpen,
  isLoggedIn,
  onClose,
  onLogout,
}: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <aside
        className={styles.menu}
        aria-label="Мобільне меню"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <Logo variant="light" onClick={onClose} />

          <button
            type="button"
            className={styles.close}
            aria-label="Закрити меню"
            onClick={onClose}
          >
            <X size={32} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.navigation}>
          <Nav variant="light" mobile onNavigate={onClose} />
        </div>

        <div className={styles.auth}>
          {isLoggedIn ? (
            <UserNav
              variant="light"
              mobile
              onLogout={onLogout}
              onNavigate={onClose}
            />
          ) : (
            <AuthNav variant="light" mobile onNavigate={onClose} />
          )}
        </div>
      </aside>
    </div>
  );
}
