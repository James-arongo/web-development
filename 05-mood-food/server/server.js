const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Get random recipe by mood
app.get('/api/recipe/:mood', (req, res) => {
  const mood = req.params.mood;
  db.get(
    'SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1',
    [mood],
    (err, recipe) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(recipe);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 