import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptInput from "../components/PromptifyAppInput";
import ModelSelector from "../components/ModelSelector";
import Sidebar from "../components/Sidebar";
import { saveConversation } from "../utils/historyManager";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { savePromptToFirestore } from "../firebase/promptService";
import { motion } from "framer-motion";

function PromptifyApp() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { logout, user } = useAuth();

  const handleResult = async (output) => {
    setResult(output); // ahora sí es un string válido
    if (!output) return; 

    const newPrompt = {
      input: input,
      output: output,
      model: selectedModel || "gpt-3.5-turbo",
    };

    if (user) {
      console.log("🔥 Guardando en Firestore…");
      await savePromptToFirestore({ userId: user.uid, ...newPrompt });
    } else {
      saveConversation({
        ...newPrompt,
        id: uuidv4(),
        date: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr]">
      <Sidebar onSelectConversation={setSelectedConversation} />

      {/* Área principal */}
      <main className="min-h-screen bg-[#0f172a] text-white px-4 py-8 md:px-10 lg:px-20">
        {/* Top bar con navegación y logout */}
        <div className="flex justify-between items-center mb-6">
          {/* Siempre visible */}
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            ← Volver al inicio
          </button>

          {/* Info usuario o mensaje si no ha iniciado sesión */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-300 hidden sm:block">
                  {user.displayName}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <span className="text-sm text-gray-400">
                No has iniciado sesión
              </span>
            )}
          </div>
        </div>

        {/* Selector de modelo */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-6 rounded-xl max-w-3xl mx-auto mt-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-3 text-green-400">
              Prompt generado:
            </h2>
            <p className="text-gray-200 whitespace-pre-wrap">{result}</p>
          </motion.div>
        )}

        {selectedConversation && (
          <div className="bg-gray-800 p-6 rounded-xl max-w-3xl mx-auto mt-10 border border-gray-600">
            <h2 className="text-lg font-semibold mb-2 text-green-400">
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
