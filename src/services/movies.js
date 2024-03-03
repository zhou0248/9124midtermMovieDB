"use strict";

// const movies = require("../models/movies");
const axios = require("axios");
const redisService = require("./redisService");

//TODO: better error handling
const getMoviesByPopularity = async (keyword) => {
  if (!keyword) {
    throw new Error("Keyword is required");
  }

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
    // console.log(movieList.length);

    if (movieList.length === 0) {
      throw new Error(`Movie with keyword '${keyword}' not found`);
    }

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
  if (!keyword) {
    throw new Error("Keyword is required");
  }
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

    if (movieList.length === 0) {
      throw new Error(`Movie with keyword '${keyword}' not found`);
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
  if (!keyword) {
    throw new Error("Keyword is required");
  }
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

    if (movieList.length === 0) {
      throw new Error(`Movie with keyword '${keyword}' not found`);
    }

    const movies = movieList
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
  if (!id) {
    throw new Error("Movie ID is required");
  }
  const cachedMovie = await redisService.getMovie(id);
  if (cachedMovie) {
    console.log("Movie found in cache");
    return cachedMovie;
  }
  try {
    console.log("Searching for movie");
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    // console.log(id);
    // console.log(data);
    if (!data.id || data.id !== id) {
      throw new Error(`Movie with ID '${id}' not found`);
    }
    redisService.setMovie(id, data);
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

const getMeta = async () => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/configuration",
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    console.log(data);
    const metaData = {
      images: {
        baseUrl: data.images.base_url,
        sizes: data.images.poster_sizes,
      },
    };
    return metaData;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};

module.exports = {
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesByVote,
  getMovieById,
  getMeta,
};
