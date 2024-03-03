"use strict";

require("dotenv/config");
const express = require("express");
const movies = require("./models/movies");
const movieRouter = require("./routers/movies");
const cors = require("cors");
const { init } = require("./services/redisService");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", movieRouter);
init();

app.get("/", (req, res) => {
  res.send("Server running 🚀🚀🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
