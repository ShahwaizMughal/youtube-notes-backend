require("dotenv").config();
const express = require("express");
const limiter = require("./middleware/rateLimiter");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

app.use(express.json());

// Rate limit
app.use("/api", limiter);

// Routes
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));