import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionCard from '../components/SectionCard';
import { recipes } from '../data/mockData';

const PAGE_SIZE = 10;

export default function RecipeProposalsScreen({ route }) {
  const filter = route?.params?.filter ?? 0;
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => recipes.filter((recipe) => recipe.missingItems <= filter),
    [filter]
  );

  const visibleRecipes = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visibleRecipes.length < filtered.length;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={visibleRecipes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <SectionCard>
          <Text style={styles.title}>Propositions de recettes</Text>
          <Text style={styles.subtitle}>Basé sur votre garde-manger (filtre {filter}).</Text>
        </SectionCard>
      }
      renderItem={({ item }) => (
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeMeta}>{item.calories} kcal · {item.missingItems} aliment(s) manquant(s)</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ajouter au planning</Text>
          </TouchableOpacity>
        </View>
      )}
      ListFooterComponent={
        <View style={styles.footer}>
          {hasMore ? (
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setPage((prev) => prev + 1)}>
              <Text style={styles.secondaryButtonText}>Recharger d'autres recettes</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.footerText}>Plus de recettes à proposer.</Text>
          )}
        </View>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    color: '#64748b',
    marginTop: 4,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  recipeTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  recipeMeta: {
    color: '#64748b',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  footerText: {
    color: '#94a3b8',
  },
});
