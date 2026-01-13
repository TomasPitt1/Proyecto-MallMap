import * as SQLite from "expo-sqlite";

export const isSQLiteSupported = true;

export const db = SQLite.openDatabaseSync("mallmap.db");

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      floor TEXT,
      zone TEXT
    );
  `);
};
