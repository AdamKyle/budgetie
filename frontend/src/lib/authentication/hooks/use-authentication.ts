import { useContext } from 'react';

import { AuthenticationContext } from 'lib/authentication/authentication-context';
import AuthenticationContextDefinition from 'lib/authentication/definitions/authentication-context-definition';

export const useAuthentication = (): AuthenticationContextDefinition => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationContext'
    );
  }

  return context;
};
