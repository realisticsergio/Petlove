import { PawPrint } from 'lucide-react';
import styles from './PetBlock.module.css';

type PetInfo = {
  emoji: string;
  name: string;
  birthday: string;
  description: string;
};

type ResponsiveImages = {
  mobile: string;
  tablet: string;
  desktop: string;
};

type PetBlockProps = {
  images?: ResponsiveImages;
  imageAlt?: string;
  pet?: PetInfo;
};

export default function PetBlock({
  images,
  imageAlt = '',
  pet,
}: PetBlockProps) {
  return (
    <section className={styles.block} aria-label="Pet information">
      {images ? (
        <picture className={styles.picture}>
          <source media="(min-width: 1280px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />
          <img
            className={styles.image}
            src={images.mobile}
            alt={imageAlt}
            width={670}
            height={560}
            fetchPriority="high"
          />
        </picture>
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          <PawPrint size={80} strokeWidth={1.2} />
        </div>
      )}

      {pet && (
        <article className={styles.petCard}>
          <div className={styles.avatar} aria-hidden="true">
            {pet.emoji}
          </div>

          <div className={styles.petContent}>
            <div className={styles.petHeading}>
              <h2 className={styles.petName}>{pet.name}</h2>

              <p className={styles.birthday}>
                <span>Birthday:</span> {pet.birthday}
              </p>
            </div>

            <p className={styles.description}>{pet.description}</p>
          </div>
        </article>
      )}
    </section>
  );
}
