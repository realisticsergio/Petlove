import FriendsItem from '@/components/friends/FriendsItem/FriendsItem';
import type { Friend } from '@/types/friends';
import styles from './FriendsList.module.css';

type FriendsListProps = {
  friends: Friend[];
};

export default function FriendsList({ friends }: FriendsListProps) {
  if (friends.length === 0) {
    return (
      <p className={styles.empty}>Інформацію про партнерів не знайдено.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {friends.map((friend) => (
        <li key={friend._id}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
}
