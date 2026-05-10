import { ReactNode, useId } from 'react';
import { useNavigate } from 'react-router';

import SectionWithTitleProps from './types/section-with-title-props';

import { NavigationRoutes } from 'router/enums/navigation-routes';
import { navigateToRoute } from 'router/utils/navigate-to-route';

import Card from 'ui/cards/card';

const SectionWithTitle = ({
  children,
  title,
}: SectionWithTitleProps): ReactNode => {
  const navigate = useNavigate();
  const titleId = useId();

  const handleGoBack = () => {
    navigateToRoute(navigate, NavigationRoutes.HOME);
  };

  return (
    <main className="bg-storm-dust-50 text-storm-dust-950 dark:bg-storm-dust-950 dark:text-storm-dust-50 flex-1 px-4 py-8 transition-colors sm:px-6 sm:py-12 lg:py-16">
      <section aria-labelledby={titleId} className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <button
            type="button"
            onClick={handleGoBack}
            aria-label={`Go back from ${title}`}
            className="focus:ring-storm-dust-400 text-storm-dust-700 hover:border-storm-dust-300 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:border-storm-dust-600 dark:hover:bg-storm-dust-800 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-transparent transition focus:ring-2 focus:outline-hidden"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>

          <h1
            id={titleId}
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {title}
          </h1>
        </div>

        <Card>{children}</Card>
      </section>
    </main>
  );
};

export default SectionWithTitle;
