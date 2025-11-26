require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const getDB = async () => {
  return await mysql.createConnection(process.env.DATABASE_URL);
};

const ensureTableExists = async (connection) => {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id BIGINT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      eventName VARCHAR(255),
      division VARCHAR(50),
      rating INT,
      comment TEXT,
      suggestion TEXT,
      status VARCHAR(50) DEFAULT 'open',
      createdAt DATETIME
    )
  `);
};

app.get('/api/feedback', async (req, res) => {
  let connection;
  try {
    connection = await getDB();
    await ensureTableExists(connection); 
    const [rows] = await connection.query('SELECT * FROM feedbacks ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    console.error("GET Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/api/feedback', async (req, res) => {
  const { name, email, eventName, division, rating, comment, suggestion } = req.body;
  const id = Date.now();
  const createdAt = new Date();
  const status = 'open';
  let connection;

  try {
    connection = await getDB();
    await ensureTableExists(connection); 
    await connection.query(
      'INSERT INTO feedbacks (id, name, email, eventName, division, rating, comment, suggestion, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, eventName, division, rating, comment, suggestion, status, createdAt]
    );
    res.status(201).json({ message: "Success", id });
  } catch (error) {
    console.error("POST Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.put('/api/feedback/:id', async (req, res) => {
  const { status, comment } = req.body;
  const { id } = req.params;
  let connection;

  try {
    connection = await getDB();
    let query = 'UPDATE feedbacks SET ';
    const params = [];
    if (status) { query += 'status = ?, '; params.push(status); }
    if (comment) { query += 'comment = ?, '; params.push(comment); }
    
    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(id);

    await connection.query(query, params);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.delete('/api/feedback/:id', async (req, res) => {
  let connection;
  try {
    connection = await getDB();
    await connection.query('DELETE FROM feedbacks WHERE id = ?', [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = app;