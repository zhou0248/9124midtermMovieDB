const walks = require("../models/walks");
const weatherService = require("./weatherService");

const create = async (body) => {
  const { startTime, endTime, city } = body;
  const id = Date.now();

  if (!startTime || !endTime || !city) throw new Error("400|Invalid input");

  const weather = await weatherService.getWeather(city, startTime);

  const newWalk = {
    id,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    city,
    weather,
  };
  walks.push(newWalk);

  return newWalk;
};

const getAll = () => walks;
