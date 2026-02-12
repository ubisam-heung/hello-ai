const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'mysql_password',
  database: process.env.MYSQL_DATABASE || 'hello_db',
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
    console.log('MySQL table initialized');
  } catch (error) {
    console.error('MySQL table initialization error:', error.message);
  }
}

initTable();

module.exports = pool;
