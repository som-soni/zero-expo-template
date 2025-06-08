import Constants from 'expo-constants';

// Authentication configuration
export const authConfig = {
  google: {
    // These should be set in your app.config.js or .env file
    clientId: Constants.expoConfig?.extra?.googleClientId || 'your-google-client-id-here',
    webClientId: Constants.expoConfig?.extra?.googleWebClientId || 'your-google-web-client-id-here',
    iosClientId: Constants.expoConfig?.extra?.googleIosClientId || 'your-google-ios-client-id-here',
    androidClientId: Constants.expoConfig?.extra?.googleAndroidClientId || 'your-google-android-client-id-here',
  },
  
  // OAuth redirect URIs
  redirectUris: {
    development: 'https://auth.expo.io/@your-username/your-app-slug',
    production: 'https://auth.expo.io/@your-username/your-app-slug',
  },
};

// Helper to get the correct client ID based on platform
export const getGoogleClientId = () => {
  if (Constants.platform?.web) {
    return authConfig.google.webClientId;
  } else if (Constants.platform?.ios) {
    return authConfig.google.iosClientId;
  } else if (Constants.platform?.android) {
    return authConfig.google.androidClientId;
  }
  return authConfig.google.clientId;
}; 