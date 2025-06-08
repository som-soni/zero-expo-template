import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { MainLayout } from '@/components/ui/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { spacing, borderRadius } from '@/lib/styles';

type GridType = '2-column' | '3-column' | '4-column' | 'auto-wrap';

interface GridItemProps {
  index: number;
  title: string;
  subtitle?: string;
}

function GridItem({ index, title, subtitle }: GridItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.gridItem} padding="lg">
      <View style={[styles.itemHeader, { backgroundColor: colors.tint + '20' }]}>
        <Text style={[styles.itemNumber, { color: colors.tint }]}>
          {index + 1}
        </Text>
      </View>
      <Text style={[styles.itemTitle, { color: colors.text }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.itemSubtitle, { color: colors.gray500 }]}>
          {subtitle}
        </Text>
      )}
    </Card>
  );
}

export default function GridExamplesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  const [selectedGrid, setSelectedGrid] = useState<GridType>('2-column');

  // Sample data for grid items
  const gridData = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    title: `Card ${index + 1}`,
    subtitle: `Sample content for item ${index + 1}`,
  }));

  const getGridStyle = (type: GridType) => {
    const isLargeScreen = width >= 768;
    
    switch (type) {
      case '2-column':
        return {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
          gap: spacing.md,
          justifyContent: 'space-between' as const,
        };
      case '3-column':
        return {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
          gap: spacing.md,
          justifyContent: 'space-between' as const,
        };
      case '4-column':
        return {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
          gap: spacing.md,
          justifyContent: 'space-between' as const,
        };
      case 'auto-wrap':
        return {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
          gap: spacing.md,
        };
      default:
        return {};
    }
  };

  const getItemWidth = (type: GridType) => {
    const isLargeScreen = width >= 768;
    const containerPadding = spacing.xl * 2;
    const availableWidth = width - containerPadding;
    
    switch (type) {
      case '2-column':
        return (availableWidth - spacing.md) / 2;
      case '3-column':
        if (isLargeScreen) {
          return (availableWidth - spacing.md * 2) / 3;
        } else {
          return (availableWidth - spacing.md) / 2; // Fall back to 2 columns on mobile
        }
      case '4-column':
        if (isLargeScreen) {
          return (availableWidth - spacing.md * 3) / 4;
        } else if (width >= 480) {
          return (availableWidth - spacing.md * 2) / 3; // 3 columns on tablet
        } else {
          return (availableWidth - spacing.md) / 2; // 2 columns on mobile
        }
      case 'auto-wrap':
        const minItemWidth = 180;
        const itemsPerRow = Math.floor(availableWidth / (minItemWidth + spacing.md));
        return (availableWidth - spacing.md * (itemsPerRow - 1)) / itemsPerRow;
      default:
        return availableWidth;
    }
  };

  const gridButtons: { type: GridType; label: string }[] = [
    { type: '2-column', label: '2 Column' },
    { type: '3-column', label: '3 Column' },
    { type: '4-column', label: '4 Column' },
    { type: 'auto-wrap', label: 'Auto Wrap' },
  ];

  return (
    <MainLayout>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Grid Layout Examples
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray500 }]}>
            Responsive grid layouts that adapt to different screen sizes
          </Text>
        </View>

        {/* Grid Type Selector */}
        <View style={styles.selectorContainer}>
          <Text style={[styles.selectorTitle, { color: colors.text }]}>
            Select Grid Type:
          </Text>
          <View style={styles.buttonGroup}>
            {gridButtons.map((button) => (
              <Button
                key={button.type}
                title={button.label}
                variant={selectedGrid === button.type ? 'primary' : 'outline'}
                size="sm"
                onPress={() => setSelectedGrid(button.type)}
                style={styles.gridButton}
              />
            ))}
          </View>
        </View>

        {/* Grid Info */}
        <Card style={styles.infoCard} padding="lg">
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            Current Grid: {selectedGrid}
          </Text>
          <Text style={[styles.infoText, { color: colors.gray500 }]}>
            {selectedGrid === '2-column' && 'Simple 2-column layout, perfect for showcasing pairs of content.'}
            {selectedGrid === '3-column' && 'Balanced 3-column layout, falls back to 2 columns on mobile.'}
            {selectedGrid === '4-column' && 'Dense 4-column layout, adapts to 3 on tablet and 2 on mobile.'}
            {selectedGrid === 'auto-wrap' && 'Dynamic layout that adjusts columns based on available space.'}
          </Text>
        </Card>

        {/* Grid Container */}
        <View style={[styles.gridContainer, getGridStyle(selectedGrid)]}>
          {gridData.map((item, index) => (
            <View
              key={item.id}
              style={{
                width: getItemWidth(selectedGrid),
              }}
            >
              <GridItem
                index={index}
                title={item.title}
                subtitle={item.subtitle}
              />
            </View>
          ))}
        </View>

        {/* Grid Statistics */}
        <Card style={styles.statsCard} padding="lg">
          <Text style={[styles.statsTitle, { color: colors.text }]}>
            Layout Statistics
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>
                Screen Width
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {Math.round(width)}px
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>
                Item Width
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {Math.round(getItemWidth(selectedGrid))}px
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>
                Items Per Row
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {Math.floor((width - spacing.xl * 2) / (getItemWidth(selectedGrid) + spacing.md))}
              </Text>
            </View>
          </View>
        </Card>

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
  selectorContainer: {
    marginBottom: spacing.xl,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  gridButton: {
    minWidth: 80,
  },
  infoCard: {
    marginBottom: spacing.xl,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  gridContainer: {
    marginBottom: spacing.xl,
  },
  gridItem: {
    marginBottom: spacing.md,
    minHeight: 120,
  },
  itemHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  itemSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  statsCard: {
    marginBottom: spacing.xl,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
}); 