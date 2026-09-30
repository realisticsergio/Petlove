import type { NewsItem as NewsItemData } from '@/types/news';
import styles from './NewsItem.module.css';

type NewsItemProps = {
  item: NewsItemData;
};

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split('-');

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

export default function NewsItem({ item }: NewsItemProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={item.imgUrl}
        alt=""
        width={361}
        height={226}
        loading="lazy"
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>

        <p className={styles.description}>{item.text}</p>

        <div className={styles.footer}>
          <time className={styles.date} dateTime={item.date}>
            {formatDate(item.date)}
          </time>

          <a
            className={styles.link}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
}
