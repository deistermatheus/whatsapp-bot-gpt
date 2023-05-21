require("dotenv").config();

// const HttpServer = require("./drivers/http/server");
// const MongoDB = require("./drivers/database/mongodb");
const Whatsapp = require("./drivers/whatsapp/connection");

const { handleQR } = require("./drivers/whatsapp/events/qr");
// const createUserModel = require("./app/users/user.model");
const {
  messageHandler,
} = require("./app/messages/control-flow/message-handler");

async function runApp() {
  // await MongoDB.start();
  // const User = createUserModel(MongoDB.mongooseDriver);
  // //await User.create({phone: '124356789', isAdmin: false})
  // const user = await User.findOne({});
  // console.log(user);
  const client = Whatsapp.createClient();

  const appContext = { client };

  client.on("qr", handleQR);
  client.on("message", async (message) => {
    console.log("message received!");
    await messageHandler({ context: appContext, message });
  });

  client.on("error", (error) => console.error(error));

  client.once("ready", () => console.log("OK!"));

  await client.initialize();

  //httpServer.start();
}

runApp();
