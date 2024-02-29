"use strict";

const express = require("express");
require("dotenv/config");
const cors = require("cors");
const moviesRouter = require("./routers/moviesRouter");
const redisService = require("./services/redisService");
redisService.init();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", moviesRouter);

app.get("/", (req, res) => {
  res.send("Server running 🚀🚀🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(
  "\nREDIS_URL",
  process.env.REDIS_URL,
  "\n\napi_key",
  process.env.API_KEY,
  "\n"
);
