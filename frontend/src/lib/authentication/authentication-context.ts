import { createContext } from 'react';

import AuthenticationContextDefinition from './definitions/authentication-context-definition';

export const AuthenticationContext =
  createContext<AuthenticationContextDefinition | null>(null);
