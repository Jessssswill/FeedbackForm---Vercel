const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let feedbacks = [
  {
    id: 1732660000001,
    name: "Kevin Wijaya",
    email: "kevin@binus.ac.id",
    eventName: "Public Speaking 101",
    division: "PR",
    rating: 3,
    comment: "Materi bagus, tapi mulainya agak telat.",
    suggestion: "Next time on time ya.",
    createdAt: "2025-11-22T09:15:00.000Z",
    status: "in-review"
  },
  {
    id: 1732660000002,
    name: "Siti Aminah",
    email: "siti@binus.ac.id",
    eventName: "Figma Design Class",
    division: "RnD",
    rating: 4,
    comment: "Seru banget, mentornya asik.",
    suggestion: "",
    createdAt: "2025-11-21T14:30:00.000Z",
    status: "open"
  },
  {
    id: 1732660000003,
    name: "Budi Santoso",
    email: "budi@binus.ac.id",
    eventName: "React Workshop",
    "division": "LnT",
    "rating": 5,
    "comment": "Daging semua materinya!",
    "suggestion": "Perbanyak sesi praktek.",
    "createdAt": "2025-11-20T10:00:00.000Z",
    "status": "resolved"
  }
];

app.get('/api/feedback', (req, res) => {
  // Langsung kirim variable feedbacks
  res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
  const { name, email, eventName, division, rating, comment, suggestion } = req.body;
  
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

  feedbacks.unshift(newFeedback);
  res.status(201).json(newFeedback);
});

app.put('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = feedbacks.findIndex(item => item.id == id);
  if (index !== -1) {
    feedbacks[index] = { ...feedbacks[index], ...updates };
    res.json(feedbacks[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  feedbacks = feedbacks.filter(item => item.id != id);
  res.json({ message: "Deleted" });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}