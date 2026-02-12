const oracledb = require('oracledb');
require('dotenv').config();

// Oracle connection configuration
const config = {
  user: process.env.ORACLE_USER || 'system',
  password: process.env.ORACLE_PASSWORD || 'oracle_password',
  connectString: `${process.env.ORACLE_HOST || 'localhost'}:${process.env.ORACLE_PORT || 1521}/${process.env.ORACLE_SERVICE || 'XEPDB1'}`,
  poolMax: 10,
  poolMin: 2,
  poolIncrement: 2
};

let pool;

// Initialize pool and table
async function initialize() {
  try {
    // Create connection pool
    pool = await oracledb.createPool(config);
    console.log('Oracle connection pool created');

    // Initialize table
    const connection = await pool.getConnection();
    try {
      // Check if sequence exists
      const seqResult = await connection.execute(
        `SELECT COUNT(*) as cnt FROM user_sequences WHERE sequence_name = 'USERS_SEQ'`
      );
      
      if (seqResult.rows[0][0] === 0) {
        await connection.execute(`CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1`);
      }

      // Check if table exists
      const tblResult = await connection.execute(
        `SELECT COUNT(*) as cnt FROM user_tables WHERE table_name = 'USERS'`
      );
      
      if (tblResult.rows[0][0] === 0) {
        await connection.execute(`
          CREATE TABLE users (
            id NUMBER PRIMARY KEY,
            name VARCHAR2(255) NOT NULL,
            email VARCHAR2(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
      }

      await connection.commit();
      console.log('Oracle table initialized');
    } finally {
      await connection.close();
    }
  } catch (error) {
    console.error('Oracle initialization error:', error.message);
  }
}

initialize();

module.exports = {
  getConnection: async () => {
    if (!pool) {
      await initialize();
    }
    return pool.getConnection();
  },
  close: async () => {
    if (pool) {
      await pool.close();
    }
  }
};
