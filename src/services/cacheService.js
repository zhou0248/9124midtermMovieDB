const CACHE = {};

const encodeKey = (keyword) => `${keyword}`;

const get = (keyword) => CACHE[encodeKey(keyword)];

const set = (keyword) => {
  CACHE[encodeKey(keyword)] = movie;
};

module.exports = {
  get,
  set,
};
