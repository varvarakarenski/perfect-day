const PREFIX = "perfectday:";

export function loadAdditions<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function appendAddition<T>(key: string, item: T): T[] {
  const items = [...loadAdditions<T>(key), item];
  localStorage.setItem(PREFIX + key, JSON.stringify(items));
  return items;
}
