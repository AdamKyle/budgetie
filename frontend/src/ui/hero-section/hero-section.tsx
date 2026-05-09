import { useId } from 'react';

import type HeroSectionProps from './types/hero-props';

const HeroSection = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  children,
}: HeroSectionProps) => {
  const titleId = useId();
  const subtitleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
      className="bg-storm-dust-50 text-storm-dust-950 dark:bg-storm-dust-950 dark:text-storm-dust-50 flex items-center px-6 py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-tom-thumb-700 dark:text-tom-thumb-300 text-sm font-semibold tracking-wide uppercase">
            Finance Harbour
          </p>

          <h1
            id={titleId}
            className="mt-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>

          <p
            id={subtitleId}
            className="text-storm-dust-600 dark:text-storm-dust-300 mt-6 max-w-xl text-lg leading-8"
          >
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">{children}</div>
        </div>

        <div className="bg-storm-dust-100 dark:bg-storm-dust-900 rounded-sm p-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto w-full rounded-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
