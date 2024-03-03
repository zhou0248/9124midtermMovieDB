"use strict";

const movies = require("../models/movies");
const movieService = require("../services/movies");

const errorHandler = (err) => {
  const [statusCode, message] = err.message?.split("|");
  const status = Number(statusCode);
  if (isNaN(status)) {
    return { status: 500, message: `${err}` };
  }
  return {
    statusCode,
    message,
  };
};

const getMoviesByPopularity = async (req, res) => {
  try {
    if (!req.query.keyword) {
      throw new Error("Keyword is required");
    }
    const movieList = await movieService.getMoviesByPopularity(
      req.query.keyword
    );
    res.status(200).json({ data: movieList });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: message });
  }
};

const getMoviesByReleaseDate = async (req, res) => {
  try {
    if (!req.query.keyword) {
      throw new Error("Keyword is required");
    }
    const movieList = await movieService.getMoviesByReleaseDate(
      req.query.keyword
    );
    res.status(200).json({ data: movieList });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: message });
  }
};

const getMoviesByVote = async (req, res) => {
  try {
    if (!req.query.keyword) {
      throw new Error("Keyword is required");
    }
    const movieList = await movieService.getMoviesByVote(req.query.keyword);
    res.status(200).json({ data: movieList });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: message });
  }
};

const getMovieById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Movie ID is required");
    }
    const id = parseInt(req.params.id);
    const movie = await movieService.getMovieById(id);
    res.status(200).json({ data: movie });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: message });
  }
};

const getMeta = async (req, res) => {
  try {
    const meta = await movieService.getMeta();
    res.status(200).json({ meta: meta });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: message });
  }
};

module.exports = {
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesByVote,
  getMovieById,
  getMeta,
};
