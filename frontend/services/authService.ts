import api from "@/lib/api";
import { authCookies } from "@/lib/cookies";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
	async login(credentials: LoginPayload): Promise<AuthResponse> {
		const response = await api.post<AuthResponse>("/login", credentials);

		if (response.data.success){
			authCookies.setToken(response.data.data.access_token);
		}

		return response.data;
	},

	async register(data: RegisterPayload): Promise<AuthResponse> {
		const response = await api.post<AuthResponse>("/register", data);

		if (response.data.success){
			authCookies.setToken(response.data.data.access_token);
		}

		return response.data;
	},

	async logout(): Promise<any> {
		const response = await api.post("/logout");

		if (response.data.success)
			authCookies.removeToken();

		return response.data;
	},

	async getUser(): Promise<AuthResponse> {
		const response = await api.get<AuthResponse>("/user");
		return response.data;
	},
};
