const express = require("express");
const axios = require("axios");

const router = express.Router();

// Función para obtener un chiste aleatorio
const getRandomJoke = async () => {
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  return response.data;
};

// Función para obtener múltiples chistes aleatorios sin repetir
const getRandomJokes = async (count) => {
  const promises = [];

  // Hacemos todas las solicitudes en paralelo
  for (let i = 0; i < count; i++) {
    promises.push(getRandomJoke());
  }

  const jokes = await Promise.all(promises);
  return jokes.map((joke) => ({
    id: joke.id,
    url: joke.url,
    value: joke.value,
  }));
};

// Endpoint para obtener 25 chistes aleatorios sin repetir
router.get("/random/25", async (req, res) => {
  const startTime = Date.now();

  try {
    const jokesArray = await getRandomJokes(25);

    const elapsedTime = Date.now() - startTime;
    const delay = Math.max(0, 2250 - elapsedTime); // Calculamos el retraso necesario

    setTimeout(() => {
      res.json(jokesArray);
    }, delay);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jokes" });
  }
});

module.exports = router;
