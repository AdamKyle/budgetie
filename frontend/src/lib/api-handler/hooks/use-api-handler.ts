import { useContext } from 'react';

import { ApiHandlerContext } from 'lib/api-handler/api-handler-context';
import ApiHandleContextDefinition from 'lib/api-handler/definitions/api-handle-context-definition';

export const useApiHandler = (): ApiHandleContextDefinition => {
  const context = useContext(ApiHandlerContext);

  if (!context) {
    throw new Error('useApiHandler must be used within an ApiHandlerContext');
  }

  return context;
};
