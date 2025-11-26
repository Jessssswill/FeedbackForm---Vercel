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
  try {
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false 
      }
    });
    return connection;
  } catch (err) {
    console.error("❌ FATAL: Gagal Konek Database:", err);
    throw err;
  }
};

const ensureTable = async (connection) => {
  try {
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
    console.log("✅ Tabel feedbacks siap/sudah ada.");
  } catch (err) {
    console.error("❌ Gagal buat tabel:", err);
  }
};

app.get('/api/feedback', async (req, res) => {
  let connection;
  try {
    connection = await getDB();
    await ensureTable(connection);
    
    const [rows] = await connection.query('SELECT * FROM feedbacks ORDER BY createdAt DESC');
    console.log(`✅ GET Berhasil: ${rows.length} data ditemukan`);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error di GET /api/feedback:", error);
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
    await ensureTable(connection);

    await connection.query(
      'INSERT INTO feedbacks (id, name, email, eventName, division, rating, comment, suggestion, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, eventName, division, rating, comment, suggestion, status, createdAt]
    );
    console.log("✅ POST Berhasil: Data baru masuk");
    res.status(201).json({ message: "Success", id });
  } catch (error) {
    console.error("❌ Error di POST /api/feedback:", error);
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
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = app;