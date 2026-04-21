const { YoutubeTranscript } = require("youtube-transcript");

async function getCaptions(url) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    return transcript.map(t => t.text).join(" ");
  } catch {
    return null;
  }
}

module.exports = { getCaptions };