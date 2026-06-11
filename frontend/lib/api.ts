import axios from "axios";
import { authCookies } from "./cookies";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = authCookies.getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		if (status === 401) {
			const isAuthPage = typeof window !== "undefined" &&
				(window.location.pathname === "/login" || window.location.pathname === "/register");

			if (!isAuthPage) {
				authCookies.removeToken();
				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
			}
		}

		const data = error.response?.data;

		if (data?.errors && typeof data.errors === "object") {
			const messages = Object.values(data.errors).flat();

			if (messages.length > 0) {
				error.userMessage = messages.join("\n");
			} else {
				error.userMessage = data.message || "Something went wrong";
			}
		} else {
			error.userMessage = data?.message || error.message;
		}

		return Promise.reject(error);
	},
);

export default api;
