"use strict";

const movies = require("../models/movies");

const getMoviesByPopularity = (keyword) => {
  // keyword is not successfully passed to the function
  const movieData = movies.results;
  const movieList = movieData
    .filter((movie) => {
      return (
        Object.hasOwn(movie, "title") &&
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .sort((a, b) => {
      return b.popularity - a.popularity;
    })
    .map((movie) => {
      return {
        // popularity: movie.popularity,
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };
    });

  if (movieList.length === 0) {
    throw new Error(`404| Movie with keyword ${keyword} not found`);
  }
  return movieList;
};

const getMoviesByReleaseDate = (keyword) => {
  const movieData = movies.results;
  const movieList = movieData
    .filter((movie) => {
      return (
        Object.hasOwn(movie, "title") &&
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    })
    .map((movie) => {
      return {
        // release_date: movie.release_date,
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };
    });

  if (movieList.length === 0) {
    throw new Error(`404| Movie with keyword ${keyword} not found`);
  }
  return movieList;
};

const getMoviesByVote = (keyword) => {
  const movieData = movies.results;
  const movieList = movieData
    .filter((movie) => {
      return (
        Object.hasOwn(movie, "title") &&
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .sort((a, b) => {
      return b.vote_average - a.vote_average;
    })
    .map((movie) => {
      return {
        // vote: movie.vote_average,
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      };
    });

  if (movieList.length === 0) {
    throw new Error(`404| Movie with keyword ${keyword} not found`);
  }
  return movieList;
};

const getMovieById = (id) => {
  const movieData = movies.results;
  const movie = movieData.find((movie) => movie.id === id);
  if (!movie) {
    throw new Error(`404| Movie with id ${id} not found`);
  }
  return movie;
};

const getMeta = () => {};

module.exports = {
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesByVote,
  getMovieById,
  getMeta,
};
