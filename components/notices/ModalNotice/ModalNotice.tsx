'use client';

import axios from 'axios';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';
import Modal from '@/components/common/Modal/Modal';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addNoticeToFavorites,
  fetchNoticeById,
  removeNoticeFromFavorites,
} from '@/services/notices';
import type { Notice } from '@/types/notices';
import styles from './ModalNotice.module.css';

type ModalNoticeProps = {
  noticeId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

type ApiErrorResponse = {
  message?: string;
};

export default function ModalNotice({
  noticeId,
  isOpen,
  onClose,
}: ModalNoticeProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!isOpen || !noticeId) {
      return;
    }

    const currentNoticeId = noticeId;
    let isCancelled = false;

    async function loadNotice() {
      try {
        setIsLoading(true);
        setLoadError(false);

        const data = await fetchNoticeById(currentNoticeId);

        if (!isCancelled) {
          setNotice(data);
        }
      } catch {
        if (!isCancelled) {
          setLoadError(true);
          toast.error('Не вдалося завантажити оголошення.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNotice();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, noticeId]);

  const favorites = user?.noticesFavorites ?? [];

  const isFavorite = notice
    ? favorites.some((item) => item._id === notice._id)
    : false;

  const handleFavorite = async () => {
    if (!user || !notice) {
      return;
    }

    try {
      setIsFavoriteLoading(true);

      if (isFavorite) {
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
      setIsFavoriteLoading(false);
    }
  };

  const owner = notice && typeof notice.user === 'object' ? notice.user : null;

  const contactHref = owner?.phone
    ? `tel:${owner.phone.replace(/\s/g, '')}`
    : owner?.email
      ? `mailto:${owner.email}`
      : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Notice information">
      <div className={styles.wrapper}>
        {isLoading && <Loader label="Loading notice" />}

        {!isLoading && loadError && (
          <p className={styles.error}>
            Notice information could not be loaded.
          </p>
        )}

        {!isLoading && notice && (
          <>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={notice.imgURL}
                alt={notice.title}
                width={360}
                height={240}
              />

              <span className={styles.category}>{notice.category}</span>
            </div>

            <div className={styles.heading}>
              <h2 className={styles.title}>{notice.title}</h2>

              <div className={styles.popularity}>
                <Star
                  size={18}
                  fill="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{notice.popularity}</span>
              </div>
            </div>

            <dl className={styles.details}>
              <div>
                <dt>Name</dt>
                <dd>{notice.name}</dd>
              </div>

              <div>
                <dt>Birthday</dt>
                <dd>{notice.birthday}</dd>
              </div>

              <div>
                <dt>Sex</dt>
                <dd>{notice.sex}</dd>
              </div>

              <div>
                <dt>Species</dt>
                <dd>{notice.species}</dd>
              </div>
            </dl>

            <p className={styles.comment}>{notice.comment}</p>

            {notice.price !== undefined && (
              <p className={styles.price}>${notice.price}</p>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.favoriteButton}
                disabled={isFavoriteLoading}
                onClick={handleFavorite}
              >
                {isFavoriteLoading
                  ? 'Updating...'
                  : isFavorite
                    ? 'Remove from'
                    : 'Add to'}
              </button>

              {contactHref ? (
                <a className={styles.contactButton} href={contactHref}>
                  Contact
                </a>
              ) : (
                <span className={`${styles.contactButton} ${styles.disabled}`}>
                  Contact
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
