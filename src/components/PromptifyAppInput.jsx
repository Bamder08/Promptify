import { useState } from "react";
import { getRemainingUses, incrementUsage } from "../utils/usageLimiter"; // ajusta el path si es necesario

function PromptInput({ onResult, selectedModel }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const handleGenerate = async () => {
    const remaining = getRemainingUses();

    if (remaining <= 0) {
      if (remaining <= 0) {
        setLimitReached(true);
        return;
      }

      return;
    }

    if (!input.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          model: selectedModel, // 👈 enviamos el modelo elegido
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        onResult(data.error || "Error inesperado.");
        return;
      }

      incrementUsage();
      onResult(data.prompt);
    } catch (error) {
      console.error("Error generando prompt:", error);
      onResult("Hubo un error al generar el prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 max-w-3xl mx-auto">
      <textarea
        className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-600 mb-4 resize-none focus:outline-none"
        rows="5"
        placeholder="Describe lo que quieres lograr con tu IA..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
        disabled={loading}
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

export default PromptInput;
