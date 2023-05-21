const { Configuration, OpenAIApi } = require("openai");
const env = require("../../config/env");

const configuration = new Configuration({
  apiKey: env.get("OPENAI_API_KEY"),
});

const openAIApiInstance = new OpenAIApi(configuration);

module.exports = openAIApiInstance;
