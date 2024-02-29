"use strict";

const { movies } = require("../models/movies");
const moviesService = require("../services/moviesService");

const errorHandler = (err) => {
  const [statusCode, message] = err.message?.split("|");
  const status = parseInt(statusCode);
  if (isNaN(status)) {
    console.log(err);
    return { status: 500, message: "Internal Server Error" };
  }
  return { status, message };
};

const byPopularity = (req, res) => {
  try {
    const movies = moviesService.byPopularity();
    res.json({ data: movies });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: { message } });
  }
};

const byReleaseDate = (req, res) => {
  try {
    const movies = moviesService.byReleaseDate();
    res.json({ data: movies });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: { message } });
  }
};

const byVote = (req, res) => {
  try {
    const movies = moviesService.byVote();
    res.json({ data: movies });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: { message } });
  }
};

const byId = (req, res) => {
  const id = req.params.id;
  try {
    const movie = moviesService.byId(id);
    res.json({ data: movie });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: { message } });
  }
};

const byMetaData = (req, res) => {
  try {
    const metadata = moviesService.byMetaData();
    res.json({ data: metadata });
  } catch (err) {
    const { status, message } = errorHandler(err);
    res.status(status).json({ error: { message } });
  }
};

module.exports = {
  byPopularity,
  byReleaseDate,
  byVote,
  byId,
  byMetaData,
};
