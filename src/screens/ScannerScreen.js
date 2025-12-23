import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SectionCard from '../components/SectionCard';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [lastScan, setLastScan] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setLastScan({ type, data });
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
        {lastScan && (
          <View style={styles.scanResult}>
            <Text style={styles.scanLabel}>Dernier scan</Text>
            <Text style={styles.scanValue}>{lastScan.data}</Text>
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
