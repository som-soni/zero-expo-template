import React from 'react';
import { View, ViewStyle } from 'react-native';
import { chatStyles } from '@/lib/styles';

interface CenteredLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  // Allow custom margin percentages for easy modification
  horizontalMarginPercent?: number;
}

/**
 * Reusable centered layout component with configurable horizontal margins.
 * Default: 25% total margin (12.5% each side) = 75% content width
 */
export function CenteredLayout({ 
  children, 
  style, 
  horizontalMarginPercent = 25 
}: CenteredLayoutProps) {
  const sideMargin = horizontalMarginPercent / 2;
  
  const dynamicStyle: ViewStyle = {
    paddingHorizontal: `${sideMargin}%`,
  };

  return (
    <View style={[chatStyles.centeredContainer, dynamicStyle, style]}>
      {children}
    </View>
  );
} 