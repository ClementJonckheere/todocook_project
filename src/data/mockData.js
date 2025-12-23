export const userProfile = {
  firstName: 'Amina',
  lastName: 'Diallo',
  caloriesToday: 1620,
  nutrition30Days: [
    { day: 'Lun', calories: 1800 },
    { day: 'Mar', calories: 1650 },
    { day: 'Mer', calories: 1700 },
    { day: 'Jeu', calories: 1750 },
    { day: 'Ven', calories: 1600 },
    { day: 'Sam', calories: 1900 },
    { day: 'Dim', calories: 1500 },
  ],
};

export const pantryItems = [
  { id: '1', name: 'Tomates', quantity: '4' },
  { id: '2', name: 'Riz complet', quantity: '1 kg' },
  { id: '3', name: 'Poulet', quantity: '500 g' },
  { id: '4', name: 'Lentilles', quantity: '300 g' },
];

export const recipes = [
  {
    id: 'r1',
    title: 'Bol protéiné poulet & légumes',
    calories: 520,
    missingItems: 1,
  },
  {
    id: 'r2',
    title: 'Salade lentilles & tomates',
    calories: 410,
    missingItems: 0,
  },
  {
    id: 'r3',
    title: 'Riz complet au curry',
    calories: 600,
    missingItems: 2,
  },
];

export const scheduledRecipes = [
  { date: '2024-07-08', title: 'Salade lentilles & tomates' },
  { date: '2024-07-10', title: 'Bol protéiné poulet & légumes' },
];
