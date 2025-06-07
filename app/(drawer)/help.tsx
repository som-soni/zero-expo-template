import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>Get help and contact support</Text>
      <Text style={styles.placeholder}>🆘 Help center and support tools coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
  placeholder: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.6,
  },
}); 