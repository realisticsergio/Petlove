import type { Friend } from '@/types/friends';
import styles from './FriendsItem.module.css';

type FriendsItemProps = {
  friend: Friend;
};

function getWorkTime(friend: Friend) {
  const openDay = friend.workDays?.find((day) => day.isOpen);

  if (!openDay?.from || !openDay?.to) {
    return 'Day and night';
  }

  return `${openDay.from} - ${openDay.to}`;
}

export default function FriendsItem({ friend }: FriendsItemProps) {
  return (
    <article className={styles.card}>
      <p className={styles.schedule}>{getWorkTime(friend)}</p>

      <div className={styles.content}>
        <a
          className={styles.logoLink}
          href={friend.url || undefined}
          target={friend.url ? '_blank' : undefined}
          rel={friend.url ? 'noopener noreferrer' : undefined}
          aria-label={`Відкрити сайт ${friend.title}`}
        >
          <img
            className={styles.logo}
            src={friend.imageUrl}
            alt={`Логотип ${friend.title}`}
            width={90}
            height={90}
            loading="lazy"
          />
        </a>

        <div className={styles.info}>
          <h2 className={styles.title}>{friend.title}</h2>

          <address className={styles.contacts}>
            <p className={styles.row}>
              <span className={styles.label}>Email:</span>

              {friend.email ? (
                <a className={styles.link} href={`mailto:${friend.email}`}>
                  {friend.email}
                </a>
              ) : (
                <span className={styles.value}>—</span>
              )}
            </p>

            <p className={styles.row}>
              <span className={styles.label}>Address:</span>

              {friend.address && friend.addressUrl ? (
                <a
                  className={styles.link}
                  href={friend.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {friend.address}
                </a>
              ) : (
                <span className={styles.value}>{friend.address || '—'}</span>
              )}
            </p>

            <p className={styles.row}>
              <span className={styles.label}>Phone:</span>

              {friend.phone ? (
                <a
                  className={styles.link}
                  href={`tel:${friend.phone.replace(/\s/g, '')}`}
                >
                  {friend.phone}
                </a>
              ) : (
                <span className={styles.value}>—</span>
              )}
            </p>
          </address>
        </div>
      </div>
    </article>
  );
}
