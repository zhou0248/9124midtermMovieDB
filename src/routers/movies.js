"use strict";

const { Router } = require("express");
const movieController = require("../controllers/movies");
const movies = require("../models/movies");
const movieRouter = Router();

// movieRouter.route("/popularity").get(movieController.getMoviesByPopularity);
// movieRouter.route("/release-date").get(movieController.getMoviesByReleaseDate);
// movieRouter.route("/vote").get(movieController.getMoviesByVote);
// movieRouter.route("/id/:id").get(movieController.getMovieById);
// movieRouter.route("/meta").get(movieController.getMeta);
movieRouter.get("/popularity", movieController.getMoviesByPopularity);
movieRouter.get("/release-date", movieController.getMoviesByReleaseDate);
movieRouter.get("/vote", movieController.getMoviesByVote);
movieRouter.get("/id/:id", movieController.getMovieById);
movieRouter.get("/meta", movieController.getMeta);

module.exports = movieRouter;
