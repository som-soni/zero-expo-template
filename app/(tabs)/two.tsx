import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/components/ui/Themed';
import { Colors } from '@/lib/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Performance metrics and insights</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traffic Overview</Text>
        <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface, borderColor: colors.gray200 }]}>
          <Text style={styles.chartText}>📊 Chart Placeholder</Text>
          <Text style={styles.chartSubtext}>Weekly traffic visualization would go here</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metric, { backgroundColor: colors.surface }]}>
          <Text style={styles.metricValue}>85%</Text>
          <Text style={styles.metricLabel}>Bounce Rate</Text>
        </View>
        <View style={[styles.metric, { backgroundColor: colors.surface }]}>
          <Text style={styles.metricValue}>2.4s</Text>
          <Text style={styles.metricLabel}>Avg Load Time</Text>
        </View>
        <View style={[styles.metric, { backgroundColor: colors.surface }]}>
          <Text style={styles.metricValue}>4.2</Text>
          <Text style={styles.metricLabel}>Pages per Session</Text>
        </View>
        <View style={[styles.metric, { backgroundColor: colors.surface }]}>
          <Text style={styles.metricValue}>67%</Text>
          <Text style={styles.metricLabel}>Mobile Traffic</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Pages</Text>
        <View style={[styles.pageItem, { backgroundColor: colors.surface }]}>
          <Text style={styles.pageName}>/dashboard</Text>
          <Text style={styles.pageViews}>1,234 views</Text>
        </View>
        <View style={[styles.pageItem, { backgroundColor: colors.surface }]}>
          <Text style={styles.pageName}>/analytics</Text>
          <Text style={styles.pageViews}>987 views</Text>
        </View>
        <View style={[styles.pageItem, { backgroundColor: colors.surface }]}>
          <Text style={styles.pageName}>/settings</Text>
          <Text style={styles.pageViews}>654 views</Text>
        </View>
        <View style={[styles.pageItem, { backgroundColor: colors.surface }]}>
          <Text style={styles.pageName}>/users</Text>
          <Text style={styles.pageViews}>321 views</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  chartText: {
    fontSize: 24,
    marginBottom: 8,
  },
  chartSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metric: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  pageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  pageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  pageViews: {
    fontSize: 14,
    opacity: 0.7,
  },
});
