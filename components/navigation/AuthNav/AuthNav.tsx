'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AuthNav.module.css';

type AuthNavProps = {
  variant?: 'dark' | 'light';
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function AuthNav({
  variant = 'dark',
  mobile = false,
  onNavigate,
}: AuthNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${styles.authNav} ${styles[variant]} ${
        mobile ? styles.mobile : ''
      }`}
      aria-label="Навігація авторизації"
    >
      <Link
        href="/login"
        className={`${styles.link} ${styles.login} ${
          pathname === '/login' ? styles.active : ''
        }`}
        aria-current={pathname === '/login' ? 'page' : undefined}
        onClick={onNavigate}
      >
        Log In
      </Link>

      <Link
        href="/register"
        className={`${styles.link} ${styles.register} ${
          pathname === '/register' ? styles.active : ''
        }`}
        aria-current={pathname === '/register' ? 'page' : undefined}
        onClick={onNavigate}
      >
        Registration
      </Link>
    </nav>
  );
}
