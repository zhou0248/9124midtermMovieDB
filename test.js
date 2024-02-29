const axios = require("axios");

const getMovies = async () => {
  const response = await axios.get(
    // "https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=af447d18d0e78ad5081bd6c922e352b6"
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: "af447d18d0e78ad5081bd6c922e352b6",
        query: "night shift",
      },
    }
  );
  console.log("\n\n", response.status, "\n\n", response.data.results);
  //response.status(200)
};

getMovies();
