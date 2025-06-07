const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    // Additional colors for UI components
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    surface: '#f8f9fa',
    border: '#f0f0f0',
    success: '#10b981',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // Additional colors for UI components (dark mode variants)
    gray400: '#6b7280',
    gray500: '#9ca3af',
    gray50: '#1f2937',
    gray100: '#374151',
    gray200: '#4b5563',
    surface: '#1f2937',
    border: '#374151',
    success: '#10b981',
  },
};
