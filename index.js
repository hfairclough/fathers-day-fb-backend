const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '692d4bc85dc149bc86ba830c380dfa33'; // Replace with your actual key
const PORT = process.env.PORT || 3000;

// Route to get Liverpool matches
app.get('/liverpool-fixtures', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/teams/64/matches?status=SCHEDULED', {
      headers: { 'X-Auth-Token': API_KEY }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch fixtures' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
