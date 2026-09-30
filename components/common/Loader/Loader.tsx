import styles from './Loader.module.css';

type LoaderProps = {
  fullScreen?: boolean;
  label?: string;
};

export default function Loader({
  fullScreen = false,
  label = 'Завантаження',
}: LoaderProps) {
  return (
    <div
      className={`${styles.wrapper} ${fullScreen ? styles.fullScreen : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
