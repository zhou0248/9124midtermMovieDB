"use strict";

// const movies = require("../models/movies");
const axios = require("axios");

const getMoviesByPopularity = async (keyword) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.API_KEY,
          query: keyword,
        },
      }
    );
    const movieList = data.results;
    // console.log(movieList);

    //TOFIX: empty movieList is not handled properly
    // if (movieList.length === 0) {
    //   throw new Error(`404| Movie with keyword ${keyword} not found`);
    // }

    // without this line, I get an empty data array
    // with this line, "Error: socket hang up" in postman
    // and the following error in the console
    // node:internal/errors:496
    // ErrorCaptureStackTrace(err);
    // RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined

    const movies = movieList
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
    return movies;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};

const getMoviesByReleaseDate = async (keyword) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
          query: keyword,
        },
      }
    );
    const movieList = data.results;

    if (movieList.length === 0) {
      throw new Error(`404| Movie with keyword ${keyword} not found`);
    }

    const movies = movieList
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
    return movies;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};

const getMoviesByVote = async (keyword) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
          query: keyword,
        },
      }
    );
    const movieList = data.results;

    if (movieList.length === 0) {
      throw new Error(`404| Movie with keyword ${keyword} not found`);
    }

    const movies = movieList
      .sort((a, b) => {
        return b.vote_average - a.vote_average;
      })
      .map((movie) => {
        return {
          vote: movie.vote_average,
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        };
      });
    return movies;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};

const getMovieById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
        },
      }
    );
    // console.log(id);
    return data;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};

const getMeta = async () => {};
// TODO:

module.exports = {
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesByVote,
  getMovieById,
  getMeta,
};
