import EditUserBtn from '@/components/profile/EditUserBtn/EditUserBtn';
import LogOutBtn from '@/components/profile/LogOutBtn/LogOutBtn';
import PetsBlock from '@/components/profile/PetsBlock/PetsBlock';
import UserBlock from '@/components/profile/UserBlock/UserBlock';
import styles from './UserCard.module.css';

export default function UserCard() {
  return (
    <section className={styles.card}>
      <div className={styles.label}>User</div>

      <div className={styles.editButton}>
        <EditUserBtn />
      </div>

      <h1 className={styles.title}>My information</h1>

      <UserBlock />

      <PetsBlock />

      <LogOutBtn />
    </section>
  );
}
