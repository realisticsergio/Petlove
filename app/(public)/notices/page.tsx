import type { Metadata } from 'next';
import NoticesPageClient from '@/components/notices/NoticesPageClient';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Find pet',
  description: 'Find pets, search notices and add your favorite notices.',
};

export default function NoticesPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <NoticesPageClient />
      </div>
    </main>
  );
}
