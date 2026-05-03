import AuthenticationTokenStorage from './authentication-token-storage';
import AuthenticationTokenStorageDefinition from './definitions/authentication-token-storage-definition';

import { ModularContainerDefinition } from 'configuration/deffinitions/modular-container-definition';

import CoreContainerDefinition from 'lib/service-container/deffinitions/core-container-definition';

export const authenticationServiceContainer: ModularContainerDefinition = (
  container: CoreContainerDefinition
) => {
  container.register<AuthenticationTokenStorageDefinition>(
    'ApiHandler',
    new AuthenticationTokenStorage()
  );
};
