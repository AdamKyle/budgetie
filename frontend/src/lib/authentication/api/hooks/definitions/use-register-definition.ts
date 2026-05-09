import RegistrationErrorDefinition from './registration-error-definition';
import RegistrationRequestDefinition from './registration-request-definition';

import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseRegistrationDefinition {
  error: RegistrationErrorDefinition | null;
  loading: boolean;
  setRequestData: StateSetter<RegistrationRequestDefinition>;
}
