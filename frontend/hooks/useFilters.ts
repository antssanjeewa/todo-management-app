"use client";

import { useState, useEffect, useMemo } from "react";
import { TodoStatus, TodoPriority } from "@/types/todo";

const DEBOUNCE_MS = 400;

export function useFilters() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  const filters = useMemo(
    () => ({ search: debouncedSearch, status: statusFilter, priority: priorityFilter }),
    [debouncedSearch, statusFilter, priorityFilter]
  );

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    filters,
  };
}