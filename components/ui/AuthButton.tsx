import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { format } from '@/lib/utils';

interface AuthButtonProps {
  style?: any;
}

/**
 * AuthButton component that displays login/logout functionality in the top-right corner
 * - Shows login button when user is logged out
 * - Shows user avatar with dropdown when user is logged in
 */
export function AuthButton({ style }: AuthButtonProps) {
  const { user, isLoading, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogin = () => {
    router.push('/login' as any);
  };

  const handleLogout = () => {
    setIsDropdownVisible(false);
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.loadingButton, { backgroundColor: colors.gray200 }]}>
          <Text style={[styles.loadingText, { color: colors.gray500 }]}>...</Text>
        </View>
      </View>
    );
  }

  // Not logged in - show login button
  if (!user) {
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.tint }]}
          onPress={handleLogin}
        >
          <Ionicons name="log-in-outline" size={16} color="white" />
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Logged in - show avatar with dropdown
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.avatarButton, { backgroundColor: colors.tint }]}
        onPress={toggleDropdown}
        accessible={true}
        accessibilityLabel={`User menu for ${user.name}`}
        accessibilityHint="Opens user menu with logout option"
      >
        <Text style={styles.avatarText}>
          {format.initials(user.name)}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
          accessible={false}
        >
          <View style={styles.dropdownContainer}>
            <View
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  shadowColor: colors.text,
                },
              ]}
            >
              {/* User Info */}
              <View style={styles.userInfo}>
                <Text 
                  style={[styles.userName, { color: colors.text }]} 
                  numberOfLines={1}
                >
                  {user.name}
                </Text>
                <Text 
                  style={[styles.userEmail, { color: colors.gray500 }]} 
                  numberOfLines={1}
                >
                  {user.email}
                </Text>
              </View>

              {/* Divider */}
              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Logout Option */}
              <TouchableOpacity 
                style={styles.dropdownItem} 
                onPress={handleLogout}
                accessible={true}
                accessibilityLabel="Logout"
                accessibilityRole="button"
              >
                <Ionicons name="log-out-outline" size={18} color={colors.gray500} />
                <Text style={[styles.dropdownItemText, { color: colors.text }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loadingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    marginTop: Platform.select({
      ios: 100,
      android: 80,
      web: 60,
    }),
    marginRight: 16,
  },
  dropdown: {
    minWidth: 200,
    borderRadius: 8,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  userInfo: {
    padding: 16,
    paddingBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 