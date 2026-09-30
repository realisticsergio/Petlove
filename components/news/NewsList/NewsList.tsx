import NewsItem from '@/components/news/NewsItem/NewsItem';
import type { NewsItem as NewsItemData } from '@/types/news';
import styles from './NewsList.module.css';

type NewsListProps = {
  items: NewsItemData[];
};

export default function NewsList({ items }: NewsListProps) {
  if (items.length === 0) {
    return <p className={styles.empty}>За вашим запитом новин не знайдено.</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item._id} className={styles.item}>
          <NewsItem item={item} />
        </li>
      ))}
    </ul>
  );
}
