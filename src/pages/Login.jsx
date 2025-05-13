import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center px-4 text-center">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center gap-2"
      >
        <span className="text-lg">←</span> Volver al inicio
      </button>

      <h1 className="text-3xl font-bold mb-4">Bienvenido a Promptify</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Inicia sesión con Google para guardar tus prompts y acceder a ellos en
        cualquier momento.
      </p>
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default Login;
