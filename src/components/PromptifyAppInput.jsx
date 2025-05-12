import { useState } from "react";

function PromptInput({ onResult }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
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
    </div>
  );
}

export default PromptInput;