import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import RegistrationRequestDefinition from './definitions/registration-request-definition';
import RegistrationResponseDefinition from './definitions/registration-respone-definition';
import UseRegistrationDefinition from './definitions/use-register-definition';

import { useApiHandler } from 'lib/api-handler/hooks/use-api-handler';
import { useAuthenticationTokenStorage } from 'lib/authentication/hooks/use-authentication-toke-storage';

import { RegistrationApiUrls } from 'components/pages/registration/api/enums/registration-api-urls';

export const useRegister = (): UseRegistrationDefinition => {
  const { apiHandler, getUrl } = useApiHandler();
  const { authenticationTokenStorage } = useAuthenticationTokenStorage();

  const [data, setData] = useState<RegistrationResponseDefinition | null>(null);
  const [error, setError] = useState<UseRegistrationDefinition['error']>(null);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState<RegistrationRequestDefinition>(
    {
      email: '',
      password: '',
    }
  );

  const url = getUrl(RegistrationApiUrls.REGISTER);

  const register = useCallback(async () => {
    setLoading(true);

    try {
      const result = await apiHandler.post<
        RegistrationResponseDefinition,
        AxiosRequestConfig<AxiosResponse<RegistrationResponseDefinition>>,
        RegistrationRequestDefinition
      >(url, {
        email: requestData.email,
        password: requestData.password,
      });

      setData(result);

      authenticationTokenStorage.setAccessToken(result.access);
      authenticationTokenStorage.setRefreshToken(result.refresh);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data || null);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiHandler, url]);

  useEffect(() => {
    if (requestData.email === '' || requestData.password === '') {
      return;
    }

    register().catch(() => {});
  }, [register, requestData]);

  return {
    data,
    error,
    loading,
    setRequestData,
  };
};
