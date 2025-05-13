import { useEffect, useState } from "react";
import { getHistory, deleteConversation, clearHistory } from "../utils/historyManager";

export default function Sidebar({ onSelectConversation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id) => {
    deleteConversation(id);
    setHistory(getHistory());
  };

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Historial</h2>
      <button
        onClick={handleClear}
        className="mb-4 text-red-400 hover:text-red-600 text-sm"
      >
        Borrar todo
      </button>
      <ul className="space-y-4">
        {history.map((item) => (
          <li key={item.id} className="border-b border-gray-700 pb-2">
            <button
              onClick={() => onSelectConversation(item)}
              className="text-left block w-full text-sm hover:text-blue-400"
            >
              {item.input.slice(0, 40)}...
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-xs text-red-400 hover:text-red-600 mt-1"
            >
              Eliminar
            </button>
          </li>
        ))}
        {history.length === 0 && (
          <li className="text-gray-400 text-sm">Sin conversaciones.</li>
        )}
      </ul>
    </aside>
  );
}