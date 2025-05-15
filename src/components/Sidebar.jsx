import { useEffect, useState } from "react";
import { getUserPrompts, deletePrompt } from "../utils/firebasePrompts";
import { useAuth } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

function Sidebar({ onSelectConversation }) {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getUserPrompts(user.uid).then(setHistory);
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = confirm("¿Eliminar este prompt?");
    if (confirmed) {
      await deletePrompt(user.uid, id);
      setHistory(history.filter((p) => p.id !== id));
    }
  };

  const handleClearAll = async () => {
    const confirmed = confirm("¿Seguro que deseas eliminar TODO el historial?");
    if (confirmed) {
      for (const p of history) {
        await deletePrompt(user.uid, p.id);
      }
      setHistory([]);
    }
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: open || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 bottom-0 w-64 bg-[#0d1628] text-white px-4 py-6 border-r border-gray-700 md:relative md:translate-x-0 z-40"
      >
        <h2 className="text-xl font-bold mb-4">Historial</h2>

        <div className="flex flex-col gap-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {history.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded text-sm">
              <button onClick={() => onSelectConversation(item)} className="text-left w-full truncate mr-2">
                {item.input.slice(0, 50)}...
              </button>
              <FaTrash
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-600 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {history.length > 0 && (
          <button onClick={handleClearAll} className="mt-6 text-sm text-red-400 hover:text-red-600">
            Eliminar todo
          </button>
        )}
      </motion.aside>
    </>
  );
}

export default Sidebar;