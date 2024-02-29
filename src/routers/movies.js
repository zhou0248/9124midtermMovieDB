"use strict";

const { Router } = require("express");
const movieController = require("../controllers/movies");
const movies = require("../models/movies");
const movieRouter = Router();

movieRouter.get("/key", movieController.getMoviesByKeyword);
movieRouter.get("/:id", movieController.getMovieById);

// movieRouter.route("/").get(movieController.getMoviesByKeyword);
// movieRouter.route("/:id").get(movieController.getMovieById);

module.exports = movieRouter;
