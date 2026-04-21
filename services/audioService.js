const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

async function downloadAudio(url) {
  const filePath = path.join("temp", `audio-${Date.now()}.mp3`);

  return new Promise((resolve, reject) => {
    ytdl(url, { filter: "audioonly" })
      .pipe(fs.createWriteStream(filePath))
      .on("finish", () => resolve(filePath))
      .on("error", reject);
  });
}

module.exports = { downloadAudio };