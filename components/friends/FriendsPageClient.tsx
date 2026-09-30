'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';
import Title from '@/components/common/Title/Title';
import FriendsList from '@/components/friends/FriendsList/FriendsList';
import { fetchFriends } from '@/services/friends';
import type { Friend } from '@/types/friends';
import styles from './FriendsPageClient.module.css';

export default function FriendsPageClient() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadFriends = async () => {
      try {
        const data = await fetchFriends();

        if (isActive) {
          setFriends(data);
        }
      } catch {
        if (isActive) {
          setFriends([]);
          toast.error('Не вдалося завантажити список партнерів.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadFriends();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className="container">
        <Title>Our friends</Title>

        <section
          className={styles.results}
          aria-label="Наші партнери"
          aria-busy={isLoading}
        >
          {isLoading ? <Loader /> : <FriendsList friends={friends} />}
        </section>
      </div>
    </main>
  );
}
