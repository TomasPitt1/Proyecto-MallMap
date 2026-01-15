import { db, isSQLiteSupported } from "./sqlite";

export const getFavoriteIds = async (userId: string): Promise<string[]> => {
  if (!isSQLiteSupported || !db) return [];

  const rows = db.getAllSync(
    "SELECT storeId FROM favorites WHERE userId = ? AND isFav = 1;",
    [userId]
  );

  return (rows ?? []).map((r: any) => r.storeId as string);
};

export const setFavoriteLocal = async (
  userId: string,
  storeId: string,
  isFav: boolean
): Promise<void> => {
  if (!isSQLiteSupported || !db) return;

  const now = Date.now();
  db.runSync(
    `INSERT OR REPLACE INTO favorites (userId, storeId, isFav, synced, updatedAt)
     VALUES (?, ?, ?, 0, ?)`,
    [userId, storeId, isFav ? 1 : 0, now]
  );
};

export const getPendingFavoriteRows = async (
  userId: string
): Promise<Array<{ storeId: string; isFav: number }>> => {
  if (!isSQLiteSupported || !db) return [];

  const rows = db.getAllSync(
    "SELECT storeId, isFav FROM favorites WHERE userId = ? AND synced = 0;",
    [userId]
  );

  return (rows ?? []) as Array<{ storeId: string; isFav: number }>;
};

export const markFavoritesSynced = async (userId: string): Promise<void> => {
  if (!isSQLiteSupported || !db) return;

  db.runSync("UPDATE favorites SET synced = 1 WHERE userId = ?;", [userId]);
};
