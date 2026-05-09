import React from 'react';

import { UseLogout } from 'lib/authentication/api/hooks/use-logout';

import navigateToRoute from 'router/utils/navigate-to-route';

import Button from 'ui/buttons/button';
import { ButtonVariant } from 'ui/buttons/enums/button-variant';

const Onboarding = () => {
  const { loading, logout } = UseLogout({
    navigate_to_route: navigateToRoute,
  });

  const handleClickLogout = () => {
    logout().catch(() => {});
  };

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <section className="flex w-full max-w-md flex-col gap-6 text-center">
        <h1 className="text-storm-dust-950 dark:text-storm-dust-50 text-3xl font-bold">
          Onboarding
        </h1>

        <Button
          disabled={loading}
          label={loading ? 'Logging out' : 'Log out'}
          on_click={handleClickLogout}
          variant={ButtonVariant.PRIMARY}
        />
      </section>
    </main>
  );
};

export default Onboarding;
