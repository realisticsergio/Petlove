import type { Metadata } from 'next';
import MyNotices from '@/components/profile/MyNotices/MyNotices';
import UserCard from '@/components/profile/UserCard/UserCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your Petlove profile.',
};

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <UserCard />

        <MyNotices />
      </div>
    </main>
  );
}
