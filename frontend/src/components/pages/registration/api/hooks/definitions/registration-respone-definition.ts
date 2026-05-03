import { UserDefinition } from 'lib/core/api/definitions/user-definition';

export default interface RegistrationResponseDefinition {
  access: string;
  refresh: string;
  user: UserDefinition;
}
