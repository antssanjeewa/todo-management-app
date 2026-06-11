export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface ApiErrorResponse {
	success: boolean;
	message: string;
	errors?: Record<string, string[]>;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	per_page: number;
	to: number;
	total: number;
}

export interface PaginationResponse<T> {
	success: boolean;
	data: T;
	meta: Meta;
}
