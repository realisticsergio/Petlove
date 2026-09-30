import type { Metadata } from 'next';
import PetBlock from '@/components/common/PetBlock/PetBlock';
import AddPetForm from '@/components/pets/AddPetForm/AddPetForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Add pet',
  description: 'Add information about your pet to your Petlove profile.',
};

const addPetImages = {
  mobile: '/images/Mobile-add-pet.webp',
  tablet: '/images/Tablet-add-pet.webp',
  desktop: '/images/Desktop-add-pet.webp',
};

export default function AddPetPage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <PetBlock
          images={addPetImages}
          imageAlt="Dog wearing glasses on a yellow background"
        />

        <section className={styles.formSection} aria-label="Add pet form">
          <AddPetForm />
        </section>
      </div>
    </main>
  );
}
