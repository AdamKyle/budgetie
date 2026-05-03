import React, { ReactNode } from 'react';

import ApiHandlerProviderProps from './types/api-handler-provider-props';

import { ApiHandlerContext } from 'lib/api-handler/api-handler-context';
import AxiosDefinition from 'lib/api-handler/definitions/axios-definition';
import { getUrl } from 'lib/api-handler/utils/get-url';
import { serviceContainer } from 'lib/service-container/core-container';

export const ApiHandlerProvider = (
  props: ApiHandlerProviderProps
): ReactNode => {
  const apiHandler = serviceContainer().fetch<AxiosDefinition>('ApiHandler');

  return (
    <ApiHandlerContext.Provider value={{ apiHandler, getUrl }}>
      {props.children}
    </ApiHandlerContext.Provider>
  );
};
