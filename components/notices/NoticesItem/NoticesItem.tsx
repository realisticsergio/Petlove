import { Heart, Star, Trash2 } from 'lucide-react';
import type { Notice } from '@/types/notices';
import styles from './NoticesItem.module.css';

type NoticeAction = 'favorite' | 'remove' | 'none';

type NoticesItemProps = {
  notice: Notice;
  action?: NoticeAction;
  isFavorite?: boolean;
  isActionLoading?: boolean;
  onAction?: () => void;
  onLearnMore?: () => void;
};

export default function NoticesItem({
  notice,
  action = 'favorite',
  isFavorite = false,
  isActionLoading = false,
  onAction,
  onLearnMore,
}: NoticesItemProps) {
  const actionLabel =
    action === 'remove'
      ? `Remove ${notice.title} from favorites`
      : isFavorite
        ? `Remove ${notice.title} from favorites`
        : `Add ${notice.title} to favorites`;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={notice.imgURL}
          alt={notice.title}
          width={315}
          height={178}
          loading="lazy"
        />

        <span className={styles.category}>{notice.category}</span>
      </div>

      <div className={styles.heading}>
        <h3 className={styles.title}>{notice.title}</h3>

        <div className={styles.popularity}>
          <Star
            size={16}
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>{notice.popularity}</span>
        </div>
      </div>

      <dl className={styles.details}>
        <div className={styles.detail}>
          <dt>Name</dt>
          <dd>{notice.name}</dd>
        </div>

        <div className={styles.detail}>
          <dt>Birthday</dt>
          <dd>{notice.birthday}</dd>
        </div>

        <div className={styles.detail}>
          <dt>Sex</dt>
          <dd>{notice.sex}</dd>
        </div>

        <div className={styles.detail}>
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
          className={styles.learnMore}
          onClick={onLearnMore}
        >
          Learn more
        </button>

        {action !== 'none' && (
          <button
            type="button"
            className={`${styles.actionButton} ${
              isFavorite ? styles.favorite : ''
            }`}
            aria-label={actionLabel}
            disabled={isActionLoading}
            onClick={onAction}
          >
            {action === 'remove' ? (
              <Trash2 size={18} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Heart
                size={18}
                fill={isFavorite ? 'currentColor' : 'none'}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </button>
        )}
      </div>
    </article>
  );
}
