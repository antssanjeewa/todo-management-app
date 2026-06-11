"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Todo, TodoStatus, TodoPriority } from "@/types/todo";
import { todoService } from "@/services/todoService";
import { Meta } from "@/types/api";

interface Filters {
  search: string;
  status: TodoStatus | "all";
  priority: TodoPriority | "all";
}

export function useTodos(filters: Filters) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const res = await todoService.getTodos({ ...filters, page }, controller.signal);
        
        setTodos((prev) => {
          if (page === 1) {
            return res.data;
          }
          const existingIds = new Set(prev.map((t) => t.id));
          const newItems = res.data.filter((t) => !existingIds.has(t.id));
          return [...prev, ...newItems];
        });
        setMeta(res.meta);
      } catch (error: any) {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        toast.error(error.message ?? "Failed to load tasks");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetch();

    return () => controller.abort();
  }, [filters, page]);

  const createTodo = useCallback(
    async (payload: Parameters<typeof todoService.createTodo>[0]) => {
      const res = await todoService.createTodo(payload);
      setTodos((prev) => [res.data, ...prev]);
      setMeta((prev) => prev ? { ...prev, total: prev.total + 1 } : prev);
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
    setMeta((prev) => prev ? { ...prev, total: prev.total - 1 } : prev);
    toast.success("Task removed successfully");
  }, []);

  const hasMore = useMemo(() => {
    if (!meta) return false;
    return page < meta.last_page;
  }, [meta, page]);

  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loadingMore, loading]);

  return {
    todos,
    meta,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    createTodo,
    updateTodo,
    toggleStatus,
    deleteTodo,
  };
}