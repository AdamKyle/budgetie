import clsx from 'clsx';

import type { CardWithImageProps } from './types/card-with-image-card-props';

const CardWithImage = ({
  children,
  id,
  imageAlt,
  imageSrc,
  title,
  isImageRight = false,
}: CardWithImageProps) => {
  const titleId = `${id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="border-storm-dust-200 bg-storm-dust-100 dark:border-storm-dust-700 dark:bg-storm-dust-800 flex flex-col gap-4 rounded-md border p-3 shadow-sm transition-colors md:grid md:grid-cols-2 md:items-center md:gap-6 md:p-4"
    >
      <img
        alt={imageAlt}
        className={clsx(
          'w-full rounded-sm object-contain',
          isImageRight && 'md:order-2'
        )}
        src={imageSrc}
      />

      <div
        className={clsx(
          'px-2 pb-2 md:px-6 md:py-4',
          isImageRight && 'md:order-1'
        )}
      >
        <h2
          className="text-3xl font-semibold tracking-tight md:text-4xl"
          id={titleId}
        >
          {title}
        </h2>

        <div className="text-storm-dust-600 dark:text-storm-dust-300 mt-4 text-lg leading-8">
          {children}
        </div>
      </div>
    </article>
  );
};

export default CardWithImage;
