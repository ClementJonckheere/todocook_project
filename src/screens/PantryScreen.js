import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionCard from '../components/SectionCard';
import { pantryItems, recipes } from '../data/mockData';

const FILTERS = [0, 1, 2, 3, 4, 5];

export default function PantryScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState(0);

  const filteredRecipes = recipes.filter((recipe) => recipe.missingItems <= selectedFilter);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={pantryItems}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Garde manger</Text>
          <SectionCard>
            <Text style={styles.sectionTitle}>Filtre aliments manquants</Text>
            <View style={styles.filterRow}>
              {FILTERS.map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[styles.filterChip, selectedFilter === value && styles.filterChipActive]}
                  onPress={() => setSelectedFilter(value)}
                >
                  <Text style={[styles.filterText, selectedFilter === value && styles.filterTextActive]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('RecipeProposals', { filter: selectedFilter })}
            >
              <Text style={styles.primaryButtonText}>Voir les propositions ({filteredRecipes.length})</Text>
            </TouchableOpacity>
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Récapitulatif du garde-manger</Text>
            <Text style={styles.sectionSubtitle}>Vos aliments disponibles</Text>
          </SectionCard>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.pantryRow}>
          <Text style={styles.pantryName}>{item.name}</Text>
          <Text style={styles.pantryQty}>{item.quantity}</Text>
        </View>
      )}
      ListFooterComponent={
        <SectionCard>
          <Text style={styles.sectionTitle}>Aliments manquants</Text>
          <Text style={styles.sectionSubtitle}>Basé sur vos recettes ajoutées cette semaine.</Text>
          <View style={styles.missingRow}>
            <Text style={styles.missingItem}>Poivrons</Text>
            <Text style={styles.missingQty}>2</Text>
          </View>
          <View style={styles.missingRow}>
            <Text style={styles.missingItem}>Yaourt grec</Text>
            <Text style={styles.missingQty}>1</Text>
          </View>
        </SectionCard>
      }
    />
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#64748b',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  filterText: {
    color: '#475569',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pantryRow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pantryName: {
    color: '#0f172a',
    fontWeight: '600',
  },
  pantryQty: {
    color: '#64748b',
  },
  missingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  missingItem: {
    color: '#0f172a',
    fontWeight: '600',
  },
  missingQty: {
    color: '#64748b',
  },
});
