import React, { useState } from 'react';
import { StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, rightElement }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#6b7280" style={styles.settingIcon} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && <Ionicons name="chevron-forward" size={20} color="#6b7280" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your app preferences</Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="person-outline"
            title="Profile"
            subtitle="Manage your personal information"
            onPress={() => {}}
          />
          <SettingItem
            icon="key-outline"
            title="Privacy & Security"
            subtitle="Password, 2FA, privacy settings"
            onPress={() => {}}
          />
          <SettingItem
            icon="card-outline"
            title="Billing & Subscription"
            subtitle="Manage your subscription and billing"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionContent}>
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
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive notifications via email"
            showArrow={false}
            rightElement={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
            }
          />
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionContent}>
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
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English (US)"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => {}}
          />
          <SettingItem
            icon="chatbubble-outline"
            title="Contact Us"
            subtitle="Send feedback or report issues"
            onPress={() => {}}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms & Privacy"
            subtitle="Legal information"
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
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
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