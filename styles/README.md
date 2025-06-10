# 🎨 Styling System Documentation

This document outlines the comprehensive styling system and conventions used throughout the application.

## 📁 Folder Structure

```
/components
  /Button
    index.tsx         # Component implementation
    styles.ts         # Component-specific styles
  /Card
    index.tsx
    styles.ts
/screens
  LoginScreen.tsx     # Screen component
  LoginScreen.styles.ts
/styles
  theme.ts            # Main theme configuration
  README.md           # This file
/providers
  ThemeProvider.tsx   # Theme context provider
```

## 🧩 Theme System

### Core Principles

1. **Type Safety**: All theme tokens are typed with TypeScript and `as const`
2. **Consistency**: Unified design tokens across the entire application
3. **Flexibility**: Support for light/dark modes with automatic switching
4. **Performance**: Use `StyleSheet.create()` for optimal performance

### Theme Structure

```typescript
import { useTheme } from '@/providers/ThemeProvider';

const { colors, spacing, radii, typography, shadows } = useTheme();
```

### Available Theme Tokens

#### Colors
```typescript
// Semantic colors (automatically switch with theme)
colors.primary          // Primary brand color
colors.background       // Main background
colors.surface          // Card/surface background
colors.text             // Primary text
colors.textSecondary    // Secondary text
colors.border           // Border color
colors.success          // Success state
colors.error            // Error state
colors.warning          // Warning state
```

#### Spacing
```typescript
// Numeric scale (pixels)
spacing[4]              // 16px
spacing[8]              // 32px

// Semantic scale
spacing.xs              // 4px
spacing.sm              // 8px
spacing.md              // 12px
spacing.lg              // 16px
spacing.xl              // 20px
spacing['2xl']          // 24px
spacing['3xl']          // 32px
```

#### Typography
```typescript
typography.fontSizes.xs     // 12px
typography.fontSizes.sm     // 14px
typography.fontSizes.base   // 16px
typography.fontSizes.lg     // 18px
typography.fontSizes.xl     // 20px
typography.fontSizes['2xl'] // 24px
typography.fontSizes['3xl'] // 30px

typography.fontWeights.normal    // '400'
typography.fontWeights.medium    // '500'
typography.fontWeights.semiBold  // '600'
typography.fontWeights.bold      // '700'
```

#### Border Radius
```typescript
radii.sm                // 2px
radii.base              // 4px
radii.md                // 6px
radii.lg                // 8px
radii.xl                // 12px
radii.full              // 9999px (circle)
```

#### Shadows
```typescript
shadows.sm              // Small shadow
shadows.md              // Medium shadow
shadows.lg              // Large shadow
shadows.xl              // Extra large shadow
```

## 🧠 Component Structure

### Component Folder Organization

Each component should follow this structure:

```
/ComponentName
  index.tsx           # Main component file
  styles.ts           # StyleSheet.create() styles
  ComponentName.test.tsx  # Tests (optional)
```

### Component Template

```typescript
// components/MyComponent/index.tsx
import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { styles } from './styles';

export interface MyComponentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'outlined';
}

export function MyComponent({ 
  children, 
  style, 
  variant = 'default' 
}: MyComponentProps) {
  const { colors, spacing, radii } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    return {
      ...styles.container,
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.lg,
      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: colors.border,
      }),
    };
  };

  return (
    <View style={[getContainerStyle(), style]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {children}
      </Text>
    </View>
  );
}

export default MyComponent;
```

```typescript
// components/MyComponent/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Non-theme dependent styles only
  },
  text: {
    // Base text styles
  },
});
```

## 🎨 Styling Conventions

### Do's ✅

1. **Use theme tokens**: Always prefer `colors.primary` over `#3D5AFE`
2. **Use StyleSheet.create()**: For better performance
3. **Separate concerns**: Theme-dependent styles in component, static styles in `.styles.ts`
4. **Type your props**: Use proper TypeScript interfaces
5. **Support style prop**: Allow style customization with `StyleProp<ViewStyle>`

