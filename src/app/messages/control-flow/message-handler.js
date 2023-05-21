const { ignoreSelfMessage, runNlpRecognition } = require("../middleware");
const { transcribeAudio, suggestRecipe } = require("../../bot/actions");

const preProcessors = [ignoreSelfMessage, runNlpRecognition];
const actions = [transcribeAudio, suggestRecipe]

async function onError(error, { message }) {
  await message.reply(`Deu ruim aqui: ${error}`);
}

function catchError(targetHandler, errorHandler) {
  return async function (...args) {
    try {
      await targetHandler(...args);
    } catch (error) {
      await errorHandler(error, ...args);
    }
  };
}

function pipeline(...funcs) {
  return async function (payload) {
    let valueToProcess = payload;
    for (let func of funcs) {
      const processedValue = await func(valueToProcess);
      if (processedValue) {
        valueToProcess = processedValue;
      } else {
        break;
      }
    }
  };
}

function runMessageActions(...actions) {
  return async function runActions(messagePayload) {
    for (const action of actions) {
      if (await action.match(messagePayload)) {
        await action.execute(messagePayload);
      }
    }

    return messagePayload;
  };
}

async function messageHandler(messagePayload) {
  const process = pipeline(...preProcessors, runMessageActions(...actions));
  const runSafely = catchError(process, onError);
  await runSafely(messagePayload);
}

module.exports = { messageHandler };
