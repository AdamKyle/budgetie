import { useEffect } from 'react';

import { serviceContainer } from 'lib/service-container/core-container';

export const useBootServiceContainer = () => {
  useEffect(() => {
    serviceContainer();
  }, []);
};
