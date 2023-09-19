const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const apiKey = "2aaa6cbaaa53537f06ad4c9fd8f40cee";// no logre cubir este apikey

app.use(express.json());

app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el clima' });
  }
});

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  if (response.ok) {
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys.country;
    return {
      city: cityName,
      country,
      temperature,
      description,
    };
  } else {
    throw new Error('Ciudad no encontrada.');
  }
}

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
