import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Constants
const AUTH_STORAGE_KEY = '@auth_user';
const TOKEN_STORAGE_KEY = '@auth_token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Google OAuth configuration
const getGoogleClientId = (): string => {
  switch (Platform.OS) {
    case 'ios':
      return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS || '';
    case 'android':
      return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID || '';
    default:
      return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB || '';
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Google OAuth discovery document
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  // Create auth request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: getGoogleClientId(),
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'zeroexpotemplate',
      }),
    },
    discovery
  );

  // Helper function to update auth state
  const updateAuthState = (user: User | null, isLoading = false) => {
    setAuthState({
      user,
      isLoading,
      isAuthenticated: !!user,
    });
  };

  // Fetch user info from Google
  const fetchUserInfo = async (accessToken: string): Promise<User | null> => {
    try {
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );
      
      if (!userInfoResponse.ok) {
        throw new Error(`HTTP error! status: ${userInfoResponse.status}`);
      }
      
      const userInfo = await userInfoResponse.json();
      
      const userData: User = {
        id: userInfo.id,
        name: userInfo.name || userInfo.email,
        email: userInfo.email,
        picture: userInfo.picture,
      };
      
      return userData;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  // Validate stored token
  const validateStoredToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
      );
      return response.ok;
    } catch {
      return false;
    }
  };

  // Handle auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleAuthSuccess(authentication.accessToken);
      }
    } else if (response?.type === 'error') {
      console.error('Auth error:', response.error);
      updateAuthState(null, false);
    } else if (response?.type === 'cancel') {
      console.log('Auth cancelled by user');
      updateAuthState(null, false);
    }
  }, [response]);

  const handleAuthSuccess = async (accessToken: string) => {
    try {
      updateAuthState(null, true);
      
      const userData = await fetchUserInfo(accessToken);
      
      if (userData) {
        // Store user data and token
        await AsyncStorage.multiSet([
          [AUTH_STORAGE_KEY, JSON.stringify(userData)],
          [TOKEN_STORAGE_KEY, accessToken],
        ]);
        
        updateAuthState(userData, false);
      } else {
        updateAuthState(null, false);
      }
    } catch (error) {
      console.error('Error handling auth success:', error);
      updateAuthState(null, false);
    }
  };

  // Check for existing auth on app start
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const [[, storedUser], [, storedToken]] = await AsyncStorage.multiGet([
          AUTH_STORAGE_KEY,
          TOKEN_STORAGE_KEY,
        ]);
        
        if (storedUser && storedToken) {
          // Validate the stored token
          const isTokenValid = await validateStoredToken(storedToken);
          
          if (isTokenValid) {
            const userData = JSON.parse(storedUser);
            updateAuthState(userData, false);
          } else {
            // Token is invalid, clear stored data
            await clearAuthData();
            updateAuthState(null, false);
          }
        } else {
          updateAuthState(null, false);
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
        await clearAuthData();
        updateAuthState(null, false);
      }
    };

    checkExistingAuth();
  }, []);

  const clearAuthData = async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      if (!request) {
        throw new Error('Auth request not properly configured');
      }
      
      updateAuthState(authState.user, true);
      await promptAsync();
    } catch (error) {
      console.error('Error signing in with Google:', error);
      updateAuthState(authState.user, false);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      updateAuthState(null, true);
      
      // Get stored token for revocation
      const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      
      // Revoke the token if it exists
      if (storedToken) {
        try {
          await fetch(`https://oauth2.googleapis.com/revoke?token=${storedToken}`, {
            method: 'POST',
          });
        } catch (revokeError) {
          console.warn('Error revoking token:', revokeError);
          // Continue with sign out even if token revocation fails
        }
      }
      
      await clearAuthData();
      updateAuthState(null, false);
    } catch (error) {
      console.error('Error signing out:', error);
      // Still clear local state even if there's an error
      updateAuthState(null, false);
      throw error;
    }
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      
      if (storedToken) {
        const isValid = await validateStoredToken(storedToken);
        
        if (!isValid) {
          await signOut();
        }
      } else {
        await signOut();
      }
    } catch (error) {
      console.error('Error refreshing auth:', error);
      await signOut();
    }
  };

  const value: AuthContextType = {
    ...authState,
    signInWithGoogle,
    signOut,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 