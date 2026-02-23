import express from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// Multer Config (limit size)
// -----------------------------
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* ===========================
   HEALTH CHECK
=========================== */
app.get("/", (req, res) => {
  res.send("✅ AI Study Backend Running");
});

/* ===========================
   CHAT API (OLLAMA)
=========================== */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",  // change to llama3 if needed
        prompt: message,
        stream: false,
      },
      { timeout: 60000 }
    );

    return res.json({
      reply: response.data.response
    });

  } catch (error) {
    console.error("Ollama Error:", error.message);

    return res.status(500).json({
      reply: "⚠️ Ollama not running. Start using: ollama run mistral"
    });
  }
});

/* ===========================
   FILE UPLOAD + EXPLAIN
=========================== */
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ reply: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt: `Explain this file content clearly:\n\n${fileContent}`,
        stream: false,
      },
      { timeout: 60000 }
    );

    fs.unlinkSync(filePath);

    return res.json({
      reply: response.data.response
    });

  } catch (error) {
    console.error("File Error:", error.message);

    return res.status(500).json({
      reply: "⚠️ File processing failed."
    });
  }
});

/* ===========================
   SERVER START
=========================== */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});