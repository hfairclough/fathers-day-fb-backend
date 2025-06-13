const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY; // Replace with your actual key
const PORT = process.env.PORT || 3000;

// Route to get Liverpool matches
app.get('/liverpool-fixtures', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/teams/64/matches?limit=100', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Liverpool fixtures:', error);
    res.status(500).json({ error: 'Failed to fetch Liverpool fixtures' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
