import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScannerScreen from '../screens/ScannerScreen';
import PantryScreen from '../screens/PantryScreen';
import RecipeCreateScreen from '../screens/RecipeCreateScreen';
import RecipeProposalsScreen from '../screens/RecipeProposalsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: 'home',
            Scanner: 'barcode',
            Pantry: 'basket',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="RecipeCreate"
        component={RecipeCreateScreen}
        options={{ title: 'Création de recette' }}
      />
      <Stack.Screen
        name="RecipeProposals"
        component={RecipeProposalsScreen}
        options={{ title: 'Propositions de recettes' }}
      />
    </Stack.Navigator>
  );
}
