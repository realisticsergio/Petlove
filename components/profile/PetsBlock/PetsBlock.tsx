'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import PetsList from '@/components/profile/PetsList/PetsList';
import { useAppSelector } from '@/redux/hooks';
import styles from './PetsBlock.module.css';

export default function PetsBlock() {
  const pets = useAppSelector((state) => state.auth.user?.pets ?? []);

  return (
    <section className={styles.section} aria-labelledby="my-pets-title">
      <div className={styles.heading}>
        <h2 id="my-pets-title" className={styles.title}>
          My pets
        </h2>

        <Link className={styles.addLink} href="/add-pet">
          <span>Add pet</span>

          <span className={styles.addIcon} aria-hidden="true">
            <Plus size={18} strokeWidth={2} />
          </span>
        </Link>
      </div>

      <PetsList pets={pets} />
    </section>
  );
}
