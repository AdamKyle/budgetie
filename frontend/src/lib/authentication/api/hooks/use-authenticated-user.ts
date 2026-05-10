import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import UseAuthenticatedUserDefinition from './definitions/use-authenticated-user-definition';

import { useApiHandler } from 'lib/api-handler/hooks/use-api-handler';
import { AuthenticationApiUrls } from 'lib/authentication/api/enums/authentication-api-urls';
import { UserDefinition } from 'lib/core/api/definitions/user-definition';

export const useAuthenticatedUser = (): UseAuthenticatedUserDefinition => {
  const { apiHandler, getUrl } = useApiHandler();

  const [authenticatedUser, setAuthenticatedUser] =
    useState<UserDefinition | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  const url = getUrl(AuthenticationApiUrls.USER);

  const fetchAuthenticatedUser = useCallback(async () => {
    if (authenticatedUser) {
      setLoading(false);

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiHandler.get<
        UserDefinition,
        AxiosRequestConfig<AxiosResponse<UserDefinition>>
      >(url);

      setAuthenticatedUser(result);
    } catch (err) {
      setAuthenticatedUser(null);

      if (err instanceof AxiosError) {
        setError(err.response?.data || null);
      }
    } finally {
      setLoading(false);
    }
  }, [apiHandler, authenticatedUser, url]);

  useEffect(() => {
    fetchAuthenticatedUser().catch(() => {});
  }, [fetchAuthenticatedUser]);

  return {
    authenticatedUser,
    error,
    loading,
  };
};
