import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "No input provided" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // puedes cambiar a gpt-4 si tienes acceso
      messages: [
        {
          role: "system",
          content: "Eres un generador de prompts para asistentes de inteligencia artificial. Tu tarea es transformar ideas generales en prompts bien estructurados, claros y específicos.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0.7,
    });

    const prompt = response.choices[0].message.content;
    res.json({ prompt });
  } catch (error) {
    console.error("Error al generar prompt:", error);
    res.status(500).json({ error: "Error al generar prompt" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});