'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import NoticesItem from '@/components/notices/NoticesItem/NoticesItem';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addNoticeToFavorites,
  removeNoticeFromFavorites,
} from '@/services/notices';
import type { Notice } from '@/types/notices';
import ModalNotice from '@/components/notices/ModalNotice/ModalNotice';
import styles from './MyNotices.module.css';

type ActiveTab = 'favorites' | 'viewed';

type ApiErrorResponse = {
  message?: string;
};

export default function MyNotices() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState<ActiveTab>('favorites');
  const [updatingNoticeId, setUpdatingNoticeId] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  const favorites = user?.noticesFavorites ?? [];
  const viewed = user?.noticesViewed ?? [];

  const notices = activeTab === 'favorites' ? favorites : viewed;

  const isFavorite = (noticeId: string) =>
    favorites.some((notice) => notice._id === noticeId);

  const handleFavoriteAction = async (notice: Notice) => {
    if (!user) {
      return;
    }

    const noticeIsFavorite = isFavorite(notice._id);

    try {
      setUpdatingNoticeId(notice._id);

      if (noticeIsFavorite) {
        await removeNoticeFromFavorites(notice._id);

        dispatch(
          updateUser({
            ...user,
            noticesFavorites: favorites.filter(
              (item) => item._id !== notice._id,
            ),
          }),
        );

        toast.success('Оголошення видалено з улюблених.');
      } else {
        await addNoticeToFavorites(notice._id);

        dispatch(
          updateUser({
            ...user,
            noticesFavorites: [...favorites, notice],
          }),
        );

        toast.success('Оголошення додано до улюблених.');
      }
    } catch (error) {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || 'Не вдалося оновити список улюблених.');
    } finally {
      setUpdatingNoticeId(null);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <h2 className="visually-hidden">My notices</h2>

        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'favorites'}
            className={`${styles.tab} ${
              activeTab === 'favorites' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('favorites')}
          >
            My favorite pets
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'viewed'}
            className={`${styles.tab} ${
              activeTab === 'viewed' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('viewed')}
          >
            Viewed
          </button>
        </div>

        {notices.length > 0 ? (
          <ul className={styles.list}>
            {notices.map((notice) => {
              const favorite = isFavorite(notice._id);

              return (
                <li key={notice._id}>
                  <NoticesItem
                    notice={notice}
                    action={activeTab === 'favorites' ? 'remove' : 'favorite'}
                    isFavorite={favorite}
                    isActionLoading={updatingNoticeId === notice._id}
                    onAction={() => handleFavoriteAction(notice)}
                    onLearnMore={() => setSelectedNoticeId(notice._id)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>
              {activeTab === 'favorites'
                ? 'You have not added any favorite notices yet.'
                : 'You have not viewed any notices yet.'}
            </p>
          </div>
        )}
      </section>
      <ModalNotice
        noticeId={selectedNoticeId}
        isOpen={Boolean(selectedNoticeId)}
        onClose={() => setSelectedNoticeId(null)}
      />
    </>
  );
}
