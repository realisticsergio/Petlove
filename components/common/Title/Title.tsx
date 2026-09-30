import type { ElementType, ReactNode } from 'react';
import styles from './Title.module.css';

type TitleProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function Title({
  children,
  as: Component = 'h1',
  className = '',
}: TitleProps) {
  return (
    <Component className={`${styles.title} ${className}`}>{children}</Component>
  );
}
