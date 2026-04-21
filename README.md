# 📚 YouTube Study Notes Generator

A backend service built with **Node.js & Express** that takes a YouTube video URL, extracts its content, and generates **structured study notes** using AI.

---

## 🚀 Features

* 🎥 Extracts **captions from YouTube videos**
* 🔁 Fallback to **audio transcription** if captions are unavailable
* 🧠 Uses AI to generate **structured study notes**
* ✂️ Handles long videos with **chunk-based processing**
* ⚡ Fast AI inference using Groq
* 🔐 **Rate limiting** for API protection
* 🧹 Automatic cleanup of temporary files

---

## 🧠 How It Works

```
YouTube URL
   ↓
Check captions
   ↓
If captions exist → use them
Else → download audio → transcribe (AssemblyAI)
   ↓
Chunk transcript
   ↓
Summarize each chunk (Groq)
   ↓
Generate final structured notes
```

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **AI (Notes Generation):** Groq API
* **Speech-to-Text:** AssemblyAI
* **YouTube Captions:** youtube-transcript
* **Other:** Axios, Rate Limiting

---

## 📁 Project Structure

```
/src
  /controllers
  /services
  /middlewares
  /routes
/temp
.env
server.js
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/yt-notes-backend.git
cd yt-notes-backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
```

---

### 4. Run Server

```bash
node server.js
```

Server will start at:

```
http://localhost:3000
```

---

## 📡 API Usage

### Generate Notes

**Endpoint:**

```
POST /api/notes/generate
```

**Request Body:**

```json
{
  "url": "https://youtube.com/your-video-link"
}
```

---

### Response

```json
{
  "source": "captions",
  "notes": "Structured study notes..."
}
```

**source values:**

* `"captions"` → Used YouTube subtitles
* `"audio"` → Used audio transcription

---

## ⚠️ Limitations

* ⏳ Long videos may take time (30–60 seconds)
* 📉 Free API tiers have usage limits
* 🎧 Audio transcription depends on external API availability

---

## 🔐 Security Features

* Rate limiting (prevents abuse)
* Input validation
* Temporary file cleanup

---

## 🚀 Future Improvements

* 🔄 Background job processing (BullMQ + Redis)
* 💾 Database integration (MongoDB)
* ⚡ Caching for faster responses
* 🎨 Frontend UI (React)
* 📄 Export notes as PDF

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

---
