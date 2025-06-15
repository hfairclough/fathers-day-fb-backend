const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

//const API_KEY = process.env.API_KEY; // Replace with your actual key
const API_KEY = 'bc987abf57msh476694d3ab2a69ap19e8ffjsn8b8a1a010625'
const PORT = process.env.PORT || 3000;

const seasons = [2024, 2025];
const teamId = 40;

app.get('/liverpool-fixtures', async (req, res) => {
  try {
    let allFixtures = [];

    for (const season of seasons) {
      const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${teamId}&season=${season}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      });

      const data = await response.json();

      if (data.response) {
        allFixtures = allFixtures.concat(data.response);
      }
    }

    res.json({ matches: allFixtures });
  } catch (error) {
    console.error('Error fetching Liverpool fixtures:', error);
    res.status(500).json({ error: 'Failed to fetch Liverpool fixtures' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
