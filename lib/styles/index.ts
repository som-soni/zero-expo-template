import { StyleSheet, Platform } from 'react-native';

// Common spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Common border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Typography scale
export const typography = {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  base: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 32, lineHeight: 40 },
} as const;

// Common layout styles
export const commonStyles = StyleSheet.create({
  // Flex utilities
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  
  // Alignment utilities
  alignCenter: { alignItems: 'center' },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },
  
  // Common containers
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  
  // Page container with consistent top padding
  pageContainer: {
    flex: 1,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  
  // Button styles
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Icon button
  iconButton: {
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Card styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  
  // Separator
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  
  // Safe area styles
  safeArea: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 44,
      },
      android: {
        paddingTop: 24,
      },
      web: {
        paddingTop: 0,
      },
    }),
  },
});

// Layout constants
export const layout = {
  sidebar: {
    width: 280,
    collapsedWidth: 70,
  },
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },
  header: {
    height: 60,
    mobileHeight: Platform.select({
      ios: 104,
      android: 84,
      web: 60,
    }),
  },
} as const;

// Sidebar-specific styles
export const sidebarStyles = StyleSheet.create({
  // Common avatar style for user sections
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Standard navigation item
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  
  // Collapsed navigation item
  navItemCollapsed: {
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  
  // Section separator
  sectionSeparator: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  
  // User section container
  userSection: {
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Icon button (for logout, etc.)
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 