/* eslint-disable no-undef */
const appConfig = {
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/gepeto",
  ENVIRONMENT: process.env.ENVIRONMENT ?? "dev",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  HTTP_PORT: process.env.HTTP_PORT ?? 8080,
};

function get(key) {
  return appConfig[key];
}

module.exports = { get };
