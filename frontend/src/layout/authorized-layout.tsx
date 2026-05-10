import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import BaseAuthenticatedNavigation from 'components/authenticated-navigation/base-authenticated-navigation';

const AuthorizedLayout = (): ReactNode => {
  return (
    <div className="bg-storm-dust-50 text-storm-dust-950 dark:bg-storm-dust-950 dark:text-storm-dust-50 flex min-h-dvh flex-col transition-colors duration-200">
      <BaseAuthenticatedNavigation />

      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;
