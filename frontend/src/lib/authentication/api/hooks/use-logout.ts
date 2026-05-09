import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import UseLogoutDefinition from './definitions/use-logout-definition';
import UseLogoutParamsDefinition from './definitions/use-logout-params-definition';
import { useCsrfToken } from './use-csrf-token';

import { useApiHandler } from 'lib/api-handler/hooks/use-api-handler';
import { AuthenticationApiUrls } from 'lib/authentication/api/enums/authentication-api-urls';

import { NavigationRoutes } from 'router/enums/navigation-routes';

export const UseLogout = ({
  navigate_to_route,
}: UseLogoutParamsDefinition): UseLogoutDefinition => {
  const navigate = useNavigate();
  const { apiHandler, getUrl } = useApiHandler();
  const { fetchCsrfToken } = useCsrfToken();

  const [error, setError] = useState<UseLogoutDefinition['error']>(null);
  const [loading, setLoading] = useState(false);

  const url = getUrl(AuthenticationApiUrls.LOGOUT);

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await fetchCsrfToken();

      await apiHandler.post<
        void,
        AxiosRequestConfig<AxiosResponse<void>>,
        Record<string, never>
      >(url, {});

      navigate_to_route(navigate, NavigationRoutes.HOME);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data || null);
      }
    } finally {
      setLoading(false);
    }
  }, [apiHandler, fetchCsrfToken, navigate, navigate_to_route, url]);

  return {
    error,
    loading,
    logout,
  };
};
