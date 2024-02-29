"use strict";

const movies = require("../models/movies");

const getMoviesByKeyword = (req, res) => {
  const keyword = req.query.keyword;
  const movieData = movies.results;
  const movieList = movieData
    .filter((movie) => {
      return Object.hasOwn(movie, "title") && movie.title.includes(keyword);
    })
    .map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };
    });

  if (movieList.length === 0) {
    res
      .status(404)
      .json({ error: { message: `Movie with keyword ${keyword} not found` } });
    return;
  }
  res.json({ data: movieList });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.results.find((movie) => movie.id === id);
  if (!movie) {
    res
      .status(404)
      .json({ error: { message: `Movie with id ${id} not found` } });
    return;
  }
  res.json({ data: movie });
};

module.exports = {
  getMoviesByKeyword,
  getMovieById,
};
