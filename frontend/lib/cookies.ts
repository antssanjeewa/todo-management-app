import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const authCookies = {
	setToken(token: string) {
		Cookies.set(TOKEN_KEY, token, {
			path: "/",
			expires: 7,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});
	},

	getToken(): string | undefined {
		return Cookies.get(TOKEN_KEY);
	},

	removeToken() {
		Cookies.remove(TOKEN_KEY, { path: "/" });
	},
};
