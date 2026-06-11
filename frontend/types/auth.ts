import { ApiResponse } from "./api";

export interface User {
	id: number;
	name: string;
	email: string;
	access_token: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export type AuthResponse = ApiResponse<User>;

