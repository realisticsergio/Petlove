import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Petlove helps people care for pets and find loving companions.',
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Take good care of your{' '}
            <span className={styles.accent}>small pets</span>
          </h1>

          <p className={styles.description}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </section>

        <picture className={styles.picture}>
          <source
            media="(min-width: 1280px)"
            srcSet="/images/Home-desktop.webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/Home-tablet.webp"
          />
          <img
            className={styles.image}
            src="/images/Home-mobile.webp"
            alt="A woman gently hugging her dog outdoors"
            width={670}
            height={804}
            fetchPriority="high"
          />
        </picture>
      </div>
    </main>
  );
}
