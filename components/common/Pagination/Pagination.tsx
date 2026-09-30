'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import styles from './Pagination.module.css';

type PaginationItem = number | 'ellipsis';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 'ellipsis'];
  }

  if (currentPage >= totalPages - 1) {
    return ['ellipsis', totalPages - 1, totalPages];
  }

  return ['ellipsis', currentPage, 'ellipsis'];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className={styles.pagination} aria-label="Пагінація">
      <div className={styles.group}>
        <button
          type="button"
          className={styles.button}
          disabled={isFirstPage}
          aria-label="Перша сторінка"
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.button}
          disabled={isFirstPage}
          aria-label="Попередня сторінка"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.group}>
        {items.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`${styles.button} ${styles.ellipsis}`}
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              aria-label={`Сторінка ${item}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className={styles.group}>
        <button
          type="button"
          className={styles.button}
          disabled={isLastPage}
          aria-label="Наступна сторінка"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.button}
          disabled={isLastPage}
          aria-label="Остання сторінка"
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
