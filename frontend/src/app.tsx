import 'reflect-metadata';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import FinanceHarbourApplication from './finance-harbour-application';

import { ApiHandlerProvider } from 'lib/api-handler/components/api-handler-provider';
import { ServiceContainer } from 'lib/service-container-provider/service-container';

import 'styles/styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceContainer>
        <ApiHandlerProvider>
          <FinanceHarbourApplication />
        </ApiHandlerProvider>
      </ServiceContainer>
    </BrowserRouter>
  </React.StrictMode>
);
