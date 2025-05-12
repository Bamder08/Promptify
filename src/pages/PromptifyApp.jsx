import { useNavigate } from "react-router-dom";

function PromptifyApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
      >
        ← Volver al inicio
      </button>

      <h1 className="text-4xl font-bold mb-6 text-blue-400">Bienvenido a Promptify</h1>
      <p className="text-lg text-gray-300">
        Aquí podrás comenzar a generar, guardar y optimizar tus prompts de IA.
      </p>
    </div>
  );
}

export default PromptifyApp;