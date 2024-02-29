"use strict";

const express = require("express");
const movieRouter = require("./routers/movies");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀🚀🚀");
});

app.use("/api/movies", movieRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
