import { UserDefinition } from 'lib/core/api/definitions/user-definition';
import { StateSetter } from 'lib/types/state-setter-type';

export default interface AuthenticationContextDefinition {
  authenticatedUser: UserDefinition | null;
  clearAuthenticatedUser: () => void;
  error: unknown | null;
  loading: boolean;
  setAuthenticatedUser: StateSetter<UserDefinition | null>;
}
