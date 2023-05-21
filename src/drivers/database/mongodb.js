const mongoose = require("mongoose");
const env = require("../../config/env");

const mongoAPI = {
  mongooseDriver: mongoose,
  start: initDatabase,
};

async function initDatabase() {
  await mongoose.connect(env.get("MONGO_URI"));
}

module.exports = mongoAPI;
