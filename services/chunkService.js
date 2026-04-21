function chunkText(text, maxWords = 1200) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }

  return chunks;
}

module.exports = { chunkText };