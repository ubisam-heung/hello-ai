const express = require('express');
const router = express.Router();
const oracleDb = require('../db/oracle');

// Get all users
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await oracleDb.getConnection();
    const result = await connection.execute(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC',
      [],
      { outFormat: 4 } // OBJECT format
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  let connection;
  try {
    connection = await oracleDb.getConnection();
    const result = await connection.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = :id',
      [req.params.id],
      { outFormat: 4 }
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// Create user
router.post('/', async (req, res) => {
  let connection;
  try {
    const { name, email } = req.body;
    connection = await oracleDb.getConnection();
    
    const result = await connection.execute(
      'INSERT INTO users (id, name, email) VALUES (users_seq.NEXTVAL, :name, :email) RETURNING id, name, email, created_at INTO :id, :name2, :email2, :created_at',
      {
        name: name,
        email: email,
        id: { dir: 3003, type: 2010 }, // OUT, NUMBER
        name2: { dir: 3003, type: 2001, maxSize: 255 }, // OUT, VARCHAR2
        email2: { dir: 3003, type: 2001, maxSize: 255 }, // OUT, VARCHAR2
        created_at: { dir: 3003, type: 2014 } // OUT, TIMESTAMP
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      id: result.outBinds.id[0],
      name: result.outBinds.name2[0],
      email: result.outBinds.email2[0],
      created_at: result.outBinds.created_at[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// Update user
router.put('/:id', async (req, res) => {
  let connection;
  try {
    const { name, email } = req.body;
    connection = await oracleDb.getConnection();
    
    const result = await connection.execute(
      'UPDATE users SET name = :name, email = :email WHERE id = :id',
      [name, email, req.params.id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const selectResult = await connection.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = :id',
      [req.params.id],
      { outFormat: 4 }
    );
    
    res.json(selectResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  let connection;
  try {
    connection = await oracleDb.getConnection();
    const result = await connection.execute(
      'DELETE FROM users WHERE id = :id',
      [req.params.id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

module.exports = router;
