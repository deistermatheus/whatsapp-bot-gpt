const ffmpeg = require("fluent-ffmpeg");

class FFMpeg {
  static convertStreamToTargetFormat(mediaStream, format) {
    return ffmpeg()
      .input(mediaStream)
      .toFormat(format)
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
        throw err;
      })
      .pipe();
  }
}

module.exports = FFMpeg;
