import { StyleSheet, Text, View } from 'react-native';

export default function NutritionSummary({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.day} style={styles.row}>
          <Text style={styles.day}>{item.day}</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: `${Math.min(item.calories / 20, 100)}%` }]} />
          </View>
          <Text style={styles.value}>{item.calories} kcal</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  day: {
    width: 40,
    color: '#475569',
    fontWeight: '600',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  bar: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  value: {
    width: 80,
    textAlign: 'right',
    color: '#0f172a',
    fontWeight: '600',
  },
});
