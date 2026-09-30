import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import PetBlock from '@/components/common/PetBlock/PetBlock';
import Title from '@/components/common/Title/Title';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your Petlove account.',
};

const loginImages = {
  mobile: '/images/Mobile-login.webp',
  tablet: '/images/Tablet-login.webp',
  desktop: '/images/Desktop-login.webp',
};

const petInfo = {
  emoji: '\u{1F436}',
  name: 'Rich',
  birthday: '21.09.2020',
  description:
    'Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!',
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <PetBlock
          images={loginImages}
          imageAlt="Happy corgi sitting on a warm yellow background"
          pet={petInfo}
        />

        <section className={styles.formCard}>
          <div className={styles.formContent}>
            <div className={styles.heading}>
              <Title>Log in</Title>

              <p className={styles.description}>
                Welcome! Please enter your credentials to login to the platform.
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
