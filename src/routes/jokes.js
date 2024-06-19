const express = require("express");
const axios = require("axios");

const router = express.Router();

const getRandomJoke = async () => {
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  return response.data;
};

router.get("/ramdon/25", async (req, res) => {
  try {
    const jokeSet = new Set();

    while (jokeSet.size < 25) {
      const joke = await getRandomJoke();
      jokeSet.add({ id: joke.id, url: joke.url, value: joke.value });
    }

    const jokesArray = Array.from(jokeSet);

    setTimeout(() => {
      res.json(jokesArray);
    }, 2250);
  } catch (error) {
    res.status(500).json({ error: "Error fatching joke" });
  }
});

module.exports = router;
