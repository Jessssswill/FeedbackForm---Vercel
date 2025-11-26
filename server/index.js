require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true 
  }
});

const initDB = async () => {
  try {
    const connection = await pool.getConnection();
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
    console.log("Tabel 'feedbacks' siap digunakan!");
    connection.release();
  } catch (err) {
    console.error("Gagal init database:", err);
  }
};

initDB();

app.get('/api/feedback', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM feedbacks ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  const { name, email, eventName, division, rating, comment, suggestion } = req.body;
  const id = Date.now(); 
  const createdAt = new Date();
  const status = 'open';

  try {
    await pool.query(
      'INSERT INTO feedbacks (id, name, email, eventName, division, rating, comment, suggestion, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, eventName, division, rating, comment, suggestion, status, createdAt]
    );
    res.status(201).json({ message: "Success", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/feedback/:id', async (req, res) => {
  const { status, comment } = req.body;
  const { id } = req.params;

  try {
    let query = 'UPDATE feedbacks SET ';
    const params = [];
    
    if (status) { query += 'status = ?, '; params.push(status); }
    if (comment) { query += 'comment = ?, '; params.push(comment); }
    
    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(id);

    await pool.query(query, params);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/feedback/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM feedbacks WHERE id = ?', [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app; 

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}