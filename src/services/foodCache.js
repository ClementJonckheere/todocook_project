import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'productCache';

export async function getCachedProduct(barcode) {
  const docRef = doc(db, COLLECTION, barcode);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return null;
  }
  return snapshot.data();
}

export async function setCachedProduct(barcode, data) {
  const docRef = doc(db, COLLECTION, barcode);
  await setDoc(docRef, {
    ...data,
    cachedAt: new Date().toISOString(),
  });
}
