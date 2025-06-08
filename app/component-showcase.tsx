import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MainLayout } from '@/components/ui/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { spacing, borderRadius } from '@/lib/styles';

// Interfaces
interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

interface FormData {
  name: string;
  email: string;
  role: string;
  message: string;
}

// Sample table data
const tableData: TableData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

// Components
function DataTable() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const TableHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader, { backgroundColor: colors.gray100 }]}>
      <Text style={[styles.tableCell, styles.headerText, { color: colors.text }]}>Name</Text>
      <Text style={[styles.tableCell, styles.headerText, { color: colors.text }]}>Email</Text>
      <Text style={[styles.tableCell, styles.headerText, { color: colors.text }]}>Role</Text>
      <Text style={[styles.tableCell, styles.headerText, { color: colors.text }]}>Status</Text>
    </View>
  );

  const TableRow = ({ item }: { item: TableData }) => (
    <View style={[styles.tableRow, { borderBottomColor: colors.gray200 }]}>
      <Text style={[styles.tableCell, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.tableCell, { color: colors.text }]}>{item.email}</Text>
      <Text style={[styles.tableCell, { color: colors.text }]}>{item.role}</Text>
      <View style={[styles.tableCell, styles.statusContainer]}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Active' ? colors.tint + '20' : colors.gray200 }
        ]}>
          <Text style={[
            styles.statusText,
            { color: item.status === 'Active' ? colors.tint : colors.gray500 }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Card style={styles.tableCard} padding="lg">
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Table</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <TableHeader />
          <FlatList
            data={tableData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TableRow item={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </Card>
  );
}

function FormExample() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'User',
    message: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Form submitted successfully!');
  };

  const roles = ['User', 'Admin', 'Editor'];

  return (
    <Card style={styles.formCard} padding="lg">
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Sample Form</Text>
      
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Name *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.gray50, color: colors.text, borderColor: colors.gray200 }]}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your name"
          placeholderTextColor={colors.gray400}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Email *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.gray50, color: colors.text, borderColor: colors.gray200 }]}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter your email"
          placeholderTextColor={colors.gray400}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Role</Text>
        <View style={styles.roleSelector}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleOption,
                {
                  backgroundColor: formData.role === role ? colors.tint : colors.gray100,
                  borderColor: formData.role === role ? colors.tint : colors.gray200,
                }
              ]}
              onPress={() => setFormData({ ...formData, role })}
            >
              <Text style={[
                styles.roleText,
                { color: formData.role === role ? 'white' : colors.text }
              ]}>
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Message</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.gray50, color: colors.text, borderColor: colors.gray200 }]}
          value={formData.message}
          onChangeText={(text) => setFormData({ ...formData, message: text })}
          placeholder="Enter your message"
          placeholderTextColor={colors.gray400}
          multiline
          numberOfLines={4}
        />
      </View>

      <Button
        title="Submit Form"
        variant="primary"
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </Card>
  );
}

function ButtonShowcase() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.buttonCard} padding="lg">
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Button Variants</Text>
      
      <View style={styles.buttonGroup}>
        <Button
          title="Primary"
          variant="primary"
          onPress={() => Alert.alert('Button Pressed', 'Primary button clicked')}
        />
        <Button
          title="Secondary"
          variant="secondary"
          onPress={() => Alert.alert('Button Pressed', 'Secondary button clicked')}
        />
        <Button
          title="Outline"
          variant="outline"
          onPress={() => Alert.alert('Button Pressed', 'Outline button clicked')}
        />
        <Button
          title="Ghost"
          variant="ghost"
          onPress={() => Alert.alert('Button Pressed', 'Ghost button clicked')}
        />
      </View>

      <Text style={[styles.subsectionTitle, { color: colors.text }]}>Button Sizes</Text>
      <View style={styles.buttonGroup}>
        <Button title="Small" variant="primary" size="sm" onPress={() => {}} />
        <Button title="Medium" variant="primary" size="md" onPress={() => {}} />
        <Button title="Large" variant="primary" size="lg" onPress={() => {}} />
      </View>

      <Text style={[styles.subsectionTitle, { color: colors.text }]}>Button States</Text>
      <View style={styles.buttonGroup}>
        <Button title="Enabled" variant="primary" onPress={() => {}} />
        <Button title="Disabled" variant="primary" disabled onPress={() => {}} />
      </View>
    </Card>
  );
}

