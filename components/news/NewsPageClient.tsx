'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';
import Pagination from '@/components/common/Pagination/Pagination';
import SearchField from '@/components/common/SearchField/SearchField';
import Title from '@/components/common/Title/Title';
import NewsList from '@/components/news/NewsList/NewsList';
import { fetchNews } from '@/services/news';
import type { NewsItem } from '@/types/news';
import styles from './NewsPageClient.module.css';

const NEWS_PER_PAGE = 6;

export default function NewsPageClient() {
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadNews = async () => {
      setIsLoading(true);

      try {
        const data = await fetchNews({
          page: currentPage,
          limit: NEWS_PER_PAGE,
          keyword,
        });

        if (!isActive) {
          return;
        }

        setNews(data.results);
        setTotalPages(data.totalPages);
      } catch {
        if (isActive) {
          setNews([]);
          setTotalPages(1);
          toast.error('Не вдалося завантажити новини.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isActive = false;
    };
  }, [currentPage, keyword]);

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setKeyword(value);
  };

  const handleClear = () => {
    setCurrentPage(1);
    setKeyword('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.heading}>
          <Title>News</Title>

          <SearchField
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={handleSearch}
            onClear={handleClear}
            placeholder="Search"
            ariaLabel="Пошук новин"
          />
        </div>

        <section
          className={styles.results}
          aria-label="Список новин"
          aria-busy={isLoading}
        >
          {isLoading ? <Loader /> : <NewsList items={news} />}
        </section>

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
    </main>
  );
}
