const mysql = require('mysql2/promise');

let db;

async function initializeDatabase() {
    if (!db) {
        try {
            db = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            console.log('MySQL Connected...');
        } catch (err) {
            console.error('MySQL connection error:', err);
            throw err;
        }
    }
    return db;
}

module.exports = initializeDatabase;
