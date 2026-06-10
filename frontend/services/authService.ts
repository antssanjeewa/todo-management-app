import api from "@/lib/api";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import Cookies from "js-cookie";

export const authService = {
	async login(credentials: LoginPayload): Promise<AuthResponse> {
		const response = await api.post<AuthResponse>("/login", credentials);

		// if (response.data.success) {
		// 	localStorage.setItem("user", JSON.stringify(response.data.data));
		// 	Cookies.set("user_role", response.data.data.role, { expires: 7 });
		// 	Cookies.set("auth_token", response.data.data.access_token, {
		// 		expires: 7,
		// 	});
		// }

		return response.data;
	},

	async register(data: RegisterPayload): Promise<AuthResponse> {
		const response = await api.post<AuthResponse>("/register", data);

		return response.data;
	},

	async logout(): Promise<void> {
		await api.post("/logout");
		localStorage.removeItem("user");
		window.location.href = "/";
	},

	// getCurrentUser: () => {
	//   const user = localStorage.getItem("user");
	//   return user ? JSON.parse(user) : null;
	// },
};
