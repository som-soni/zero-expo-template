/**
 * Design System Theme
 * 
 * Comprehensive design tokens for colors, spacing, typography, and other design properties.
 * Uses TypeScript with `as const` for type safety and IntelliSense support.
 */

// Color palette
const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Special colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Spacing scale (in pixels)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
  
  // Semantic spacing
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// Border radius values
export const radii = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

// Typography scale
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
    
    // Specific line heights
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  
  fontWeights: {
    thin: '100',
    extraLight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
  
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
} as const;

// Shadow presets
export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 16,
  },
} as const;

// Light theme colors
const lightTheme = {
  // Brand colors
  primary: colors.primary[600],
  primaryLight: colors.primary[500],
  primaryDark: colors.primary[700],
  
  // Background colors
  background: colors.white,
  backgroundSecondary: colors.gray[50],
  backgroundTertiary: colors.gray[100],
  
  // Surface colors
  surface: colors.white,
  surfaceSecondary: colors.gray[50],
  
  // Text colors
  text: colors.gray[900],
  textSecondary: colors.gray[600],
  textTertiary: colors.gray[500],
  textQuaternary: colors.gray[400],
  
  // Border colors
  border: colors.gray[200],
  borderSecondary: colors.gray[300],
  
  // State colors
  success: colors.success[600],
  error: colors.error[600],
  warning: colors.warning[600],
  info: colors.info[600],
  
  // Interactive colors
  interactive: colors.primary[600],
  interactiveHover: colors.primary[700],
  interactivePressed: colors.primary[800],
  interactiveDisabled: colors.gray[300],
  
  // Legacy compatibility
  tint: colors.primary[600],
  tabIconDefault: colors.gray[400],
  tabIconSelected: colors.primary[600],
} as const;

// Dark theme colors
const darkTheme = {
  // Brand colors
  primary: colors.primary[400],
  primaryLight: colors.primary[300],
  primaryDark: colors.primary[500],
  
  // Background colors
  background: colors.gray[900],
  backgroundSecondary: colors.gray[800],
  backgroundTertiary: colors.gray[700],
  
  // Surface colors
  surface: colors.gray[800],
  surfaceSecondary: colors.gray[700],
  
  // Text colors
  text: colors.white,
  textSecondary: colors.gray[300],
  textTertiary: colors.gray[400],
  textQuaternary: colors.gray[500],
  
  // Border colors
  border: colors.gray[700],
  borderSecondary: colors.gray[600],
  
  // State colors
  success: colors.success[400],
  error: colors.error[400],
  warning: colors.warning[400],
  info: colors.info[400],
  
  // Interactive colors
  interactive: colors.primary[400],
  interactiveHover: colors.primary[300],
  interactivePressed: colors.primary[200],
  interactiveDisabled: colors.gray[600],
  
  // Legacy compatibility
  tint: colors.primary[400],
  tabIconDefault: colors.gray[500],
  tabIconSelected: colors.primary[400],
} as const;

// Layout constants
export const layout = {
  sidebar: {
    width: 280,
    collapsedWidth: 70,
  },
  header: {
    height: 60,
    mobileHeight: {
      ios: 104,
      android: 84,
      web: 60,
    },
  },
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1280,
  },
  maxWidth: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component variants
export const variants = {
  button: {
    sizes: ['sm', 'md', 'lg'] as const,
    variants: ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const,
  },
  card: {
    variants: ['default', 'outlined', 'elevated'] as const,
  },
  text: {
    sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as const,
    weights: ['normal', 'medium', 'semiBold', 'bold'] as const,
  },
} as const;

// Main theme object
export const theme = {
  colors: {
    light: lightTheme,
    dark: darkTheme,
    raw: colors,
  },
  spacing,
  radii,
  typography,
  shadows,
  layout,
  zIndex,
  variants,
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColors = typeof lightTheme | typeof darkTheme;
export type ColorScheme = 'light' | 'dark';
export type Spacing = keyof typeof spacing;
export type Radii = keyof typeof radii;
export type FontSizes = keyof typeof typography.fontSizes;
export type FontWeights = keyof typeof typography.fontWeights;
export type Shadows = keyof typeof shadows;

export default theme; 