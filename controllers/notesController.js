const { getCaptions } = require("../services/transcriptService");
const { downloadAudio } = require("../services/audioService");
const { transcribeAudio } = require("../services/transcribeService");
const { chunkText } = require("../services/chunkService");
const { processChunks } = require("../services/aiService");

const fs = require("fs");

exports.generateNotes = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    let text = "";
    let source = "";

    // 1. Captions first
    const captions = await getCaptions(url);

    if (captions) {
      text = captions;
      source = "captions";
    } else {
      // 2. Fallback → audio
      const filePath = await downloadAudio(url);
      text = await transcribeAudio(filePath);
      source = "audio";

      fs.unlinkSync(filePath);
    }

    // 3. Chunking
    const chunks = chunkText(text);
    console.log(text);
    

    // 4. AI processing
    const notes = await processChunks(chunks);

    res.json({ source, notes });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};