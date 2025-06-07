import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Alert } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Types for better type safety
interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  focused: boolean;
}

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isLargeScreen: boolean;
}

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
  descriptors: any;
}

// Constants for breakpoints
const BREAKPOINTS = {
  LARGE: 1024,
  MEDIUM: 768,
} as const;

// Context for sidebar state management
const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: true,
  setIsCollapsed: () => {},
  isLargeScreen: true,
});

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarContext.Provider');
  }
  return context;
};

// Custom hook for responsive breakpoints
const useResponsive = () => {
  const { width } = useWindowDimensions();
  
  return useMemo(() => ({
    isLargeScreen: width >= BREAKPOINTS.LARGE,
    isMediumScreen: width >= BREAKPOINTS.MEDIUM,
    isSmallScreen: width < BREAKPOINTS.MEDIUM,
  }), [width]);
};

// Custom hook for navigation items
const useNavigationItems = (pathname: string): { mainItems: NavigationItem[]; settingsItems: NavigationItem[] } => {
  return useMemo(() => ({
    mainItems: [
      {
        label: 'Dashboard',
        icon: 'grid-outline',
        route: '/(drawer)/(tabs)',
        focused: pathname.startsWith('/(drawer)/(tabs)') || pathname === '/(drawer)',
      },
    ],
    settingsItems: [
      {
        label: 'Settings',
        icon: 'settings-outline',
        route: '/(drawer)/settings',
        focused: pathname === '/(drawer)/settings',
      },
      {
        label: 'Help & Support',
        icon: 'help-circle-outline',
        route: '/(drawer)/help',
        focused: pathname === '/(drawer)/help',
      },
    ],
  }), [pathname]);
};

