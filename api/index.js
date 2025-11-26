const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/feedback', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal membaca data" });
  }
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

  data.unshift(newFeedback);
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

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}