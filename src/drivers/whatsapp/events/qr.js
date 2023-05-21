const env = require("../../../config/env");
const QR = require("qrcode-terminal");

function handleQR(qr) {
  if (env.get("ENVIRONMENT") === "dev") {
    QR.generate(qr, { small: true });
  } else {
    // save somewhere
  }
}

module.exports = { handleQR, eventKey: "qr" };
