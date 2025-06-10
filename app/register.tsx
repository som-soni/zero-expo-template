import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { spacing, borderRadius } from '@/lib/styles';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, signInWithGoogle, isLoading } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      router.replace('/' as any);
    }
  }, [user]);

  const handleRegister = () => {
    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Placeholder for email/password registration
    Alert.alert(
      'Coming Soon',
      'Email/password registration is not implemented yet. Please use Google login for now.'
    );
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      // Navigation will be handled by auth state change
    } catch (error) {
      console.error('Google signup error:', error);
      Alert.alert('Registration Error', 'Failed to sign up with Google. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    router.push('/login' as any);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: colors.gray500 }]}>
              Sign up to get started
            </Text>
          </View>

          {/* Registration Form */}
          <View style={styles.form}>
            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={[styles.inputGroup, styles.nameField]}>
                <Text style={[styles.label, { color: colors.text }]}>
                  First Name
                </Text>
                <View style={[
                  styles.inputContainer,
                  { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  }
                ]}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={colors.gray500}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First name"
                    placeholderTextColor={colors.gray400}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.nameField]}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Last Name
                </Text>
                <View style={[
                  styles.inputContainer,
                  { 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  }
                ]}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={colors.gray500}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"
                    placeholderTextColor={colors.gray400}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Email
              </Text>
              <View style={[
                styles.inputContainer,
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }
              ]}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={colors.gray500}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.gray400}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Password
              </Text>
              <View style={[
                styles.inputContainer,
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }
              ]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={colors.gray500}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor={colors.gray400}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Button
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  variant="ghost"
                  size="sm"
                  icon={
                    <Ionicons 
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={colors.gray500}
                    />
                  }
                  title=""
                  style={styles.passwordToggle}
                />
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Confirm Password
              </Text>
              <View style={[
                styles.inputContainer,
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }
              ]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={colors.gray500}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.gray400}
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Button
                  onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  variant="ghost"
                  size="sm"
                  icon={
                    <Ionicons 
                      name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={colors.gray500}
                    />
                  }
                  title=""
                  style={styles.passwordToggle}
                />
              </View>
            </View>

            {/* Register Button */}
            <Button
              title="Create Account"
              onPress={handleRegister}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.registerButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.gray500 }]}>
                or
              </Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Google Sign Up Button */}
            <Button
              title="Sign up with Google"
              onPress={handleGoogleSignUp}
              variant="outline"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={
                <Ionicons 
                  name="logo-google" 
                  size={20} 
                  color={colors.tint}
                />
              }
              style={styles.googleButton}
            />
          </View>

          {/* Back to Login Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.gray500 }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={[styles.loginLink, { color: colors.tint }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  nameField: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.sm,
  },
  passwordToggle: {
    padding: 0,
    marginLeft: spacing.sm,
  },
  registerButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
    fontSize: 14,
  },
  googleButton: {
    marginTop: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 