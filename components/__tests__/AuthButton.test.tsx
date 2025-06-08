import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { AuthButton } from '../ui/AuthButton';
import { AuthProvider } from '@/lib/contexts/AuthContext';

// Mock the auth context
const mockSignInWithGoogle = jest.fn();
const mockSignOut = jest.fn();

jest.mock('@/lib/contexts/AuthContext', () => ({
  ...jest.requireActual('@/lib/contexts/AuthContext'),
  useAuth: () => ({
    user: null,
    isLoading: false,
    signInWithGoogle: mockSignInWithGoogle,
    signOut: mockSignOut,
    isAuthenticated: false,
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock color scheme
jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: () => 'light',
}));

describe('AuthButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login button when user is not authenticated', () => {
    const { getByText } = render(<AuthButton />);
    
    expect(getByText('Login')).toBeTruthy();
  });

  it('calls signInWithGoogle when login button is pressed', async () => {
    const { getByText } = render(<AuthButton />);
    
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
  });

  it('shows loading state when isLoading is true', () => {
    // Mock loading state
    jest.doMock('@/lib/contexts/AuthContext', () => ({
      useAuth: () => ({
        user: null,
        isLoading: true,
        signInWithGoogle: mockSignInWithGoogle,
        signOut: mockSignOut,
        isAuthenticated: false,
      }),
    }));

    const { getByText } = render(<AuthButton />);
    
    expect(getByText('...')).toBeTruthy();
  });
}); 