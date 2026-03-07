import axios from "axios";

const rawBase =
	import.meta.env.VITE_API_BASE ||
	import.meta.env.API_BASE_URL ||
	"http://localhost:3000";

export const VITE_API_BASE = String(rawBase).replace(/\/+$/, "");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = VITE_API_BASE;

try {
	const token = localStorage.getItem("token");
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
} catch {
	// ignore (e.g. storage unavailable)
}