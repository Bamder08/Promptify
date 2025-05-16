import { useState } from "react";
import { getRemainingUses, incrementUsage } from "../utils/usageLimiter";

function PromptifyAppInput({ onResult, selectedModel, setInput }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const remaining = getRemainingUses();

    if (remaining <= 0) {
      setLimitReached(true);
      return;
    }

    if (!inputText.trim()) {
      setError("Por favor escribe una descripción.");
      return;
    }

    setLoading(true);
    setError("");
    setInput(inputText); // Guarda en App para historial

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText, model: selectedModel }),
      });

      const data = await response.json();

      // Si falla, construimos un mensaje manual
      if (!response.ok || !data.prompt) {
        throw new Error(data.error || `Error ${response.status}`);
      }

      incrementUsage();
      onResult(data.prompt); // ✅ se guardará como antes
    } catch (err) {
      console.warn("Falla API, guardando con mensaje de error…");
      const fallback =
        "⚠️ No se pudo generar el prompt porque se alcanzó el límite gratuito.";
      onResult(fallback); // ⬅️ texto que sí se guarda en Firestore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 max-w-3xl mx-auto">
      <label
        htmlFor="prompt-text"
        className="block text-sm mb-2 font-medium text-gray-300"
      >
        Describe lo que quieres lograr con tu IA
      </label>
      <textarea
        id="prompt-text"
        name="prompt"
        aria-label="Prompt para generar"
        className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-600 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        placeholder="Ejemplo: Quiero un prompt para una rutina de gym 5 días a la semana"
        maxLength={300}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          if (error) setError("");
        }}
      />
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loading ? "Generando..." : "Generar Prompt"}
      </button>

      {limitReached && (
        <p className="mt-4 text-red-400 font-medium text-center">
          Has alcanzado el límite gratuito de hoy. Intenta nuevamente mañana.
        </p>
      )}
    </div>
  );
}

export default PromptifyAppInput;
