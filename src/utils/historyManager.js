export function saveConversation(convo) {
  const key = "promptify_history";
  const history = JSON.parse(localStorage.getItem(key)) || [];
  history.unshift(convo);
  localStorage.setItem(key, JSON.stringify(history));
}

export function loadHistory() {
  return JSON.parse(localStorage.getItem("promptify_history")) || [];
}

export function deleteConversation(id) {
  const history = loadHistory();
  const filtered = history.filter((item) => item.id !== id);
  localStorage.setItem("promptify_history", JSON.stringify(filtered));
}

export function clearHistory() {
  localStorage.removeItem("promptify_history");
}