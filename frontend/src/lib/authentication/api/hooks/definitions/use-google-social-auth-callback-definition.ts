import GoogleSocialAuthErrorDefinition from './google-social-auth-error-definition';
import GoogleSocialAuthRequestDefinition from './google-social-auth-request-definition';

import { StateSetter } from 'lib/types/state-setter-type';

export default interface UseGoogleSocialAuthCallbackDefinition {
  error: GoogleSocialAuthErrorDefinition | null;
  loading: boolean;
  setRequestData: StateSetter<GoogleSocialAuthRequestDefinition>;
}
