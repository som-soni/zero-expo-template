/**
 * Button Component
 * 
 * A reusable button component with multiple variants, sizes, and full theme integration.
 * Supports loading states, icons, and accessibility features.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { styles } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

/**
 * Button component with comprehensive theming support
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  const { colors, spacing, radii, typography } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.base,
      borderRadius: radii.md,
      gap: spacing.sm,
      ...(fullWidth && { width: '100%' }),
    };

    // Size styles
    switch (size) {
      case 'sm':
        baseStyle.paddingHorizontal = spacing.md;
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.minHeight = 32;
        break;
      case 'lg':
        baseStyle.paddingHorizontal = spacing.xl;
        baseStyle.paddingVertical = spacing.lg;
        baseStyle.minHeight = 48;
        break;
      default: // md
        baseStyle.paddingHorizontal = spacing.lg;
        baseStyle.paddingVertical = spacing.md;
        baseStyle.minHeight = 40;
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.backgroundTertiary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: colors.error,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.text,
      fontWeight: typography.fontWeights.semiBold,
    };

    // Size-based font sizes
    switch (size) {
      case 'sm':
        baseTextStyle.fontSize = typography.fontSizes.sm;
        break;
      case 'lg':
        baseTextStyle.fontSize = typography.fontSizes.lg;
        break;
      default: // md
        baseTextStyle.fontSize = typography.fontSizes.base;
    }

    // Variant-based text colors
    switch (variant) {
      case 'primary':
      case 'destructive':
        return {
          ...baseTextStyle,
          color: colors.surface,
        };
      case 'secondary':
        return {
          ...baseTextStyle,
          color: colors.text,
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  const getLoadingColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'destructive':
        return colors.surface;
      default:
        return colors.primary;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        isDisabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getLoadingColor()}
        />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export default Button; 