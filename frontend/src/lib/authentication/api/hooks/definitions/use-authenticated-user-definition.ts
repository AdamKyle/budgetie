import { UserDefinition } from 'lib/core/api/definitions/user-definition';
import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseAuthenticatedUserDefinition {
  authenticatedUser: UserDefinition | null;
  error: unknown | null;
  loading: boolean;
  setAuthenticatedUser: StateSetter<UserDefinition | null>;
}