function CardShowcase() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.cardShowcase}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Card Examples</Text>
      
      <View style={styles.cardGrid}>
        <Card style={styles.demoCard} padding="lg">
          <Text style={[styles.cardTitle, { color: colors.text }]}>Simple Card</Text>
          <Text style={[styles.cardText, { color: colors.gray500 }]}>
            This is a basic card with some content inside it.
          </Text>
        </Card>

        <Card style={styles.demoCard} padding="lg">
          <Text style={[styles.cardTitle, { color: colors.text }]}>Interactive Card</Text>
          <Text style={[styles.cardText, { color: colors.gray500 }]}>
            This card can contain interactive elements.
          </Text>
          <Button
            title="Action"
            variant="outline"
            size="sm"
            onPress={() => Alert.alert('Card Action', 'Card button pressed')}
            style={styles.cardButton}
          />
        </Card>

        <Card style={styles.demoCard} padding="lg">
          <View style={[styles.cardIcon, { backgroundColor: colors.tint + '20' }]}>
            <Text style={[styles.cardIconText, { color: colors.tint }]}>📊</Text>
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Icon Card</Text>
          <Text style={[styles.cardText, { color: colors.gray500 }]}>
            Cards can include icons and custom layouts.
          </Text>
        </Card>
      </View>
    </View>
  );
}

function TabExample() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const tabContent = [
    'This is the content for Tab 1. It contains information about the first section.',
    'Tab 2 content goes here. This section might have different information than Tab 1.',
    'The third tab shows different content. Each tab can have unique layouts and data.',
  ];

  return (
    <Card style={styles.tabCard} padding="lg">
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Tab Navigation</Text>
      
      <View style={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === index ? colors.tint : 'transparent',
                borderBottomColor: activeTab === index ? colors.tint : colors.gray200,
              }
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === index ? 'white' : colors.text }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.tabContent, { backgroundColor: colors.gray50 }]}>
        <Text style={[styles.tabContentText, { color: colors.text }]}>
          {tabContent[activeTab]}
        </Text>
      </View>
    </Card>
  );
}

function ToggleShowcase() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [toggles, setToggles] = useState({
    notifications: true,
    darkMode: false,
    location: true,
    analytics: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleItems = [
    { key: 'notifications' as const, label: 'Push Notifications', description: 'Receive notifications on your device' },
    { key: 'darkMode' as const, label: 'Dark Mode', description: 'Use dark theme throughout the app' },
    { key: 'location' as const, label: 'Location Services', description: 'Allow location-based features' },
    { key: 'analytics' as const, label: 'Analytics', description: 'Help improve the app with usage data' },
  ];

  return (
    <Card style={styles.toggleCard} padding="lg">
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Toggles & Switches</Text>
      
      {toggleItems.map((item) => (
        <View key={item.key} style={[styles.toggleItem, { borderBottomColor: colors.gray200 }]}>
          <View style={styles.toggleInfo}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>{item.label}</Text>
            <Text style={[styles.toggleDescription, { color: colors.gray500 }]}>
              {item.description}
            </Text>
          </View>
          <Switch
            value={toggles[item.key]}
            onValueChange={() => handleToggle(item.key)}
            trackColor={{ false: colors.gray200, true: colors.tint + '40' }}
            thumbColor={toggles[item.key] ? colors.tint : colors.gray400}
          />
        </View>
      ))}
    </Card>
  );
}

export default function ComponentShowcaseScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <MainLayout>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Component Showcase
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray500 }]}>
            Interactive examples of common UI components and patterns
          </Text>
        </View>

        {/* Components */}
        <DataTable />
        <FormExample />
        <ButtonShowcase />
        <CardShowcase />
        <TabExample />
        <ToggleShowcase />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  
  // Table styles
  tableCard: {
    marginBottom: spacing.xl,
  },
  table: {
    minWidth: 600,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 50,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  tableHeader: {
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    paddingRight: spacing.sm,
  },
  headerText: {
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Form styles
  formCard: {
    marginBottom: spacing.xl,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  roleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roleOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: spacing.md,
  },

  // Button styles
  buttonCard: {
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  // Card styles
  cardShowcase: {
    marginBottom: spacing.xl,
  },
  cardGrid: {
    gap: spacing.md,
  },
  demoCard: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  cardButton: {
    alignSelf: 'flex-start',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardIconText: {
    fontSize: 24,
  },

  // Tab styles
  tabCard: {
    marginBottom: spacing.xl,
  },
  tabHeader: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderRadius: borderRadius.sm,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabContent: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    minHeight: 100,
  },
  tabContentText: {
    fontSize: 16,
    lineHeight: 24,
  },

  // Toggle styles
  toggleCard: {
    marginBottom: spacing.xl,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  toggleInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  
  bottomSpacing: {
    height: spacing.xl,
  },
}); 