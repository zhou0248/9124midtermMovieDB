"use strict";

const express = require("express");
const movies = require("./models/movies");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀🚀🚀");
});

// get movies by keyword
app.get("/api/", (req, res) => {
  const keyword = req.query.keyword;
  const movieData = movies.results;
  const movieList = movieData
    .filter((movie) => {
      return (
        Object.hasOwn(movie, "title") &&
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };
    });

  if (movieList.length === 0) {
    res.status(404).json({
      error: { message: `Movie with keyword ${keyword} not found` },
    });
    return;
  }
  res.json({ data: movieList });
});

// get movie by id
app.get("/api/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.results.find((movie) => movie.id === id);
  if (!movie) {
    res
      .status(404)
      .json({ error: { message: `Movie with id ${id} not found` } });
    return;
  }
  res.json({ data: movie });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
