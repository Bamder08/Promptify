import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptInput from "../components/PromptifyAppInput";
import ModelSelector from "../components/ModelSelector";
import Sidebar from "../components/Sidebar";
import { saveConversation } from "../utils/historyManager";
import { v4 as uuidv4 } from "uuid";

function PromptifyApp() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleResult = (output) => {
    setResult(output);

    // Guardar nueva conversación
    saveConversation({
      id: uuidv4(),
      date: new Date().toISOString(),
      input,
      output,
      model: selectedModel,
    });
  };

  return (
    <div className="flex">
      {/* Sidebar estilo ChatGPT */}
      <Sidebar onSelectConversation={setSelectedConversation} />

      {/* Área principal */}
      <main className="flex-1 min-h-screen bg-[#0f172a] text-white p-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
        >
          ← Volver al inicio
        </button>

        <ModelSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 text-center">
          Generador de Prompts de IA
        </h1>

        <PromptInput
          onResult={handleResult}
          selectedModel={selectedModel}
          setInput={setInput}
        />

        {result && (
          <div className="bg-gray-900 p-6 rounded-xl max-w-3xl mx-auto mt-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-green-400">
              Prompt generado:
            </h2>
            <p className="text-gray-200 whitespace-pre-wrap">{result}</p>
          </div>
        )}

        {selectedConversation && (
          <div className="bg-gray-800 p-6 rounded-xl max-w-3xl mx-auto mt-10 border border-gray-600">
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              Conversación anterior seleccionada:
            </h2>
            <p className="text-blue-300 mb-2">
              <strong>Prompt:</strong> {selectedConversation.input}
            </p>
            <p className="text-gray-300">
              <strong>Respuesta:</strong> {selectedConversation.output}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default PromptifyApp;