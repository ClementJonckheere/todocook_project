import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SectionCard from '../components/SectionCard';
import { fetchProductDetails } from '../services/foodApi';
import { getCachedProduct, setCachedProduct } from '../services/foodCache';

const BARCODE_LOOKUP_API_KEY = '';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setIsLoading(true);
    setError(null);

    try {
      const cached = await getCachedProduct(data);
      if (cached) {
        setLastScan(cached);
        setIsLoading(false);
        return;
      }

      const product = await fetchProductDetails(data, BARCODE_LOOKUP_API_KEY);
      if (!product) {
        setError('Produit introuvable dans les sources disponibles.');
      } else {
        setLastScan(product);
        await setCachedProduct(data, product);
      }
    } catch (err) {
      setError('Impossible de récupérer les informations du produit.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner de produit</Text>
      <SectionCard>
        <Text style={styles.sectionTitle}>Ajoutez un produit à votre garde-manger</Text>
        {hasPermission === false ? (
          <Text style={styles.warning}>Autorisation caméra refusée.</Text>
        ) : (
          <View style={styles.scannerWrapper}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
          </View>
        )}
        {isLoading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#0ea5e9" />
            <Text style={styles.loadingText}>Recherche du produit...</Text>
          </View>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        {lastScan && !isLoading && (
          <View style={styles.scanResult}>
            <Text style={styles.scanLabel}>Produit détecté</Text>
            <Text style={styles.scanValue}>{lastScan.name}</Text>
            <Text style={styles.scanMeta}>Source: {lastScan.source}</Text>
          </View>
        )}
        {scanned && (
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScanned(false)}>
            <Text style={styles.primaryButtonText}>Scanner un autre produit</Text>
          </TouchableOpacity>
        )}
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  scannerWrapper: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  scanner: {
    height: 260,
  },
  warning: {
    color: '#ef4444',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: '#475569',
  },
  error: {
    marginTop: 12,
    color: '#ef4444',
  },
  scanResult: {
    marginTop: 12,
  },
  scanLabel: {
    color: '#64748b',
  },
  scanValue: {
    fontWeight: '600',
    color: '#0f172a',
  },
  scanMeta: {
    color: '#94a3b8',
    fontSize: 12,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
