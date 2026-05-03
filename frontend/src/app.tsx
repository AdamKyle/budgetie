import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import BudgetieApplication from './budget-application';

import { ServiceContainer } from 'lib/service-container-provider/service-container';
import 'styles/styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceContainer>
        <BudgetieApplication />
      </ServiceContainer>
    </BrowserRouter>
  </React.StrictMode>
);
