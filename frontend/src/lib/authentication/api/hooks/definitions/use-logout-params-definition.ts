import { NavigateFunction } from 'react-router';

import { NavigationRoutes } from 'router/enums/navigation-routes';

export default interface UseLogoutParamsDefinition {
  navigate_to_route: (
    navigate: NavigateFunction,
    route: NavigationRoutes
  ) => void;
}
