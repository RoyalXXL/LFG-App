export interface AuthProvider {
  getCurrentUserId(): Promise<string | null>;
}

export class AuthService {
  constructor(private readonly provider: AuthProvider) {}

  currentUser() {
    return this.provider.getCurrentUserId();
  }
}