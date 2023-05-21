const OpenAI = require("../../../app/openai/api");

// eslint-disable-next-line no-unused-vars
async function suggestRecipe(messagePayload) {
  const { message } = messagePayload
  const recipePrompt = message.body

  const { data } = await OpenAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: recipePrompt}],
  })

  if (data.choices?.length) {
    await message.reply(data.choices[0].message.content);
  }
}

function isRecipeSuggestionRequest({ context }) {
  return context.recognition?.intent === "cook";
}


module.exports = { execute: suggestRecipe, match: isRecipeSuggestionRequest };
