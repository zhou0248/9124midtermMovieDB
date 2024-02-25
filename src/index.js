"use strict";

const express = require("express");
require("dotenv/config");
const cors = require("cors");
const movies = require("./routers/moviesRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", moviesRouter);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