```typescript
// ✅ Good
const containerStyle = {
  backgroundColor: colors.surface,
  padding: spacing.lg,
  borderRadius: radii.md,
};

// ✅ Good
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
```

### Don'ts ❌

1. **Hardcode colors**: Don't use hex values directly
2. **Inline complex styles**: Use StyleSheet.create() instead
3. **Ignore theme context**: Always use theme values
4. **Mix concerns**: Don't put theme-dependent styles in `.styles.ts`

```typescript
// ❌ Bad
const badStyle = {
  backgroundColor: '#ffffff',  // Use colors.surface instead
  padding: 16,                 // Use spacing.lg instead
  borderRadius: 8,             // Use radii.md instead
};

// ❌ Bad - inline styles
<View style={{
  flex: 1,
  backgroundColor: '#fff',
  padding: 16,
  marginTop: 20,
}}>
```

## 🌙 Dark Mode Support

The theme system automatically handles light/dark mode switching:

```typescript
// Automatically switches based on system preference
const { colors, isDark } = useTheme();

// Force a specific theme
<ThemeProvider forcedTheme="dark">
  <App />
</ThemeProvider>
```

## 📱 Responsive Design

Use breakpoints for responsive behavior:

```typescript
const { layout } = useTheme();
const isDesktop = width >= layout.breakpoints.desktop;

const responsiveStyle = {
  padding: isDesktop ? spacing['3xl'] : spacing.lg,
  maxWidth: isDesktop ? layout.maxWidth.md : '100%',
};
```

## 🔧 Migration Guide

### Migrating Existing Components

1. **Wrap with ThemeProvider**: Ensure your app is wrapped with `ThemeProvider`
2. **Replace hardcoded values**: Use theme tokens instead
3. **Extract styles**: Move to separate `.styles.ts` files
4. **Update imports**: Import from new component structure

```typescript
// Before
import { Button } from '@/components/ui/Button';

// After
import { Button } from '@/components/Button';
```

### Common Migrations

```typescript
// Before
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

// After
const { colors, spacing, radii, shadows } = useTheme();
const containerStyle = {
  backgroundColor: colors.surface,
  padding: spacing.lg,
  borderRadius: radii.md,
  ...shadows.sm,
};
```

## 🧪 Testing

Test components with different themes:

```typescript
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/providers/ThemeProvider';
import MyComponent from './MyComponent';

const renderWithTheme = (theme = 'light') => {
  return render(
    <ThemeProvider forcedTheme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
};

test('renders correctly in light theme', () => {
  const { getByText } = renderWithTheme('light');
  // Test assertions
});

test('renders correctly in dark theme', () => {
  const { getByText } = renderWithTheme('dark');
  // Test assertions
});
```

## 🚀 Performance Tips

1. **Use StyleSheet.create()**: Better performance than inline styles
2. **Memoize complex calculations**: Use useMemo for expensive style calculations
3. **Avoid deep nesting**: Keep style objects shallow
4. **Cache theme values**: Extract frequently used values

```typescript
// Good performance
const { colors, spacing } = useTheme();
const memoizedStyles = useMemo(() => ({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
}), [colors.surface, spacing.lg]);
```

## 📚 Examples

Check out these example components for reference:
- `components/Button/` - Complex themed component
- `components/Card/` - Simple themed component  
- `screens/LoginScreen.tsx` - Screen-level styling
- `app/login.tsx` - Page-level styling

## 🤝 Contributing

When adding new components or styles:

1. Follow the folder structure conventions
2. Use TypeScript interfaces for props
3. Extract reusable styles to theme tokens
4. Add proper documentation
5. Include tests for different theme modes
6. Update this README if adding new patterns

---

For questions or suggestions, please create an issue or reach out to the development team. 