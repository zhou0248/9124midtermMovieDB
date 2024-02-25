const { Router } = require("express");
const moviesController = require("../controllers/moviesController");
const moviesRouter = Router();

moviesRouter.get("/popularity", moviesController.popularity);
moviesRouter.get("/release-date", moviesController.releaseDate);
moviesRouter.get("/vote", moviesController.vote);
moviesRouter.get("/id/:id", moviesController.id);
moviesRouter.get("/meta", moviesController.meta);

module.exports = moviesRouter;
