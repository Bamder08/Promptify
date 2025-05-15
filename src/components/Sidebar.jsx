import { useEffect, useState } from "react";
import { getUserPrompts, deletePrompt, deleteAllPrompts } from "../utils/firebasePrompts";
import { useAuth } from "../context/AuthContext";
import { FiTrash } from "react-icons/fi";

function Sidebar({ onSelectConversation }) {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState([]);

  // Cargar historial del usuario
  useEffect(() => {
    const fetchPrompts = async () => {
      if (user) {
        const data = await getUserPrompts(user.uid);
        setPrompts(data);
      }
    };
    fetchPrompts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) return;
    await deletePrompt(user.uid, id);
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteAll = async () => {
    if (!user) return;
    const confirm = window.confirm("¿Seguro que deseas eliminar todo tu historial?");
    if (!confirm) return;
    await deleteAllPrompts(user.uid);
    setPrompts([]);
  };

  return (
    <aside className="w-64 bg-[#0e152a] min-h-screen p-4 border-r border-gray-700">
      <h2 className="text-white text-lg font-semibold mb-4">Historial</h2>

      {prompts.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay prompts guardados.</p>
      ) : (
        <div className="space-y-2">
          {prompts.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-3 rounded-lg"
            >
              <button
                className="text-left text-sm flex-1 text-white"
                onClick={() => onSelectConversation(conv)}
              >
                {conv.input.slice(0, 40)}...
              </button>
              <button
                onClick={() => handleDelete(conv.id)}
                className="ml-2 text-red-400 hover:text-red-600"
                title="Eliminar"
              >
                <FiTrash />
              </button>
            </div>
          ))}

          <button
            onClick={handleDeleteAll}
            className="mt-4 text-sm text-red-400 hover:text-red-600"
          >
            Eliminar todo
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;