import axios from "axios";
import { VITE_API_BASE } from "../config/api.js";

axios.defaults.withCredentials = true;

let cachedAuth = null;
let cachedAt = 0;
const AUTH_CACHE_MS = 30_000;

export function clearAuthCache() {
  cachedAuth = null;
  cachedAt = 0;
}

export async function checkAuth({ force = false } = {}) {
  if (!force && cachedAuth !== null && Date.now() - cachedAt < AUTH_CACHE_MS) {
    return cachedAuth;
  }

  try {
    const res = await axios.get(`${VITE_API_BASE}/api/me`);
    cachedAuth = Boolean(res?.data?.success);
  } catch {
    cachedAuth = false;
  } finally {
    cachedAt = Date.now();
  }

  return cachedAuth;
}