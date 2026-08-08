const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const normalizedApiBase = rawApiUrl ? rawApiUrl.replace(/\/+$/, "") : "";

export const getAuthToken = () => localStorage.getItem("adminToken");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
};

export const authHeaders = (headers = {}) => {
  const token = getAuthToken();

  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
};

export const authFetch = (path, options = {}) => {
  const { headers, ...rest } = options;

  return fetch(apiUrl(path), {
    credentials: "include",
    ...rest,
    headers: authHeaders(headers),
  });
};
