import api from "@/lib/api";
import { Todo, TodoFilters, CreateTodoPayload, UpdateTodoPayload } from "@/types/todo";

export const todoService = {
	async getTodos(filters: TodoFilters = {}): Promise<Todo[]> {
		const params = new URLSearchParams();
		if (filters.search) params.append("search", filters.search);
		if (filters.status) params.append("status", filters.status);
		if (filters.priority) params.append("priority", filters.priority);

		const response = await api.get<{ todos: Todo[] }>(`/todos?${params.toString()}`);
		return response.data.todos;
	},

	async createTodo(payload: CreateTodoPayload): Promise<Todo> {
		const response = await api.post<Todo>("/todos", payload);
		return response.data;
	},

	async updateTodo(id: number, payload: UpdateTodoPayload): Promise<Todo> {
		const response = await api.put<Todo>(`/todos/${id}`, payload);
		return response.data;
	},

	async deleteTodo(id: number): Promise<void> {
		await api.delete(`/todos/${id}`);
	},
};
