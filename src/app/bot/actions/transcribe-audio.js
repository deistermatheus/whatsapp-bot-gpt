const { Buffer } = require("buffer");
const { Readable } = require("stream");
const OpenAI = require("../../../app/openai/api");
const FFMPeg = require("../../../lib/ffmpeg");

// eslint-disable-next-line no-unused-vars
async function transcribeAudio(messagePayload) {
  const { message } = messagePayload
  const quotedMessage = await message.getQuotedMessage();
  const { data } = await quotedMessage.downloadMedia();
  const convertedAudioStream = getAudioAsMp3Stream(data);

  // workaround bug in OpenAI node.js SDK, it expects the read stream to have a path to validate it on their side
  const assignProp = (target, path, value) => {
    target[path] = value;
  };

  assignProp(convertedAudioStream, "path", "test.mp3");

  const {
    data: { text },
  } = await OpenAI.createTranscription(convertedAudioStream, "whisper-1");

  if (text) {
    await quotedMessage.reply(text);
  }
}

function isTranscriptionRequest({ context }) {
  return context.recognition?.intent === "transcribe";
}

function hasQuotedMessage({message}){
  return message.hasQuotedMsg
}

function isValidTranscriptionRequest(messagePayload){
  return isTranscriptionRequest(messagePayload) && hasQuotedMessage(messagePayload)
}

function getAudioAsMp3Stream(data) {
  const audioBuffer = Buffer.from(data, "base64");
  const readStream = Readable.from(audioBuffer);
  const convertedAudioStream = FFMPeg.convertStreamToTargetFormat(
    readStream,
    "mp3"
  );
  return convertedAudioStream;
}

module.exports = { execute: transcribeAudio, match: isValidTranscriptionRequest };
