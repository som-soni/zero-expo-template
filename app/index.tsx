import { useEffect } from 'react';
import { router } from 'expo-router';

export default function RootIndex() {
  useEffect(() => {
    // Redirect to dashboard on app load
    router.replace('/dashboard');
  }, []);

  return null;
} 