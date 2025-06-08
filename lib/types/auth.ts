export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  givenName?: string;
  familyName?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface GoogleAuthResponse {
  type: 'success' | 'cancel';
  params?: {
    access_token?: string;
    id_token?: string;
  };
  error?: string;
} 