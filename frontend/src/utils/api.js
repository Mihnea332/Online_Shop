const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const normalizedApiBase = rawApiUrl ? rawApiUrl.replace(/\/+$/, "") : "";

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
};
