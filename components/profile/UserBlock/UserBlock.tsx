'use client';

import { CircleUserRound, Mail, Phone } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import styles from './UserBlock.module.css';

export default function UserBlock() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userBlock}>
      <div className={styles.avatarWrapper}>
        {user.avatar ? (
          <img
            className={styles.avatar}
            src={user.avatar}
            alt={`${user.name} avatar`}
            width={110}
            height={110}
          />
        ) : (
          <div className={styles.defaultAvatar} aria-label="Default avatar">
            <CircleUserRound size={64} strokeWidth={1.4} />
          </div>
        )}
      </div>

      <h2 className={styles.name}>{user.name}</h2>

      <address className={styles.contacts}>
        <a className={styles.contact} href={`mailto:${user.email}`}>
          <Mail size={18} aria-hidden="true" />
          <span>{user.email}</span>
        </a>

        {user.phone ? (
          <a
            className={styles.contact}
            href={`tel:${user.phone.replace(/\s/g, '')}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span>{user.phone}</span>
          </a>
        ) : (
          <div className={styles.contact}>
            <Phone size={18} aria-hidden="true" />
            <span>Phone number is not added</span>
          </div>
        )}
      </address>
    </div>
  );
}
