import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RecipeSearchBar from '../components/RecipeSearchBar';
import SectionCard from '../components/SectionCard';
import { recipes, scheduledRecipes, userProfile } from '../data/mockData';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.name}>{userProfile.firstName} {userProfile.lastName}</Text>
        </View>
        <View style={styles.calorieBadge}>
          <Text style={styles.calorieLabel}>Calories du jour</Text>
          <Text style={styles.calorieValue}>{userProfile.caloriesToday} kcal</Text>
        </View>
      </View>

      <SectionCard>
        <Text style={styles.sectionTitle}>Rechercher une recette</Text>
        <RecipeSearchBar placeholder="Chercher une recette" />
        <View style={styles.recipeList}>
          {recipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeRow}>
              <View>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeMeta}>{recipe.calories} kcal · {recipe.missingItems} aliment(s) manquant(s)</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Planifier vos recettes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecipeCreate')}>
            <Text style={styles.link}>Créer</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>Choisissez le jour pour ajouter une recette.</Text>
        {scheduledRecipes.map((item) => (
          <View key={item.date} style={styles.calendarRow}>
            <Text style={styles.calendarDate}>{item.date}</Text>
            <Text style={styles.calendarTitle}>{item.title}</Text>
          </View>
        ))}
      </SectionCard>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('RecipeCreate')}>
        <Text style={styles.primaryButtonText}>Créer une nouvelle recette</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: '#475569',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  calorieBadge: {
    backgroundColor: '#0ea5e9',
    padding: 12,
    borderRadius: 14,
    alignItems: 'flex-end',
  },
  calorieLabel: {
    color: '#e0f2fe',
    fontSize: 12,
  },
  calorieValue: {
    color: '#ffffff',
    fontWeight: '700',
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
  recipeList: {
    marginTop: 12,
    gap: 12,
  },
  recipeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  recipeMeta: {
    color: '#64748b',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  link: {
    color: '#2563eb',
    fontWeight: '600',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calendarDate: {
    color: '#475569',
    fontWeight: '600',
  },
  calendarTitle: {
    color: '#0f172a',
  },
  primaryButton: {
    backgroundColor: '#22c55e',
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
