const OPEN_FOOD_FACTS_BASE = 'https://world.openfoodfacts.org/api/v2/product';
const UPC_LOOKUP_BASE = 'https://api.barcodelookup.com/v3/products';

export async function fetchProductFromOpenFoodFacts(barcode) {
  const response = await fetch(`${OPEN_FOOD_FACTS_BASE}/${barcode}.json`);
  if (!response.ok) {
    throw new Error('Open Food Facts unavailable');
  }
  const data = await response.json();
  if (data.status !== 1) {
    return null;
  }
  const product = data.product ?? {};
  return {
    barcode,
    name: product.product_name || product.generic_name || 'Produit inconnu',
    brand: product.brands,
    image: product.image_url,
    nutriments: product.nutriments || {},
    source: 'open-food-facts',
  };
}

export async function fetchProductFromBarcodeLookup(barcode, apiKey) {
  if (!apiKey) {
    return null;
  }
  const response = await fetch(`${UPC_LOOKUP_BASE}?barcode=${barcode}&key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Barcode Lookup unavailable');
  }
  const data = await response.json();
  const product = data.products?.[0];
  if (!product) {
    return null;
  }
  return {
    barcode,
    name: product.product_name || product.title || 'Produit inconnu',
    brand: product.brand,
    image: product.images?.[0],
    nutriments: {
      calories: product.nutrition_facts?.calories,
      fat: product.nutrition_facts?.fat,
      sugar: product.nutrition_facts?.sugars,
      protein: product.nutrition_facts?.protein,
    },
    source: 'barcode-lookup',
  };
}

export async function fetchProductDetails(barcode, apiKey) {
  const primary = await fetchProductFromOpenFoodFacts(barcode);
  if (primary) {
    return primary;
  }
  return fetchProductFromBarcodeLookup(barcode, apiKey);
}
