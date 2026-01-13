import type { Store } from "../api/firebase/rtdb";
import { db, isSQLiteSupported } from "./sqlite";

export const getLocalStores = async (): Promise<Store[]> => {
  if (!isSQLiteSupported || !db) return []; // web fallback

  try {
    const rows = db.getAllSync(
      "SELECT id, name, category, floor, zone FROM stores;"
    );
    return (rows ?? []) as Store[];
  } catch {
    return [];
  }
};

export const saveStores = async (stores: Store[]): Promise<void> => {
  if (!isSQLiteSupported || !db) return; // web no-op

  db.withTransactionSync(() => {
    for (const s of stores) {
      db.runSync(
        `INSERT OR REPLACE INTO stores (id, name, category, floor, zone)
         VALUES (?, ?, ?, ?, ?)`,
        [s.id, s.name, s.category, s.floor, s.zone]
      );
    }
  });
};
