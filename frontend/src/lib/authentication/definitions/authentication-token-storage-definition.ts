export default interface AuthenticationTokenStorageDefinition {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}
