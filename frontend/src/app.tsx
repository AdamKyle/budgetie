import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import BudgetieApplication from './budget-application';

import { ApiHandlerProvider } from 'lib/api-handler/components/api-handler-provider';
import { AuthenticationTokenStorageProvider } from 'lib/authentication/components/authentication-token-storage-provider';
import { ServiceContainer } from 'lib/service-container-provider/service-container';

import 'styles/styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceContainer>
        <ApiHandlerProvider>
          <AuthenticationTokenStorageProvider>
            <BudgetieApplication />
          </AuthenticationTokenStorageProvider>
        </ApiHandlerProvider>
      </ServiceContainer>
    </BrowserRouter>
  </React.StrictMode>
);
