# Authentication Setup Guide

This app includes Google OAuth authentication using `expo-auth-session`. Follow these steps to configure it:

## 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" and create OAuth 2.0 Client IDs for each platform:

### For Web:
- Application type: Web application
- Authorized redirect URIs: `https://auth.expo.io/@your-username/your-app-slug`

### For iOS:
- Application type: iOS
- Bundle ID: Your app's bundle identifier from app.json

### For Android:
- Application type: Android
- Package name: Your app's package name
- SHA-1 certificate fingerprint: Get this from your keystore

## 2. Environment Variables

Update the `.env` file with your actual Google Client IDs:

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS="your-actual-ios-client-id"
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID="your-actual-android-client-id"
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB="your-actual-web-client-id"
```

## 3. App Configuration

The app is already configured with:
- Scheme: `zeroexpotemplate` (defined in app.json)
- Redirect URI: Uses Expo's auth proxy for development

## 4. Features Implemented

### ✅ Login State
- Shows "Sign in with Google" button when logged out
- Supports both collapsed and expanded sidebar states
- Loading states during authentication

### ✅ Authenticated State
- Displays user's name and email
- Shows user's first initial as avatar
- Logout functionality with confirmation dialog

### ✅ Persistence
- User session persists across app restarts using AsyncStorage
- Automatic session restoration on app launch

## 5. Usage

The authentication is managed through the `useAuth` hook:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isLoading, signInWithGoogle, signOut } = useAuth();
  
  // user will be null if not logged in
  // user will contain { id, name, email, picture? } if logged in
}
```

## 6. Testing

1. Start the development server: `npm start`
2. Open the app in Expo Go or a simulator
3. The sidebar should show the login button when not authenticated
4. Click "Sign in with Google" to test the flow

## 7. Production Considerations

- Replace placeholder client IDs with real ones
- Configure proper redirect URIs for production
- Consider implementing token refresh logic
- Add error handling for network issues
- Implement proper loading states throughout the app 