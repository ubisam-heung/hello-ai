const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MARIADB_HOST || 'localhost',
  port: process.env.MARIADB_PORT || 3307,
  user: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD || 'mariadb_password',
  database: process.env.MARIADB_DATABASE || 'hello_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize table
async function initTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('MariaDB table initialized');
  } catch (error) {
    console.error('MariaDB table initialization error:', error.message);
  }
}

initTable();

module.exports = pool;
