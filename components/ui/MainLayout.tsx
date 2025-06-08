import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { layout } from '@/lib/styles';
import { Sidebar } from './Sidebar';
import { AuthButton } from './AuthButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

const BREAKPOINT_LARGE = 768;

export function MainLayout({ children }: MainLayoutProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isLargeScreen = width >= BREAKPOINT_LARGE;
  const isDesktop = Platform.OS === 'web' && isLargeScreen;

  // Auto-open sidebar on desktop and manage collapse state
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
      // Don't auto-collapse on desktop - let user control it
    } else {
      setIsSidebarOpen(false);
      setIsSidebarCollapsed(false); // Always expanded on mobile when open
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Calculate content margin based on sidebar state
  const contentMarginLeft = isDesktop && isSidebarOpen ? 
    (isSidebarCollapsed ? layout.sidebar.collapsedWidth : layout.sidebar.width) : 0;

  return (
    <View style={styles.container}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Main Content */}
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            marginLeft: contentMarginLeft,
          },
        ]}
      >
        {/* Header with Menu Button and Auth */}
        {(!isDesktop ) && (
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={toggleSidebar}
            >
              <Ionicons name="menu" size={24} color={colors.text} />
            </TouchableOpacity>
            
            {/* Auth Button for Mobile */}
            <AuthButton style={styles.authButton} />
          </View>
        )}

        {/* Desktop Header with Auth */}
        {isDesktop && (
          <View style={[styles.desktopHeader, { borderBottomColor: colors.border }]}>
            <View style={styles.spacer} />
            <AuthButton style={styles.authButton} />
          </View>
        )}
        
        {/* Page Content */}
        <View style={styles.pageContent}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        paddingTop: 44, // Account for status bar
        height: 104,
      },
      android: {
        paddingTop: 24, // Account for status bar
        height: 84,
      },
      web: {
        height: 60,
        paddingTop: 0,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  menuButton: {
    padding: 8,
  },
  pageContent: {
    flex: 1,
    width: '100%',
    minHeight: 0, // Allow content to shrink
  },
  desktopHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  spacer: {
    flex: 1,
  },
  authButton: {
    marginLeft: 'auto',
  },
}); 