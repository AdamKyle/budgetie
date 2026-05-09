import { AxiosError } from 'axios';

import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseActivityTimeoutParams {
  response: AxiosError;
  setError: StateSetter<unknown | null>;
}
