import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Google OAuth configuration
const getGoogleClientId = () => {
  if (Platform.OS === 'ios') {
    return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
  } else if (Platform.OS === 'android') {
    return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;
  } else {
    return process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Google OAuth discovery document
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  // Create auth request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: getGoogleClientId() || '',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'zeroexpotemplate',
      }),
      responseType: AuthSession.ResponseType.Token, // Use implicit flow for mobile apps
      // Disable PKCE for implicit flow
      usePKCE: false,
    },
    discovery
  );

  // Fetch user info from Google
  const fetchUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true);
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
      
      setUser(userData);
      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('accessToken', accessToken); // Store token for future validation
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Clear any stored data on error
      await AsyncStorage.multiRemove(['user', 'accessToken']);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      }
    } else if (response?.type === 'error') {
      console.error('Auth error:', response.error);
      setIsLoading(false);
    } else if (response?.type === 'cancel') {
      console.log('Auth cancelled by user');
      setIsLoading(false);
    }
  }, [response]);

  // Validate stored token
  const validateStoredToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
      return response.ok;
    } catch {
      return false;
    }
  };

  // Check for existing auth on app start
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const [storedUser, storedToken] = await AsyncStorage.multiGet(['user', 'accessToken']);
        
        if (storedUser[1] && storedToken[1]) {
          // Validate the stored token
          const isTokenValid = await validateStoredToken(storedToken[1]);
          
          if (isTokenValid) {
            setUser(JSON.parse(storedUser[1]));
          } else {
            // Token is invalid, clear stored data
            await AsyncStorage.multiRemove(['user', 'accessToken']);
          }
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
        // Clear potentially corrupted data
        await AsyncStorage.multiRemove(['user', 'accessToken']);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Check if request is properly configured
      if (!request) {
        throw new Error('Auth request not properly configured');
      }
      
      const result = await promptAsync();
      
      // The response will be handled by the useEffect above
      if (result.type === 'cancel') {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Get stored token for revocation
      const storedToken = await AsyncStorage.getItem('accessToken');
      
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
      
      setUser(null);
      // Clear all auth-related data from AsyncStorage
      await AsyncStorage.multiRemove(['user', 'accessToken']);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signOut,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}