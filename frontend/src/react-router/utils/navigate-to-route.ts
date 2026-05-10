import type { NavigateFunction } from 'react-router';

import type { NavigationRoutes } from 'router/enums/navigation-routes';

/**
 * Lets us navigate to a named route.
 *
 * @param navigate
 * @param route
 */
export const navigateToRoute = (
  navigate: NavigateFunction,
  route: NavigationRoutes
) => {
  void navigate(route);
};

export const navigateToPreviousRoute = (navigate: NavigateFunction) => {
  void navigate(-1);
};
