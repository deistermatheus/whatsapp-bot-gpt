const { Client, RemoteAuth, LocalAuth } = require("whatsapp-web.js");
const { MongoStore } = require("wwebjs-mongo");

const env = require("../../config/env");
const MongoDB = require("./../database/mongodb");

class Whatsapp {
  static createClient() {
    const store = new MongoStore({ mongoose: MongoDB.mongooseDriver });
    const authStrategy =
      env.get("ENVIRONMENT") === "dev"
        ? new LocalAuth()
        : new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000,
          });

    const client = new Client({
      authStrategy,
    });

    return client;
  }
}

module.exports = Whatsapp;
