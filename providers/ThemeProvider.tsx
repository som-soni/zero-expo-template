/**
 * ThemeProvider
 * 
 * Provides theme context with light/dark mode support using React Context.
 * Integrates with useColorScheme for automatic theme detection.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import theme, { type Theme, type ThemeColors, type ColorScheme } from '@/styles/theme';

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  colorScheme: ColorScheme;
  isDark: boolean;
  spacing: Theme['spacing'];
  radii: Theme['radii'];
  typography: Theme['typography'];
  shadows: Theme['shadows'];
  layout: Theme['layout'];
  zIndex: Theme['zIndex'];
  variants: Theme['variants'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  forcedTheme?: ColorScheme;
}

/**
 * ThemeProvider component that provides theme context to the entire app
 * 
 * @param children - React children components
 * @param forcedTheme - Optional forced theme (overrides system theme)
 */
export function ThemeProvider({ children, forcedTheme }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const colorScheme: ColorScheme = forcedTheme || systemColorScheme || 'light';
  const isDark = colorScheme === 'dark';
  
  const colors = theme.colors[colorScheme];

  const contextValue: ThemeContextType = {
    theme,
    colors,
    colorScheme,
    isDark,
    spacing: theme.spacing,
    radii: theme.radii,
    typography: theme.typography,
    shadows: theme.shadows,
    layout: theme.layout,
    zIndex: theme.zIndex,
    variants: theme.variants,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * @returns Theme context with all theme properties
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * Hook to access only theme colors (most common use case)
 * 
 * @returns Current theme colors object
 */
export function useThemeColors(): ThemeColors {
  const { colors } = useTheme();
  return colors;
}

/**
 * Hook to check if the current theme is dark
 * 
 * @returns Boolean indicating if dark theme is active
 */
export function useIsDark(): boolean {
  const { isDark } = useTheme();
  return isDark;
}

/**
 * Hook to get spacing values from theme
 * 
 * @returns Spacing scale object
 */
export function useSpacing(): Theme['spacing'] {
  const { spacing } = useTheme();
  return spacing;
}

/**
 * Hook to get typography values from theme
 * 
 * @returns Typography scale object
 */
export function useTypography(): Theme['typography'] {
  const { typography } = useTheme();
  return typography;
}

// Export the theme for direct usage if needed
export { theme };
export default ThemeProvider; 