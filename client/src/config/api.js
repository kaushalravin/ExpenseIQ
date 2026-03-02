import axios from "axios";

const rawBase =
	import.meta.env.VITE_API_BASE_URL ||
	import.meta.env.API_BASE_URL ||
	"http://localhost:3000";

export const API_BASE = String(rawBase).replace(/\/+$/, "");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE;