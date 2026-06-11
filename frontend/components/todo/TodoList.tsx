"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/todo/TodoItem";

interface Props {
  todos: Todo[];
  onToggleStatus: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoList({ todos, onToggleStatus, onEdit, onDelete }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 pt-2">
        <div className="h-px bg-slate-800/80 flex-1" />
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors uppercase tracking-wider select-none"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          <span>Completed Tasks ({todos.length})</span>
        </button>
        <div className="h-px bg-slate-800/80 flex-1" />
      </div>

      {!collapsed && (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}