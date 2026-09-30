'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'dark' | 'light';
  onNavigate?: () => void;
};

export default function UserBar({
  variant = 'dark',
  onNavigate,
}: UserBarProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [imageError, setImageError] = useState(false);

  const name = user?.name || 'User';
  const hasAvatar = Boolean(user?.avatar) && !imageError;

  return (
    <Link
      href="/profile"
      className={`${styles.userBar} ${styles[variant]}`}
      aria-label={`Відкрити профіль користувача ${name}`}
      onClick={onNavigate}
    >
      <span className={styles.avatar}>
        {hasAvatar ? (
          <img
            src={user?.avatar}
            alt=""
            width={50}
            height={50}
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={styles.fallback} aria-hidden="true">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </span>

      <span className={styles.name}>{name}</span>
    </Link>
  );
}
