import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RecipeSearchBar from '../components/RecipeSearchBar';
import SectionCard from '../components/SectionCard';

const INGREDIENTS = ['Tomates', 'Poulet', 'Riz complet', 'Poivrons', 'Oignons', 'Lentilles'];

export default function RecipeCreateScreen() {
  const [selectedDate, setSelectedDate] = useState('2024-07-08');
  const [query, setQuery] = useState('');

  const filteredIngredients = INGREDIENTS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionCard>
        <Text style={styles.sectionTitle}>Informations principales</Text>
        <TextInput style={styles.input} placeholder="Nom de la recette" />
        <TextInput style={styles.input} placeholder="Temps de préparation (ex: 30 min)" />
        <TextInput style={styles.input} placeholder="Calories estimées" keyboardType="numeric" />
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Ingrédients</Text>
        <RecipeSearchBar
          placeholder="Rechercher un aliment"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.ingredientList}>
          {filteredIngredients.map((item) => (
            <TouchableOpacity key={item} style={styles.ingredientChip}>
              <Text style={styles.ingredientText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Calendrier</Text>
        <Text style={styles.sectionSubtitle}>Planifiez cette recette sur un jour précis.</Text>
        <Calendar
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#0ea5e9' },
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: '#0ea5e9',
            arrowColor: '#0ea5e9',
          }}
        />
        <View style={styles.selectedDateRow}>
          <Text style={styles.selectedDateLabel}>Jour sélectionné :</Text>
          <Text style={styles.selectedDateValue}>{selectedDate}</Text>
        </View>
      </SectionCard>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Enregistrer la recette</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: '#64748b',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  ingredientList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  ingredientChip: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ingredientText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  selectedDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  selectedDateLabel: {
    color: '#64748b',
  },
  selectedDateValue: {
    fontWeight: '600',
    color: '#0f172a',
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
