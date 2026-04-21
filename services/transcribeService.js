const axios = require("axios");
const fs = require("fs");

async function uploadAudio(filePath) {
  const response = await axios({
    method: "post",
    url: "https://api.assemblyai.com/v2/upload",
    headers: {
      authorization: process.env.ASSEMBLYAI_API_KEY
    },
    data: fs.createReadStream(filePath)
  });

  return response.data.upload_url;
}

async function transcribeAudio(filePath) {
  const uploadUrl = await uploadAudio(filePath);

  const transcriptRes = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    {
      audio_url: uploadUrl
    },
    {
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY
      }
    }
  );

  const id = transcriptRes.data.id;

  // Polling
  while (true) {
    const polling = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY
        }
      }
    );

    if (polling.data.status === "completed") {
      return polling.data.text;
    }

    if (polling.data.status === "error") {
      throw new Error("Transcription failed");
    }

    await new Promise(res => setTimeout(res, 3000));
  }
}

module.exports = { transcribeAudio };