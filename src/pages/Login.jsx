import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Bienvenido a Promptify
      </h1>
      <p className="mb-4 text-gray-400 text-center">
        Inicia sesión con Google para guardar tus prompts y acceder a ellos en cualquier momento.
      </p>
      <button
        onClick={login}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
