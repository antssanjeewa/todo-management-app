"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Todo, TodoStatus, TodoPriority } from "@/types/todo";
import { todoService } from "@/services/todoService";

interface Filters {
  search: string;
  status: TodoStatus | "all";
  priority: TodoPriority | "all";
}

export function useTodos(filters: Filters) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const res = await todoService.getTodos(filters, signal);
        setTodos(res.data);
      } catch (error: any) {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        toast.error(error.message ?? "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchTodos(controller.signal);
    return () => controller.abort();
  }, [fetchTodos]);


  const createTodo = useCallback(
    async (payload: Parameters<typeof todoService.createTodo>[0]) => {
      const res = await todoService.createTodo(payload);
      setTodos((prev) => [res.data, ...prev]);
      toast.success("New task logged successfully");
    },
    []
  );

  const updateTodo = useCallback(
    async (id: number, payload: Parameters<typeof todoService.updateTodo>[1]) => {
      const res = await todoService.updateTodo(id, payload);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      toast.success("Task details updated");
    },
    []
  );

  const toggleStatus = useCallback(async (todo: Todo) => {
    const res = await todoService.toggleTodo(todo.id);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));
    toast.success(res.message);
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    await todoService.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task removed successfully");
  }, []);

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    toggleStatus,
    deleteTodo,
  };
}