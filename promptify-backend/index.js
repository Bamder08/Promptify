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
  const { input, model } = req.body;
  console.log("Modelo recibido:", model);

  if (!input) {
    return res.status(400).json({ error: "No input provided" });
  }

  const allowedModels = ["gpt-3.5-turbo", "gpt-4"];
  if (!allowedModels.includes(model)) {
    return res.status(400).json({ error: "Modelo no permitido" });
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "Eres un generador de prompts para asistentes de inteligencia artificial. Tu tarea es transformar ideas generales en prompts bien estructurados, claros y específicos.",
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

  const status = error?.status || 500;

  res.status(status).json({
    error:
      status === 429
        ? "Has alcanzado el límite de uso. Intenta mañana."
        : "Error al generar prompt. Intenta nuevamente.",
  });
}
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});