import CsrfResponseDefinition from './csrf-response-definition';

export default interface UseCsrfTokenDefinition {
  fetchCsrfToken: () => Promise<CsrfResponseDefinition | null>;
  error: unknown | null;
  loading: boolean;
}
