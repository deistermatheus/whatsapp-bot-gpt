const express = require("express");
const env = require("../../config/env");

const server = express();

server.use(express.json());

server.get("/health", async (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = {
  instance: server,
  start: () =>
    server.listen(env.get("HTTP_PORT"), () =>
      console.log(`http server started: ${new Date().toLocaleString()}`)
    ),
};
