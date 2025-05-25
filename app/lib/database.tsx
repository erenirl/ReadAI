import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('lib/booksdb');

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bookName TEXT NOT NULL,
        author TEXT,
        image TEXT,
        currentPage Integer,
        path TEXT NOT NULL
  `);

const result = await db.getAllAsync(
  `SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'books'`
);
