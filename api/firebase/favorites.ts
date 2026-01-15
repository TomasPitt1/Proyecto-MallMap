import { get, ref, remove, update } from "firebase/database";
import { db } from "./config";

export const fetchRemoteFavoriteIds = async (
  uid: string
): Promise<string[]> => {
  const snap = await get(ref(db, `users/${uid}/favorites`));
  if (!snap.exists()) return [];

  const data = snap.val() as Record<string, any>;
  // filtramos _init si existe
  return Object.keys(data).filter((k) => k !== "_init");
};

export const setRemoteFavorite = async (uid: string, storeId: string) => {
  await update(ref(db, `users/${uid}/favorites`), { [storeId]: true });
};

export const removeRemoteFavorite = async (uid: string, storeId: string) => {
  await remove(ref(db, `users/${uid}/favorites/${storeId}`));
};
