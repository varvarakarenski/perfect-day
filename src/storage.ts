import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function loadAdditions<T>(key: string): Promise<T[]> {
  const snapshot = await getDocs(collection(db, key));
  return snapshot.docs.map((document) => document.data() as T);
}

export async function appendAddition<T extends { id: string }>(key: string, item: T): Promise<void> {
  await setDoc(doc(db, key, item.id), item);
}
