import RegistrationErrorDefinition from './registration-error-definition';
import RegistrationRequestDefinition from './registration-request-definition';
import RegistrationResponseDefinition from './registration-respone-definition';

import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseRegistrationDefinition {
  data: RegistrationResponseDefinition | null;
  error: RegistrationErrorDefinition | null;
  loading: boolean;
  setRequestData: StateSetter<RegistrationRequestDefinition>;
}
