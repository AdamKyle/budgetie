import { useContext } from 'react';

import { AuthenticationTokenStorageContext } from 'lib/authentication/authentication-token-storage-context';
import AuthenticationTokenStorageContextDefinition from 'lib/authentication/definitions/authentication-token-storage-context-definition';

export const useAuthenticationTokenStorage =
  (): AuthenticationTokenStorageContextDefinition => {
    const context = useContext(AuthenticationTokenStorageContext);

    if (!context) {
      throw new Error(
        'useAuthenticationTokenStorage must be used within an AuthenticationTokenStorageContext'
      );
    }

    return context;
  };
