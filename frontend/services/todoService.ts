import api from "@/lib/api";
import { Todo, TodoFilters, CreateTodoPayload, UpdateTodoPayload, TodoResponse, TodoListResponse } from "@/types/todo";

export const todoService = {
	async getTodos(filters: TodoFilters = {}, signal?: AbortSignal): Promise<TodoListResponse> {
		const params = new URLSearchParams();
		if (filters.search) params.append("search", filters.search);
		if (filters.status) params.append("status", filters.status);
		if (filters.priority) params.append("priority", filters.priority);

		const response = await api.get<TodoListResponse>(`/todos?${params.toString()}`, { signal });
		return response.data;
	},

	async createTodo(payload: CreateTodoPayload): Promise<TodoResponse> {
		const response = await api.post<TodoResponse>("/todos", payload);
		return response.data;
	},

	async updateTodo(id: number, payload: UpdateTodoPayload): Promise<TodoResponse> {
		const response = await api.put<TodoResponse>(`/todos/${id}`, payload);
		return response.data;
	},

	async toggleTodo(id: number): Promise<TodoResponse> {
		const response = await api.patch<TodoResponse>(`/todos/${id}/toggle`);
		return response.data;
	},

	async deleteTodo(id: number): Promise<void> {
		await api.delete(`/todos/${id}`);
	},
};
