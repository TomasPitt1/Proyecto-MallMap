import * as SQLite from "expo-sqlite";

export const isSQLiteSupported = true;

export const db = SQLite.openDatabaseSync("mallmap.db");

export const initDB = () => {
  // tabla stores (ya la tenés)
  db.execSync(`
    CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      floor TEXT,
      zone TEXT
    );
  `);

  // ⭐ tabla favorites
  db.execSync(`
    CREATE TABLE IF NOT EXISTS favorites (
      userId TEXT NOT NULL,
      storeId TEXT NOT NULL,
      isFav INTEGER NOT NULL,
      synced INTEGER NOT NULL DEFAULT 0,
      updatedAt INTEGER NOT NULL,
      PRIMARY KEY (userId, storeId)
    );
  `);
};
