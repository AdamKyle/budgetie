import { AxiosError } from 'axios';

import { AxiosErrorDefinition } from 'lib/api-handler/definitions/axios-error-definition';
import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseActivityTimeoutParams {
  response: AxiosError;
  setError: StateSetter<AxiosErrorDefinition | null>;
}
