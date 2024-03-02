// const axios = require("axios");

// const getMovies = async () => {
//   const response = await axios.get(
//     // "https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=af447d18d0e78ad5081bd6c922e352b6"
//     "https://api.themoviedb.org/3/search/movie",
//     {
//       params: {
//         api_key: "af447d18d0e78ad5081bd6c922e352b6",
//         query: "night shift",
//       },
//     }
//   );
//   console.log("\n\n", response.status, "\n\n", response.data.results);
//   //response.status(200)
// };

const axios = require("axios");
//const cacheService = require("./cacheService");
const redisService = require("./src/services/redisService");

const getMovies = async (keyword) => {
  // const cachedMovie = await redisService.getMovies(keyword);
  // if (cachedMovie) {
  //   console.log("Movie found in cache");
  //   return cachedMovie;
  // }
  try {
    console.log("Looking up from the Movie DB");
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          key: process.env.API_KEY,
          q: "night",
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

getMovies();
