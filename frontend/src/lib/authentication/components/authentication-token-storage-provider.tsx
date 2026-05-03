import React from 'react';

import AuthenticationTokenStorageProviderProps from './types/authentication-token-storage-provider-props';

import { AuthenticationTokenStorageContext } from 'lib/authentication/authentication-token-storage-context';
import AuthenticationTokenStorageDefinition from 'lib/authentication/definitions/authentication-token-storage-definition';
import { serviceContainer } from 'lib/service-container/core-container';

export const AuthenticationTokenStorageProvider = ({
  children,
}: AuthenticationTokenStorageProviderProps) => {
  const authenticationTokenStorage =
    serviceContainer().fetch<AuthenticationTokenStorageDefinition>(
      'AuthenticationTokenStorage'
    );

  return (
    <AuthenticationTokenStorageContext.Provider
      value={{ authenticationTokenStorage }}
    >
      {children}
    </AuthenticationTokenStorageContext.Provider>
  );
};
