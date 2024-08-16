const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mywebsite.db');

// Crear tablas si no existen
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)");
});

module.exports = db;
