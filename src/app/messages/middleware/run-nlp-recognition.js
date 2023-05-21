const { recognitionAPI } = require("../../nlp/recognition");

async function runNlpRecognition(messagePayload) {
  const recognition = await recognitionAPI.process(messagePayload.message.body);
  Object.assign(messagePayload.context, { recognition });
  return messagePayload;
}

module.exports = { runNlpRecognition };
