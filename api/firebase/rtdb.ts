import { child, get, ref } from "firebase/database";
import { db } from "./config";

export type Store = {
  id: string;
  name: string;
  category: string;
  floor: string;
  zone: string;
  imageUrl?: string;
};

export const fetchStoresByMallId = async (mallId: string): Promise<Store[]> => {
  const snapshot = await get(child(ref(db), `stores/${mallId}`));

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, any>;

  return Object.entries(data).map(([id, value]) => ({
    id,
    name: String(value?.name ?? ""),
    category: String(value?.category ?? ""),
    floor: String(value?.floor ?? ""),
    zone: String(value?.zone ?? ""),
    imageUrl: value?.imageUrl ? String(value.imageUrl) : undefined,
  }));
};
