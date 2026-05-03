import { createContext } from 'react';

import AuthenticationTokenStorageContextDefinition from './definitions/authentication-token-storage-context-definition';

export const AuthenticationTokenStorageContext =
  createContext<AuthenticationTokenStorageContextDefinition | null>(null);
