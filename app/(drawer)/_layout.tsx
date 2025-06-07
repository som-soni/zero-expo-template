import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Alert } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Context for sidebar state management
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isLargeScreen: boolean;
}>({
  isCollapsed: true,
  setIsCollapsed: () => {},
  isLargeScreen: true,
});

export const useSidebar = () => useContext(SidebarContext);

// Custom drawer content component
function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  // Responsive breakpoints
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768;
  
  // Get collapsed state from context
  const { isCollapsed, setIsCollapsed } = useSidebar();

  // Navigation items grouped by sections
  const mainItems = [
    {
      label: 'Dashboard',
      icon: 'grid-outline',
      route: '/(drawer)/(tabs)',
      focused: pathname.startsWith('/(drawer)/(tabs)') || pathname === '/(drawer)',
    },
  ];

  const settingsItems = [
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
  ];

  const handleSignOut = () => {
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
            // router.replace('/login'); // Uncomment when you have auth
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
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
    headerSubtitle: {
      color: 'white',
      fontSize: 12,
      opacity: 0.8,
      marginTop: 2,
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
    drawerItem: {
      marginVertical: 1,
      marginHorizontal: 8,
      borderRadius: 6,
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
    collapsedDrawerItem: {
      width: 44,
      height: 44,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
      marginHorizontal: 8,
    },
    collapsedFooter: {
      alignItems: 'center',
      paddingBottom: 16,
      paddingHorizontal: 8,
    },
  });

  const renderDrawerItem = (item: any) => {
    if (isCollapsed && isLargeScreen) {
      return (
        <TouchableOpacity
          key={item.route}
          style={[
            styles.collapsedDrawerItem,
            {
              backgroundColor: item.focused 
                ? colors.tint + '20' 
                : 'transparent'
            }
          ]}
          onPress={() => router.push(item.route)}
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
      <View key={item.route} style={styles.drawerItem}>
        <DrawerItem
          label={item.label}
          onPress={() => router.push(item.route)}
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
  };

  if (isCollapsed && isLargeScreen) {
    return (
      <View style={[styles.container, styles.collapsedContainer]}>
        {/* Collapsed Header */}
        <View style={styles.collapsedHeader}>
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={() => setIsCollapsed(false)}
          >
            <Ionicons name="menu-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main Navigation */}
        <View style={styles.collapsedSection}>
          {mainItems.map(renderDrawerItem)}
        </View>

        {/* Settings & Support */}
        <View style={styles.collapsedSection}>
          {settingsItems.map(renderDrawerItem)}
        </View>

        {/* Collapsed Footer */}
        <View style={{ flex: 1 }} />
        <View style={styles.collapsedFooter}>
          <TouchableOpacity onPress={handleSignOut}>
            <View style={styles.avatar}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>JD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Ionicons name="apps" size={20} color="white" />
            <Text style={styles.headerTitle}>My Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, John!</Text>
          </View>
          {isLargeScreen && (
            <TouchableOpacity
              style={styles.collapseButton}
              onPress={() => setIsCollapsed(true)}
            >
              <Ionicons name="chevron-back-outline" size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Main Navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main</Text>
          {mainItems.map(renderDrawerItem)}
        </View>

        {/* Settings & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings & Support</Text>
          {settingsItems.map(renderDrawerItem)}
        </View>
      </DrawerContentScrollView>

      {/* Footer with user info */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.userInfo} onPress={handleSignOut}>
          <View style={styles.avatar}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>JD</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john@example.com</Text>
          </View>
          <Ionicons name="log-out-outline" size={16} color={colors.tabIconDefault} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Responsive breakpoints
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768;
  
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

  // Dynamic drawer configuration
  const drawerType = isLargeScreen ? 'permanent' : 'front';
  
  const getDrawerWidth = () => {
    if (isLargeScreen) {
      return isCollapsed ? 60 : 240;
    }
    return isMediumScreen ? 280 : '80%';
  };
  
  const swipeEnabled = !isLargeScreen;

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isLargeScreen }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: drawerType,
          drawerPosition: 'left',
          drawerStyle: {
            backgroundColor: colors.background,
            width: getDrawerWidth(),
            borderRightWidth: 1,
            borderRightColor: colors.tabIconDefault + '15',
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
          // Critical fix: Hide header AND hamburger menu on large screens
          headerShown: !isLargeScreen,
          headerLeft: isLargeScreen ? () => null : undefined, // Hide hamburger on large screens
          drawerActiveTintColor: colors.tint,
          drawerInactiveTintColor: colors.tabIconDefault,
          drawerActiveBackgroundColor: colors.tint + '12',
          swipeEnabled: swipeEnabled,
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
            // Override global settings for this specific screen if needed
            headerShown: !isLargeScreen,
            headerLeft: isLargeScreen ? () => null : undefined,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
            headerShown: !isLargeScreen,
            headerLeft: isLargeScreen ? () => null : undefined,
          }}
        />
        <Drawer.Screen
          name="help"
          options={{
            title: 'Help & Support',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
            headerShown: !isLargeScreen,
            headerLeft: isLargeScreen ? () => null : undefined,
          }}
        />
      </Drawer>
    </SidebarContext.Provider>
  );
} 