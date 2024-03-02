const axios = require("axios");
//const cacheService = require("./cacheService");
const redisService = require("./redisService");

const getMovies = async (keyword) => {
  const cachedMovie = await redisService.getMovies(keyword);
  if (cachedMovie) {
    console.log("Movie found in cache");
    return cachedMovie;
  }
  try {
    console.log("Looking up from the Movie DB");
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          key: process.env.API_KEY,
          q: keyword,
        },
      }
    );

    const movie = {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
    };

    // redisService.setWeather(city, startTime, weather);

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

module.exports = {
  getMovies,
};
