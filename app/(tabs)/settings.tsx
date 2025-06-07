import React, { useState } from 'react';
import { StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/ui/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/lib/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SettingItemProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, rightElement }: SettingItemProps) => (
    <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.background, borderBottomColor: colors.border }]} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colors.gray500} style={styles.settingIcon} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && <Ionicons name="chevron-forward" size={20} color={colors.gray500} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your app preferences</Text>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={[styles.sectionContent, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            showArrow={false}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            }
          />
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive notifications on this device"
            showArrow={false}
            rightElement={
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
              />
            }
          />
          <SettingItem
            icon="sync-outline"
            title="Auto Sync"
            subtitle="Automatically sync data"
            showArrow={false}
            rightElement={
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
              />
            }
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={[styles.sectionContent, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => {}}
          />
          <SettingItem
            icon="document-text-outline"
            title="About"
            subtitle="App version and legal information"
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
    opacity: 0.8,
  },
  sectionContent: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 