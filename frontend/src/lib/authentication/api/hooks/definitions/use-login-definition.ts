import LoginErrorDefinition from './login-error-definition';
import LoginRequestDefinition from './login-request-definition';

import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseLoginDefinition {
  error: LoginErrorDefinition | null;
  loading: boolean;
  setRequestData: StateSetter<LoginRequestDefinition>;
}
