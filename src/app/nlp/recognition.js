const { NlpManager } = require("node-nlp");

const sentences = require("./sentences.json");
const manager = new NlpManager({ languages: ["pt"] });

async function bootstrap() {
  for (const { sentence, intent } of sentences) {
    manager.addDocument("pt", sentence, intent);
  }

  await manager.train();
}

bootstrap();

module.exports = { recognitionAPI: manager };
