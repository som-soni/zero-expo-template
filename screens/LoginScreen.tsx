/**
 * Login Screen
 * 
 * Login screen component using the new theming system and component structure.
 * This demonstrates proper screen-level component organization.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/Button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { styles } from './LoginScreen.styles';

export default function LoginScreen() {
  const { colors, spacing, radii, typography } = useTheme();
  const { user, signInWithGoogle, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      router.replace('/' as any);
    }
  }, [user]);

  const handleEmailLogin = () => {
    // Placeholder for email/password login
    Alert.alert(
      'Coming Soon',
      'Email/password login is not implemented yet. Please use Google login for now.'
    );
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Navigation will be handled by auth state change
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Login Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  const handleSignUp = () => {
    router.push('/register' as any);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { marginBottom: spacing['3xl'] }]}>
            <Text style={[
              styles.title, 
              { 
                color: colors.text,
                fontSize: typography.fontSizes['3xl'],
                fontWeight: typography.fontWeights.bold,
                marginBottom: spacing.sm,
              }
            ]}>
              Welcome Back
            </Text>
            <Text style={[
              styles.subtitle, 
              { 
                color: colors.textSecondary,
                fontSize: typography.fontSizes.base,
              }
            ]}>
              Sign in to your account
            </Text>
          </View>

          {/* Login Form */}
          <View style={[styles.form, { marginBottom: spacing['3xl'] }]}>
            {/* Email Input */}
            <View style={[styles.inputGroup, { marginBottom: spacing.lg }]}>
              <Text style={[
                styles.label, 
                { 
                  color: colors.text,
                  fontSize: typography.fontSizes.base,
                  fontWeight: typography.fontWeights.semiBold,
                  marginBottom: spacing.sm,
                }
              ]}>
                Email
              </Text>
              <View style={[
                styles.inputContainer,
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  borderRadius: radii.md,
                  paddingHorizontal: spacing.md,
                  minHeight: 50,
                }
              ]}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={colors.textTertiary}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      color: colors.text,
                      fontSize: typography.fontSizes.base,
                      paddingVertical: spacing.sm,
                    }
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textQuaternary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={[styles.inputGroup, { marginBottom: spacing.lg }]}>
              <Text style={[
                styles.label, 
                { 
                  color: colors.text,
                  fontSize: typography.fontSizes.base,
                  fontWeight: typography.fontWeights.semiBold,
                  marginBottom: spacing.sm,
                }
              ]}>
                Password
              </Text>
              <View style={[
                styles.inputContainer,
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  borderRadius: radii.md,
                  paddingHorizontal: spacing.md,
                  minHeight: 50,
                }
              ]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={colors.textTertiary}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      color: colors.text,
                      fontSize: typography.fontSizes.base,
                      paddingVertical: spacing.sm,
                    }
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textQuaternary}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{ padding: spacing.sm, marginLeft: spacing.sm }}
                >
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <Button
              title="Login"
              onPress={handleEmailLogin}
              variant="primary"
              size="lg"
              fullWidth
              style={{ marginBottom: spacing.lg }}
            />

            {/* Divider */}
            <View style={[styles.divider, { marginVertical: spacing.lg }]}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[
                styles.dividerText, 
                { 
                  color: colors.textTertiary,
                  paddingHorizontal: spacing.md,
                  fontSize: typography.fontSizes.sm,
                }
              ]}>
                or
              </Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Google Login Button */}
            <Button
              title="Login with Google"
              onPress={handleGoogleLogin}
              variant="outline"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={
                <Ionicons 
                  name="logo-google" 
                  size={20} 
                  color={colors.primary}
                />
              }
              style={{ marginTop: spacing.lg }}
            />
          </View>

          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={[
              styles.footerText, 
              { 
                color: colors.textSecondary,
                fontSize: typography.fontSizes.base,
              }
            ]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[
                styles.signUpLink, 
                { 
                  color: colors.primary,
                  fontSize: typography.fontSizes.base,
                  fontWeight: typography.fontWeights.semiBold,
                }
              ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 