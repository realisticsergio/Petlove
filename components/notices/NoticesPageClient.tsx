'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';
import Pagination from '@/components/common/Pagination/Pagination';
import Title from '@/components/common/Title/Title';
import ModalAttention from '@/components/notices/ModalAttention/ModalAttention';
import ModalNotice from '@/components/notices/ModalNotice/ModalNotice';
import NoticesFilters, {
  initialNoticesFilters,
  type NoticesFilterValues,
} from '@/components/notices/NoticesFilters/NoticesFilters';
import NoticesList from '@/components/notices/NoticesList/NoticesList';
import { updateUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addNoticeToFavorites,
  fetchNotices,
  removeNoticeFromFavorites,
} from '@/services/notices';
import type { Notice, NoticesQuery } from '@/types/notices';
import styles from './NoticesPageClient.module.css';

type ApiErrorResponse = {
  message?: string;
};

const NOTICES_PER_PAGE = 6;

function getSortQuery(
  sort: NoticesFilterValues['sort'],
): Partial<NoticesQuery> {
  switch (sort) {
    case 'popular':
      return { byPopularity: false };

    case 'unpopular':
      return { byPopularity: true };

    case 'cheap':
      return { byPrice: true };

    case 'expensive':
      return { byPrice: false };

    default:
      return {};
  }
}

export default function NoticesPageClient() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [filters, setFilters] = useState<NoticesFilterValues>(
    initialNoticesFilters,
  );
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingNoticeId, setUpdatingNoticeId] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadNotices() {
      try {
        setIsLoading(true);

        const response = await fetchNotices({
          page: currentPage,
          limit: NOTICES_PER_PAGE,
          ...(filters.keyword ? { keyword: filters.keyword } : {}),
          ...(filters.category ? { category: filters.category } : {}),
          ...(filters.sex ? { sex: filters.sex } : {}),
          ...(filters.species ? { species: filters.species } : {}),
          ...(filters.location ? { locationId: filters.location.value } : {}),
          ...getSortQuery(filters.sort),
        });

        if (!isCancelled) {
          setNotices(response.results);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        if (!isCancelled) {
          const message = axios.isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data?.message
            : undefined;

          setNotices([]);
          setTotalPages(0);
          toast.error(message || 'Не вдалося завантажити оголошення.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNotices();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, filters]);

  const favorites = user?.noticesFavorites ?? [];
  const favoriteIds = favorites.map((notice) => notice._id);

  const handleFiltersChange = (nextFilters: NoticesFilterValues) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleLearnMore = (notice: Notice) => {
    if (!isLoggedIn) {
      setIsAttentionOpen(true);
      return;
    }

    setSelectedNoticeId(notice._id);
  };

  const handleFavorite = async (notice: Notice) => {
    if (!isLoggedIn || !user) {
      setIsAttentionOpen(true);
      return;
    }

    const isFavorite = favoriteIds.includes(notice._id);

    try {
      setUpdatingNoticeId(notice._id);

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
      setUpdatingNoticeId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles.content}>
        <Title>Find your favorite pet</Title>

        <NoticesFilters values={filters} onChange={handleFiltersChange} />

        {isLoading ? (
          <Loader label="Loading notices" />
        ) : (
          <NoticesList
            notices={notices}
            favoriteIds={favoriteIds}
            updatingNoticeId={updatingNoticeId}
            onLearnMore={handleLearnMore}
            onFavorite={handleFavorite}
          />
        )}

        {!isLoading && (
          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <ModalAttention
        isOpen={isAttentionOpen}
        onClose={() => setIsAttentionOpen(false)}
      />

      <ModalNotice
        noticeId={selectedNoticeId}
        isOpen={Boolean(selectedNoticeId)}
        onClose={() => setSelectedNoticeId(null)}
      />
    </>
  );
}
