"use strict";

require("dotenv/config");
const express = require("express");
const movies = require("./models/movies");
const movieRouter = require("./routers/movies");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀🚀🚀");
});

app.use("/api", movieRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
