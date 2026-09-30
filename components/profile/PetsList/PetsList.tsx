import PetsItem from '@/components/profile/PetsItem/PetsItem';
import type { Pet } from '@/types/pets';
import styles from './PetsList.module.css';

type PetsListProps = {
  pets: Pet[];
};

export default function PetsList({ pets }: PetsListProps) {
  if (pets.length === 0) {
    return (
      <div className={styles.empty}>
        <p>You haven&apos;t added any pets yet.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {pets.map((pet) => (
        <li key={pet._id}>
          <PetsItem pet={pet} />
        </li>
      ))}
    </ul>
  );
}
