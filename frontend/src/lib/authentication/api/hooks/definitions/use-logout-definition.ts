import LogoutErrorDefinition from './logout-error-deffinition';

export default interface UseLogoutDefinition {
  loading: boolean;
  error: LogoutErrorDefinition | null;
  logout: () => Promise<void>;
}
