"use strict";

const { Router } = require("express");
const movieController = require("../controllers/movies");
const movies = require("../models/movies");
const movieRouter = Router();

movieRouter.get("/popularity", movieController.getMoviesByPopularity);
movieRouter.get("/release-date", movieController.getMoviesByReleaseDate);
movieRouter.get("/vote", movieController.getMoviesByVote);
movieRouter.get("/id/:id", movieController.getMovieById);
movieRouter.get("/meta", movieController.getMeta);

module.exports = movieRouter;
