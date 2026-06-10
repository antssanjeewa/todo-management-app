import { priorityConfig, statusConfig } from "@/lib/constants";

export type TodoPriority = keyof typeof priorityConfig;
export type TodoStatus = keyof typeof statusConfig;
export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  priority: TodoPriority;
  status: TodoStatus;
  due_date?: string | null;
  is_overdue: boolean;
  user_id: number;
  created_at: string;
}

export interface TodoFilters {
  search?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
  priority?: TodoPriority;
  due_date?: string;
}

export interface UpdateTodoPayload {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  due_date?: string;
}

export interface TodoResponse {
  todos: Todo[];
}