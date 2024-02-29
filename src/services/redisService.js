"use strict";

const redis = require("redis");

let client;

const init = async () => {
  client = await redis
    .createClient({
      url: process.env.REDIS_URL,
    })
    .on("error", (error) => console.error(error))
    .on("connect", () => console.log("Connected to Redis"))
    .connect();
};

const get = async (key) => {
  const value = await client.get(key);
  return JSON.parse(value);
};

// const set = (key, value) => {
//   client.set(key, JSON.stringify(value), {
//     EX: 60 * 5,
//   });
// };

const encodeKey = (keyword) => `${keyword}`;

const getMovies = async (keyword) => {
  const movies = await get(encodeKey(keyword));
  return movies;
};

// const setWeather = (city, startTime, weather) => {
//   set(encodeKey(city, startTime), weather);
// };

module.exports = {
  init,
  getMovies,
};
