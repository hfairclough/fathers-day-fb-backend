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
    const response = await fetch('https://api.football-data.org/v4/teams/64/matches?status=SCHEDULED', {
      headers: { 'X-Auth-Token': API_KEY }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch fixtures' });
  }
});

// England matches

app.get('/england-fixtures', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/teams/770/matches?status=SCHEDULED', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching England fixtures:', error);
    res.status(500).json({ error: 'Failed to fetch England fixtures' });
  }
});

app.get('/england-results', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/teams/770/matches?status=FINISHED', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching England results:', error);
    res.status(500).json({ error: 'Failed to fetch England results' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
