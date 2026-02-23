import express from "express";
import axios from "axios";
import multer from "multer";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/* ===========================
   CHAT API (OLLAMA)
=========================== */

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",  // or llama3
        prompt: message,
        stream: false
      }
    );

    res.json({ reply: response.data.response });

  } catch (error) {
    console.error("Ollama Error:", error.message);
    res.status(500).json({ reply: "⚠️ Ollama not running." });
  }
});

/* ===========================
   FILE UPLOAD + EXPLAIN
=========================== */

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ reply: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(req.file.path, "utf8");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt: `Explain this file content clearly:\n\n${fileContent}`,
        stream: false
      }
    );

    fs.unlinkSync(req.file.path);

    res.json({ reply: response.data.response });

  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ reply: "⚠️ File processing failed." });
  }
});

export default router;