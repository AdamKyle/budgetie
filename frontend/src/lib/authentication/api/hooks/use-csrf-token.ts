import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

import CsrfResponseDefinition from './definitions/csrf-response-definition';
import UseCsrfTokenDefinition from './definitions/use-csrf-token-definition';

import { useApiHandler } from 'lib/api-handler/hooks/use-api-handler';
import { AuthenticationApiUrls } from 'lib/authentication/api/enums/authentication-api-urls';

export const useCsrfToken = (): UseCsrfTokenDefinition => {
  const { apiHandler, getUrl } = useApiHandler();

  const [error, setError] = useState<UseCsrfTokenDefinition['error']>(null);
  const [loading, setLoading] = useState(false);

  const url = getUrl(AuthenticationApiUrls.CSRF);

  const fetchCsrfToken = useCallback(async () => {
    setLoading(true);

    try {
      return await apiHandler.get<
        CsrfResponseDefinition,
        AxiosRequestConfig<AxiosResponse<CsrfResponseDefinition>>
      >(url);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data || null);
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, [apiHandler, url]);

  return {
    error,
    fetchCsrfToken,
    loading,
  };
};
