"use client";

import { Todo } from "@/types/todo";
import TodoItem from "@/components/todo/TodoItem";

interface Props {
	todos: Todo[];
	onToggleStatus: (todo: Todo) => Promise<void>;
	onEdit: (todo: Todo) => void;
	onDelete: (id: number) => Promise<void>;
}

export default function TodoList({
	todos,
	onToggleStatus,
	onEdit,
	onDelete,
}: Props) {
	return (
		<div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin">
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
	);
}
