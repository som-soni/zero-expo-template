/**
 * Card Component
 * 
 * A reusable card component with theming support, multiple variants,
 * and consistent styling across the application.
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { styles } from './styles';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: CardVariant;
  padding?: keyof ReturnType<typeof useTheme>['spacing'];
}

/**
 * Card component with comprehensive theming support
 */
export function Card({ 
  children, 
  style, 
  variant = 'default',
  padding = 'lg',
}: CardProps) {
  const { colors, spacing, radii, shadows } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.base,
      borderRadius: radii.lg,
      padding: spacing[padding],
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          ...shadows.md,
        };
      default: // default
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          ...shadows.sm,
        };
    }
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
}

export default Card; 