// Memoized drawer item component for better performance
const DrawerItemMemo = React.memo<{
  item: NavigationItem;
  isCollapsed: boolean;
  isLargeScreen: boolean;
  colors: any;
  onPress: (route: string) => void;
}>(({ item, isCollapsed, isLargeScreen, colors, onPress }) => {
  const handlePress = useCallback(() => onPress(item.route), [item.route, onPress]);

  if (isCollapsed && isLargeScreen) {
    return (
      <TouchableOpacity
        style={[
          styles.collapsedDrawerItem,
          {
            backgroundColor: item.focused 
              ? colors.tint + '20' 
              : 'transparent'
          }
        ]}
        {...(Platform.OS === 'web' && { 
          className: 'collapsed-drawer-item-hover',
          accessibilityRole: 'button',
          accessibilityLabel: item.label
        })}
        onPress={handlePress}
        accessible={true}
        accessibilityLabel={item.label}
      >
        <Ionicons
          name={item.icon as any}
          size={20}
          color={item.focused ? colors.tint : colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.drawerItem} {...(Platform.OS === 'web' && { className: 'drawer-item-hover' })}>
      <DrawerItem
        label={item.label}
        onPress={handlePress}
        focused={item.focused}
        icon={({ color, size, focused }) => (
          <Ionicons
            name={item.icon as any}
            size={18}
            color={focused ? colors.tint : color}
          />
        )}
        activeTintColor={colors.tint}
        inactiveTintColor={colors.tabIconDefault}
        activeBackgroundColor={colors.tint + '12'}
        style={{ borderRadius: 6 }}
      />
    </View>
  );
});

DrawerItemMemo.displayName = 'DrawerItemMemo';

// Custom drawer content component
function CustomDrawerContent(props: CustomDrawerContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { isLargeScreen, isMediumScreen } = useResponsive();
  
  // Get collapsed state from context
  const { isCollapsed, setIsCollapsed } = useSidebar();
  
  // Get navigation items
  const { mainItems, settingsItems } = useNavigationItems(pathname);

  // Memoized navigation handler
  const handleNavigation = useCallback((route: string) => {
    router.push(route);
  }, [router]);

  // Memoized sign out handler
  const handleSignOut = useCallback(() => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            console.log('User signed out');
            // Add your sign out logic here
            // router.replace('/login');
          },
        },
      ]
    );
  }, []);

  // Memoized collapse handlers
  const handleCollapse = useCallback(() => setIsCollapsed(true), [setIsCollapsed]);
  const handleExpand = useCallback(() => setIsCollapsed(false), [setIsCollapsed]);

  // Add web-specific hover styles - moved to useEffect for better organization
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const styleId = 'drawer-hover-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .drawer-item-hover:hover {
        background-color: rgba(128, 128, 128, 0.1) !important;
        transition: background-color 0.2s ease;
      }
      .collapsed-drawer-item-hover:hover {
        background-color: rgba(128, 128, 128, 0.1) !important;
        transition: background-color 0.2s ease;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Memoized styles for better performance
  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.tint,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerContent: {
      flex: 1,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 4,
    },
    collapseButton: {
      padding: 8,
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    section: {
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.tabIconDefault,
      paddingHorizontal: 16,
      paddingVertical: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.tabIconDefault + '20',
      paddingTop: 12,
      paddingHorizontal: 12,
      paddingBottom: 16,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.tabIconDefault + '08',
      padding: 10,
      borderRadius: 8,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.tint,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isCollapsed ? 0 : 10,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    userEmail: {
      fontSize: 10,
      color: colors.tabIconDefault,
      marginTop: 1,
    },
    // Collapsed specific styles
    collapsedContainer: {
      width: 60,
      backgroundColor: colors.background,
    },
    collapsedHeader: {
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    collapsedSection: {
      marginTop: 12,
      alignItems: 'center',
    },
    collapsedFooter: {
      alignItems: 'center',
      paddingBottom: 16,
      paddingHorizontal: 8,
    },
  }), [colors, isCollapsed]);

  // Collapsed view
  if (isCollapsed && isLargeScreen) {
    return (
      <View style={[dynamicStyles.container, dynamicStyles.collapsedContainer]}>
        {/* Collapsed Header */}
        <View style={dynamicStyles.collapsedHeader}>
          <TouchableOpacity
            style={dynamicStyles.collapseButton}
            onPress={handleExpand}
            accessible={true}
            accessibilityLabel="Expand sidebar"
            accessibilityRole="button"
          >
            <Ionicons name="menu-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main Navigation */}
        <View style={dynamicStyles.collapsedSection}>
          {mainItems.map(item => (
            <DrawerItemMemo
              key={item.route}
              item={item}
              isCollapsed={isCollapsed}
              isLargeScreen={isLargeScreen}
              colors={colors}
              onPress={handleNavigation}
            />
          ))}
        </View>

        {/* Settings & Support */}
        <View style={dynamicStyles.collapsedSection}>
          {settingsItems.map(item => (
            <DrawerItemMemo
              key={item.route}
              item={item}
              isCollapsed={isCollapsed}
              isLargeScreen={isLargeScreen}
              colors={colors}
              onPress={handleNavigation}
            />
          ))}
        </View>

        {/* Collapsed Footer */}
        <View style={{ flex: 1 }} />
        <View style={dynamicStyles.collapsedFooter}>
          <TouchableOpacity 
            onPress={handleSignOut}
            accessible={true}
            accessibilityLabel="User menu - John Doe"
            accessibilityRole="button"
          >
            <View style={dynamicStyles.avatar}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>JD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Expanded view
  return (
    <View style={dynamicStyles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.headerContent}>
            <Ionicons name="apps" size={20} color="white" />
            <Text style={dynamicStyles.headerTitle}>MyWebsite</Text>
          </View>
          {isLargeScreen && (
            <TouchableOpacity
              style={dynamicStyles.collapseButton}
              onPress={handleCollapse}
              accessible={true}
              accessibilityLabel="Collapse sidebar"
              accessibilityRole="button"
            >
              <Ionicons name="chevron-back-outline" size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Main Navigation */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Main</Text>
          {mainItems.map(item => (
            <DrawerItemMemo
              key={item.route}
              item={item}
              isCollapsed={isCollapsed}
              isLargeScreen={isLargeScreen}
              colors={colors}
              onPress={handleNavigation}
            />
          ))}
        </View>

        {/* Settings & Support */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Settings & Support</Text>
          {settingsItems.map(item => (
            <DrawerItemMemo
              key={item.route}
              item={item}
              isCollapsed={isCollapsed}
              isLargeScreen={isLargeScreen}
              colors={colors}
              onPress={handleNavigation}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer with user info */}
      <View style={dynamicStyles.footer}>
        <TouchableOpacity 
          style={dynamicStyles.userInfo} 
          onPress={handleSignOut}
          accessible={true}
          accessibilityLabel="Sign out - John Doe"
          accessibilityRole="button"
        >
          <View style={dynamicStyles.avatar}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>JD</Text>
          </View>
          <View style={dynamicStyles.userDetails}>
            <Text style={dynamicStyles.userName}>John Doe</Text>
            <Text style={dynamicStyles.userEmail}>john@example.com</Text>
          </View>
          <Ionicons name="log-out-outline" size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Static styles that don't depend on theme or state
const styles = StyleSheet.create({
  drawerItem: {
    marginVertical: 1,
    marginHorizontal: 8,
    borderRadius: 6,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    }),
  },
  collapsedDrawerItem: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    }),
  },
});

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { isLargeScreen, isMediumScreen } = useResponsive();
  
  // Sidebar state management - start collapsed on desktop, expanded on mobile
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  // Update collapsed state when screen size changes
  useEffect(() => {
    if (!isLargeScreen) {
      setIsCollapsed(false); // Always expanded on mobile/tablet
    } else {
      setIsCollapsed(true); // Collapsed by default on desktop
    }
  }, [isLargeScreen]);

  // Memoized drawer configuration
  const drawerConfig = useMemo(() => {
    const drawerType = isLargeScreen ? 'permanent' : 'front';
    
    const getDrawerWidth = () => {
      if (isLargeScreen) {
        return isCollapsed ? 60 : 240;
      }
      return isMediumScreen ? 280 : '80%';
    };
    
    return {
      drawerType,
      drawerWidth: getDrawerWidth(),
      swipeEnabled: !isLargeScreen,
    };
  }, [isLargeScreen, isMediumScreen, isCollapsed]);

  // Memoized context value
  const contextValue = useMemo(() => ({
    isCollapsed,
    setIsCollapsed,
    isLargeScreen,
  }), [isCollapsed, setIsCollapsed, isLargeScreen]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: drawerConfig.drawerType,
          drawerPosition: 'left',
          drawerStyle: {
            backgroundColor: colors.background,
            width: drawerConfig.drawerWidth,
          },
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.tabIconDefault,
            shadowOpacity: 0.1,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShown: true,
          drawerActiveTintColor: colors.tint,
          drawerInactiveTintColor: colors.tabIconDefault,
          drawerActiveBackgroundColor: colors.tint + '12',
          swipeEnabled: drawerConfig.swipeEnabled,
          drawerHideStatusBarOnOpen: Platform.OS === 'ios',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Dashboard',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="help"
          options={{
            title: 'Help & Support',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </SidebarContext.Provider>
  );
}