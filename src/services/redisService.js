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

const set = (key, value) => {
  client.set(key, JSON.stringify(value));
};

const encodeKey = (id) => `${id}`;

const getMovie = async (id) => {
  const movie = await get(encodeKey(id));
  return movie;
};

const setMovie = (id, data) => {
  set(encodeKey(id), data);
};

module.exports = {
  init,
  get,
  set,
  getMovie,
  setMovie,
};
