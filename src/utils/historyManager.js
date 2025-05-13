const STORAGE_KEY = "promptify-history";

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveConversation = (conversation) => {
  const current = getHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([conversation, ...current]));
};

export const deleteConversation = (id) => {
  const filtered = getHistory().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};