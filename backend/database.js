const sqlite3 = require("sqlite3").verbose();

// Create DB file
const db = new sqlite3.Database("./signlingo.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    lastLogin TEXT
  )
`);

module.exports = db;