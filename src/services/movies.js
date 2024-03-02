"use strict";

// const movies = require("../models/movies");
const axios = require("axios");

// const movieData = movies.results;
// const movieList = movieData
//   .filter((movie) => {
//     return (
//       Object.hasOwn(movie, "title") &&
//       movie.title.toLowerCase().includes(keyword.toLowerCase())
//     );
//   })

const getMoviesByPopularity = async (keyword) => {
  try {
    const movieData = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          //TOFIX: api_key: process.env.API_KEY,
          //Invalid API key: You must be granted a valid key.
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
          query: `${keyword}`,
        },
      }
    );
    // console.log(movieData.data.results);
    const movieList = movieData.data.results;
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

    if (movies.length === 0) {
      throw new Error(`404| Movie with keyword ${keyword} not found`);
    }
    console.log(movies);
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
    const movieData = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
          query: `${keyword}`,
        },
      }
    );
    const movieList = movieData.data.results;
    const movies = movieList
      .sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      })
      .map((movie) => {
        return {
          release_date: movie.release_date,
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        };
      });

    if (movieList.length === 0) {
      throw new Error(`404| Movie with keyword ${keyword} not found`);
    }
    console.log(movieList);
    return movieList;
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
    const movieData = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
          query: `${keyword}`,
        },
      }
    );
    const movieList = movieData.data.results;
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

    if (movieList.length === 0) {
      throw new Error(`404| Movie with keyword ${keyword} not found`);
    }
    console.log(movieList);
    return movieList;
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
    const movieResult = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "af447d18d0e78ad5081bd6c922e352b6",
        },
      }
    );
    console.log(id);
    console.log(movieResult.data);
    //TOFIX: results are printed in the console, but not in the response
    const movie = movieResult.data;
    return movie;
  } catch (err) {
    if (err.response?.status === 400) {
      throw new Error(
        `${err.response.status}|${err.response.data.error.message}`
      );
    }
    throw err;
  }
};
// const movieData = movies.results;
// const movie = movieData.find((movie) => movie.id === id);
// if (!movie) {
//   throw new Error(`404| Movie with id ${id} not found`);
// }

const getMeta = async () => {};
// TODO:

module.exports = {
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesByVote,
  getMovieById,
  getMeta,
};
