async function ignoreSelfMessage(messagePayload) {
  if (!messagePayload.message.fromMe) {
    return messagePayload;
  }
}

module.exports = { ignoreSelfMessage };
