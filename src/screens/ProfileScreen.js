import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionCard from '../components/SectionCard';
import NutritionSummary from '../components/NutritionSummary';
import { userProfile } from '../data/mockData';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profil</Text>

      <SectionCard>
        <Text style={styles.sectionTitle}>Données utilisateur</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nom</Text>
          <Text style={styles.infoValue}>{userProfile.lastName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Prénom</Text>
          <Text style={styles.infoValue}>{userProfile.firstName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Objectif calorique</Text>
          <Text style={styles.infoValue}>1800 kcal</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('RecipeCreate')}>
          <Text style={styles.primaryButtonText}>Créer une recette personnelle</Text>
        </TouchableOpacity>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Suivi nutritionnel (30 derniers jours)</Text>
        <NutritionSummary data={userProfile.nutrition30Days} />
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Mes recettes privées</Text>
        <Text style={styles.sectionSubtitle}>Ces recettes sont visibles uniquement dans votre compte.</Text>
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>Curry rapide de légumes</Text>
          <Text style={styles.recipeMeta}>Ajouté le 04/07</Text>
        </View>
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>Bowl quinoa & saumon</Text>
          <Text style={styles.recipeMeta}>Ajouté le 30/06</Text>
        </View>
      </SectionCard>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    color: '#64748b',
  },
  infoValue: {
    color: '#0f172a',
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: '#64748b',
    marginBottom: 12,
  },
  recipeCard: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  recipeTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  recipeMeta: {
    color: '#64748b',
    fontSize: 12,
  },
});
