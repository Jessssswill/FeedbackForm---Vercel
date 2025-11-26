const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = './data.json';

app.use(cors());
app.use(bodyParser.json());

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/feedback', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/feedback', (req, res) => {
  const { name, email, eventName, division, rating, comment, suggestion } = req.body;
  const data = readData();
  
  const newFeedback = {
    id: Date.now(), 
    name,
    email,
    eventName,
    division,
    rating: parseInt(rating),
    comment: comment || "",
    suggestion: suggestion || "",
    createdAt: new Date().toISOString(), 
    status: "open"
  };

  data.push(newFeedback);
  writeData(data);
  res.status(201).json(newFeedback);
});

app.put('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let data = readData();
  
  const index = data.findIndex(item => item.id == id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
});

app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  let data = readData();
  const newData = data.filter(item => item.id != id);
  
  writeData(newData);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;