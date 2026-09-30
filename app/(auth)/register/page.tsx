import type { Metadata } from 'next';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import PetBlock from '@/components/common/PetBlock/PetBlock';
import Title from '@/components/common/Title/Title';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Registration',
  description: 'Create your Petlove account.',
};

const registerImages = {
  mobile: '/images/Mobile-register.webp',
  tablet: '/images/Tablet-register.webp',
  desktop: '/images/Desktop-register.webp',
};

const petInfo = {
  emoji: '\u{1F408}',
  name: 'Jack',
  birthday: '18.10.2021',
  description:
    'Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.',
};

export default function RegistrationPage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <PetBlock
          images={registerImages}
          imageAlt="Orange cat sitting on a warm yellow background"
          pet={petInfo}
        />

        <section className={styles.formCard}>
          <div className={styles.formContent}>
            <div className={styles.heading}>
              <Title>Registration</Title>

              <p className={styles.description}>
                Thank you for your interest in our platform.
              </p>
            </div>

            <RegistrationForm />
          </div>
        </section>
      </div>
    </main>
  );
}
