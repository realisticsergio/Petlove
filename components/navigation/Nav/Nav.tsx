'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const navigation = [
  { href: '/news', label: 'News' },
  { href: '/notices', label: 'Find pet' },
  { href: '/friends', label: 'Our friends' },
];

type NavProps = {
  variant?: 'dark' | 'light';
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function Nav({
  variant = 'dark',
  mobile = false,
  onNavigate,
}: NavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${styles.nav} ${styles[variant]} ${
        mobile ? styles.mobile : ''
      }`}
      aria-label="Основна навігація"
    >
      <ul className={styles.list}>
        {navigation.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
