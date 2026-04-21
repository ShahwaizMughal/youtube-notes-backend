const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function summarizeChunk(chunk) {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Extract key study points only."
      },
      {
        role: "user",
        content: chunk
      }
    ]
  });

  return res.choices[0].message.content;
}

async function generateFinalNotes(text) {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Create structured study notes."
      },
      {
        role: "user",
        content: text
      }
    ]
  });

  return res.choices[0].message.content;
}

async function processChunks(chunks) {
  const summaries = [];

  for (let chunk of chunks) {
    const s = await summarizeChunk(chunk);
    summaries.push(s);
  }

  return await generateFinalNotes(summaries.join("\n"));
}

module.exports = { processChunks };