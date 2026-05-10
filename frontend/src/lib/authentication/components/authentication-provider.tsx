import { ReactNode, useCallback, useEffect, useState } from 'react';

import AuthenticationProviderProps from './types/authentication-provider-props';

import { useAuthenticatedUser } from 'lib/authentication/api/hooks/use-authenticated-user';
import { AuthenticationContext } from 'lib/authentication/authentication-context';
import { UserDefinition } from 'lib/core/api/definitions/user-definition';

export const AuthenticationProvider = (
  props: AuthenticationProviderProps
): ReactNode => {
  const {
    authenticatedUser: fetchedAuthenticatedUser,
    error,
    loading,
  } = useAuthenticatedUser();

  const [authenticatedUser, setAuthenticatedUser] =
    useState<UserDefinition | null>(null);

  const clearAuthenticatedUser = useCallback(() => {
    setAuthenticatedUser(null);
  }, []);

  useEffect(() => {
    if (!fetchedAuthenticatedUser) {
      return;
    }

    setAuthenticatedUser(fetchedAuthenticatedUser);
  }, [fetchedAuthenticatedUser]);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticatedUser,
        clearAuthenticatedUser,
        error,
        loading,
        setAuthenticatedUser,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
