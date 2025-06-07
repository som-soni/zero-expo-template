import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { commonStyles, sidebarStyles, spacing, layout } from '@/lib/styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavigationItem {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  route: string;
  focused: boolean;
}

const BREAKPOINT_LARGE = 768;

export function Sidebar({ isOpen, onClose, isCollapsed: externalIsCollapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const isLargeScreen = width >= BREAKPOINT_LARGE;
  const isDesktop = Platform.OS === 'web' && isLargeScreen;
  
  // Use external collapse state if provided, otherwise use internal state
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;

  // Navigation items based on current tab structure
  const navigationItems: NavigationItem[] = [
    {
      label: 'New Chat',
      icon: 'chatbubble-outline',
      route: '/chat',
      focused: pathname === '/chat',
    },
    {
      label: 'Dashboard',
      icon: 'home-outline',
      route: '/dashboard',
      focused: pathname === '/dashboard' || pathname === '/',
    },
    {
      label: 'Analytics',
      icon: 'bar-chart-outline',
      route: '/analytics',
      focused: pathname === '/analytics',
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      route: '/settings',
      focused: pathname === '/settings',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
    if (!isDesktop) {
      onClose();
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            // Add your logout logic here
          },
        },
      ]
    );
  };

  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalIsCollapsed(!internalIsCollapsed);
    }
  };

  // Auto-collapse on desktop if screen becomes smaller
  useEffect(() => {
    if (!isLargeScreen) {
      if (onToggleCollapse && externalIsCollapsed) {
        onToggleCollapse();
      } else {
        setInternalIsCollapsed(false);
      }
    }
  }, [isLargeScreen, onToggleCollapse, externalIsCollapsed]);

  const sidebarWidth = isCollapsed ? layout.sidebar.collapsedWidth : layout.sidebar.width;

  if (!isOpen && !isDesktop) {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {!isDesktop && isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      
      {/* Sidebar */}
      <View
        style={[
          styles.sidebar,
          {
            width: sidebarWidth,
            backgroundColor: colors.background,
            borderRightColor: colors.border,
          },
          !isDesktop && !isOpen && styles.hiddenSidebar,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={toggleCollapse}
          >
            <Ionicons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
          {!isCollapsed && (
            <Text style={[styles.appTitle, { color: colors.text }]}>
              My App
            </Text>
          )}
        </View>

        {/* Navigation */}
        <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={[
                sidebarStyles.navItem,
                item.focused && {
                  backgroundColor: colors.tint + '15',
                },
                isCollapsed && sidebarStyles.navItemCollapsed,
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <Ionicons
                name={item.focused ? item.icon.replace('-outline', '') as any : item.icon}
                size={22}
                color={item.focused ? colors.tint : colors.gray500}
              />
              {!isCollapsed && (
                <Text
                  style={[
                    styles.navLabel,
                    { color: item.focused ? colors.tint : colors.text },
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* User Info with Logout - Responsive layout */}
        {isCollapsed ? (
          <View style={styles.collapsedUserSection}>
            <TouchableOpacity
              style={[sidebarStyles.avatar, { backgroundColor: colors.tint }]}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={sidebarStyles.userSection}>
            <View style={[sidebarStyles.avatar, { backgroundColor: colors.tint }]}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                John Doe
              </Text>
              <Text style={[styles.userEmail, { color: colors.gray500 }]}>
                john@example.com
              </Text>
            </View>
            <TouchableOpacity
              style={sidebarStyles.iconButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color={colors.gray500}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebar: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
    borderRightWidth: 1,
    flexDirection: 'column',
  },
  hiddenSidebar: {
    transform: [{ translateX: -280 }],
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  collapseButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapsedUserSection: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 12,
    marginTop: 2,
  },
  navigation: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },

  navLabel: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },

}); 