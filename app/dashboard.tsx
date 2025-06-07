import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/components/ui/Themed';
import { MainLayout } from '@/components/ui/MainLayout';
import { commonStyles, spacing, typography } from '@/lib/styles';

export default function DashboardScreen() {
  return (
    <MainLayout>
      <ScrollView style={commonStyles.pageContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome to your main dashboard</Text>
      </View>

      <View style={styles.grid}>
        <View style={[commonStyles.card, styles.dashboardCard]}>
          <Text style={styles.cardTitle}>Total Users</Text>
          <Text style={styles.cardValue}>1,234</Text>
          <Text style={styles.cardChange}>+12% from last month</Text>
        </View>

        <View style={[commonStyles.card, styles.dashboardCard]}>
          <Text style={styles.cardTitle}>Revenue</Text>
          <Text style={styles.cardValue}>$45,678</Text>
          <Text style={styles.cardChange}>+8% from last month</Text>
        </View>

        <View style={[commonStyles.card, styles.dashboardCard]}>
          <Text style={styles.cardTitle}>Active Sessions</Text>
          <Text style={styles.cardValue}>567</Text>
          <Text style={styles.cardChange}>-3% from last month</Text>
        </View>

        <View style={[commonStyles.card, styles.dashboardCard]}>
          <Text style={styles.cardTitle}>Conversion Rate</Text>
          <Text style={styles.cardValue}>3.2%</Text>
          <Text style={styles.cardChange}>+15% from last month</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>New user registered: john@example.com</Text>
          <Text style={styles.activityTime}>2 minutes ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Payment processed: $299.99</Text>
          <Text style={styles.activityTime}>5 minutes ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Report generated: Monthly Analytics</Text>
          <Text style={styles.activityTime}>10 minutes ago</Text>
        </View>
      </View>
    </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  dashboardCard: {
    flex: 1,
    minWidth: 250,
    maxWidth: '48%',
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: 30,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10, // Add consistent spacing
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardChange: {
    fontSize: 12,
    color: '#10b981',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  activityItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
});
