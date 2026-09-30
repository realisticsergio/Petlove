import NoticesItem from '@/components/notices/NoticesItem/NoticesItem';
import type { Notice } from '@/types/notices';
import styles from './NoticesList.module.css';

type NoticesListProps = {
  notices: Notice[];
  favoriteIds?: string[];
  updatingNoticeId?: string | null;
  onLearnMore: (notice: Notice) => void;
  onFavorite: (notice: Notice) => void;
};

export default function NoticesList({
  notices,
  favoriteIds = [],
  updatingNoticeId = null,
  onLearnMore,
  onFavorite,
}: NoticesListProps) {
  if (notices.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No notices found for the selected filters.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {notices.map((notice) => (
        <li key={notice._id}>
          <NoticesItem
            notice={notice}
            action="favorite"
            isFavorite={favoriteIds.includes(notice._id)}
            isActionLoading={updatingNoticeId === notice._id}
            onLearnMore={() => onLearnMore(notice)}
            onAction={() => onFavorite(notice)}
          />
        </li>
      ))}
    </ul>
  );
}
