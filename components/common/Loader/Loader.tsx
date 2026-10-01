'use client';

import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

type LoaderProps = {
  fullScreen?: boolean;
  label?: string;
};

export default function Loader({
  fullScreen = false,
  label = 'Завантаження',
}: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!fullScreen) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) =>
        currentProgress >= 95 ? 95 : currentProgress + 5,
      );
    }, 80);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fullScreen]);

  if (!fullScreen) {
    return (
      <div className={styles.wrapper} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <span className="visually-hidden">{label}</span>
      </div>
    );
  }

  return (
    <div className={styles.fullScreen} role="status" aria-live="polite">
      <picture className={styles.picture}>
        <source
          media="(min-width: 1280px)"
          srcSet="/images/Loading-desktop.webp"
        />

        <source
          media="(min-width: 768px)"
          srcSet="/images/Loading-tablet.webp"
        />

        <img
          className={styles.background}
          src="/images/Loading-mobile.webp"
          alt=""
          fetchPriority="high"
        />
      </picture>

      <div className={styles.content}>
        {progress < 30 ? (
          <div className={styles.logo} aria-hidden="true">
            petl<span>♥</span>ve
          </div>
        ) : (
          <div className={styles.progress} aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle
                className={styles.progressTrack}
                cx="50"
                cy="50"
                r="46"
                pathLength="100"
              />

              <circle
                className={styles.progressValue}
                cx="50"
                cy="50"
                r="46"
                pathLength="100"
                style={{
                  strokeDashoffset: 100 - progress,
                }}
              />
            </svg>

            <span>{progress}%</span>
          </div>
        )}

        <span className="visually-hidden">{label}</span>
      </div>
    </div>
  );
}
