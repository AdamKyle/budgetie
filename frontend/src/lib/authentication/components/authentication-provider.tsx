import { ReactNode, useCallback } from 'react';

import AuthenticationProviderProps from './types/authentication-provider-props';

import { useAuthenticatedUser } from 'lib/authentication/api/hooks/use-authenticated-user';
import { AuthenticationContext } from 'lib/authentication/authentication-context';

export const AuthenticationProvider = (
  props: AuthenticationProviderProps
): ReactNode => {
  const { authenticatedUser, error, loading, setAuthenticatedUser } =
    useAuthenticatedUser();

  const clearAuthenticatedUser = useCallback(() => {
    setAuthenticatedUser(null);
  }, [setAuthenticatedUser]);

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
