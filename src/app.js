require("dotenv").config();
const express = require("express");
const jokesRoutes = require("../src/routes/jokes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/jokes", jokesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
