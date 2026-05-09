import { UserDefinition } from 'lib/core/api/definitions/user-definition';

export default interface UseAuthenticatedUserDefinition {
  authenticatedUser: UserDefinition | null;
  error: unknown | null;
  loading: boolean;
}
