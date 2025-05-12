const USAGE_KEY = "promptify-usage";
const LIMIT = 3;

export function getRemainingUses() {
  const data = JSON.parse(localStorage.getItem(USAGE_KEY));

  if (!data || isExpired(data.date)) {
    // Resetea si no hay datos o ya pasaron 24h
    localStorage.setItem(
      USAGE_KEY,
      JSON.stringify({ count: 0, date: new Date().toISOString() })
    );
    return LIMIT;
  }

  return Math.max(0, LIMIT - data.count);
}

export function incrementUsage() {
  const data = JSON.parse(localStorage.getItem(USAGE_KEY)) || {
    count: 0,
    date: new Date().toISOString(),
  };

  const newData = {
    count: data.count + 1,
    date: data.date,
  };

  localStorage.setItem(USAGE_KEY, JSON.stringify(newData));
}

function isExpired(storedDate) {
  const last = new Date(storedDate);
  const now = new Date();
  const diff = now - last;
  return diff > 24 * 60 * 60 * 1000; // más de 24 horas
}