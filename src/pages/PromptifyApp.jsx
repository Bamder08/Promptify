import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptInput from "../components/PromptifyAppInput"; 

function PromptifyApp() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
      >
        ← Volver al inicio
      </button>

      <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 text-center">
        Generador de Prompts de IA
      </h1>

      <PromptInput onResult={setResult} />

      {result && (
        <div className="bg-gray-900 p-6 rounded-xl max-w-3xl mx-auto mt-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-green-400">Prompt generado:</h2>
          <p className="text-gray-200 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}

export default PromptifyApp;