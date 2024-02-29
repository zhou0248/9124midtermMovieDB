"use strict";

const { Router } = require("express");
const moviesController = require("../controllers/moviesController");
const moviesRouter = Router();

// getAll
moviesRouter.get("/popularity", moviesController.byPopularity);
moviesRouter.get("/release-date", moviesController.byReleaseDate);
moviesRouter.get("/vote", moviesController.byVote);

//getOne caching
moviesRouter.get("/id/:id", moviesController.byId);

moviesRouter.get("/meta", moviesController.byMetaData);

module.exports = moviesRouter;
