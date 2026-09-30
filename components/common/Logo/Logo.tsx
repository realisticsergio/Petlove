import Link from 'next/link';
import styles from './Logo.module.css';

type LogoProps = {
  variant?: 'dark' | 'light';
  onClick?: () => void;
};

export default function Logo({ variant = 'dark', onClick }: LogoProps) {
  return (
    <Link
      href="/home"
      className={`${styles.logo} ${styles[variant]}`}
      aria-label="Petlove — на головну сторінку"
      onClick={onClick}
    >
      petl<span className={styles.heart}>♥</span>ve
    </Link>
  );
}
