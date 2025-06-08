import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { getGoogleClientId } from '../config/auth';
import { User, GoogleAuthResponse } from '../types/auth';

// Warm up the browser for better UX on iOS/Android
WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export class AuthService {
  private static instance: AuthService;
  private request: AuthSession.AuthRequest | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private constructor() {
    this.initializeAuthRequest();
  }

  private initializeAuthRequest() {
    try {
      this.request = new AuthSession.AuthRequest({
        clientId: getGoogleClientId(),
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Token,
        redirectUri: AuthSession.makeRedirectUri({
          useProxy: true,
          scheme: undefined, // Let Expo handle the scheme
        }),
        additionalParameters: {},
        extraParams: {
          access_type: 'offline',
        },
      });
    } catch (error) {
      console.error('Error initializing auth request:', error);
    }
  }

  async signInWithGoogle(): Promise<User | null> {
    try {
      if (!this.request) {
        throw new Error('Auth request not initialized');
      }

      const result = await this.request.promptAsync(discovery, {
        useProxy: true,
        showInRecents: true,
      });

      if (result.type === 'success') {
        const accessToken = result.params.access_token;
        if (accessToken) {
          const userInfo = await this.getUserInfo(accessToken);
          return userInfo;
        }
      } else if (result.type === 'error') {
        throw new Error(result.error?.description || 'Authentication failed');
      }

      return null;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  private async getUserInfo(accessToken: string): Promise<User> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await response.json();
      
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      // For web, we might want to revoke the token
      if (Platform.OS === 'web') {
        // Additional cleanup for web if needed
      }
      
      // Clear any stored tokens/session data
      // This will be handled by the AuthContext
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
} 