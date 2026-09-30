'use client';

import UserBar from '@/components/navigation/UserBar/UserBar';
import styles from './UserNav.module.css';

type UserNavProps = {
  variant?: 'dark' | 'light';
  mobile?: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
};

export default function UserNav({
  variant = 'dark',
  mobile = false,
  onLogout,
  onNavigate,
}: UserNavProps) {
  return (
    <div
      className={`${styles.userNav} ${styles[variant]} ${
        mobile ? styles.mobile : ''
      }`}
    >
      <UserBar variant={variant} onNavigate={onNavigate} />

      <button type="button" className={styles.logout} onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}
