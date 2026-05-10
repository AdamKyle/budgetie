import { useReducedMotion } from 'motion/react';
import { Link } from 'react-router';

import AuthenticatedProfileMenu from './authenticated-profile-menu';

import mascotImage from 'assets/mascot/finance-harbour-mascot.png';

import { NavigationRoutes } from 'router/enums/navigation-routes';

const BaseAuthenticatedNavigation = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="border-storm-dust-200 bg-storm-dust-50/95 dark:border-storm-dust-800 dark:bg-storm-dust-950/95 sticky top-0 z-50 border-b backdrop-blur">
      <nav
        aria-label="Authenticated navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6"
      >
        <div className="grid min-h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link
            to={NavigationRoutes.HOME}
            aria-label="Finance Harbour home"
            className="focus:ring-storm-dust-400 inline-flex items-center rounded-lg focus:ring-2 focus:outline-hidden"
          >
            <img
              src={mascotImage}
              alt=""
              aria-hidden="true"
              className="h-14 w-14 object-contain"
            />
          </Link>

          <div aria-hidden="true" />

          <AuthenticatedProfileMenu shouldReduceMotion={shouldReduceMotion} />
        </div>
      </nav>
    </header>
  );
};

export default BaseAuthenticatedNavigation;
