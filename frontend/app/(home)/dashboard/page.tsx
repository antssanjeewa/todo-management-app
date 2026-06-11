"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Todo, TodoPriority } from "@/types/todo";
import { useFilters } from "@/hooks/useFilters";
import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/todo/TodoForm";
import TodoFilters from "@/components/todo/TodoFilters";
import TodoList from "@/components/todo/TodoList";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const {
		search, setSearch,
		statusFilter, setStatusFilter,
		priorityFilter, setPriorityFilter,
		filters,
	} = useFilters();

	const {
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
	} = useTodos(filters);


	const handleSubmit = async (
		title: string,
		description: string,
		priority: TodoPriority,
		dueDate?: Date
	) => {
		setSubmitting(true);
		try {
			if (editingTodo) {
				await updateTodo(editingTodo.id, {
					title,
					description,
					priority,
					status: editingTodo.status,
					due_date: dueDate?.toLocaleDateString(),
				});
				setEditingTodo(null);
			} else {
				await createTodo({ title, description, priority, due_date: dueDate?.toLocaleDateString() });
			}
		} catch (error: any) {
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteTodo(id);
		} catch {
			toast.error("Could not delete task");
		}
	};

	const handleToggle = async (todo: Todo) => {
		try {
			await toggleStatus(todo);
		} catch {
			toast.error("Could not update task status");
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div className="h-fit">
				<TodoForm
					editingTodo={editingTodo}
					onSubmit={handleSubmit}
					onCancel={() => setEditingTodo(null)}
					loading={submitting}
				/>
			</div>

			<div className="lg:col-span-2 space-y-5">
				<div className="flex items-center gap-3 pt-2">
					<div className="h-px bg-slate-800/80 flex-1" />
					<span>Task List ({meta?.total ?? 0})</span>
					<div className="h-px bg-slate-800/80 flex-1" />
				</div>

				<TodoFilters
					search={search}
					onSearchChange={setSearch}
					statusFilter={statusFilter}
					onStatusFilterChange={setStatusFilter}
					priorityFilter={priorityFilter}
					onPriorityFilterChange={setPriorityFilter}
				/>

				<div className="space-y-4">
					{loading ? (
						<LoadingState />
					) : todos.length === 0 ? (
						<EmptyState />
					) : (
						<>
							<TodoList
								todos={todos}
								onToggleStatus={handleToggle}
								onEdit={setEditingTodo}
								onDelete={handleDelete}
							/>
							{hasMore && (
								<div className="flex justify-center pt-4">
									<Button
										type="button"
										variant="outline"
										onClick={loadMore}
										disabled={loadingMore}
										className="w-full sm:w-auto px-6 h-10 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white"
									>
										{loadingMore ? (
											<>
												<Loader2 size={16} className="animate-spin mr-2" />
												Loading...
											</>
										) : (
											"Load More Tasks"
										)}
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

function LoadingState() {
	return (
		<div className="animate-pulse">
			<div className="bg-slate-900 text-center border border-dashed border-slate-800 p-12 rounded-2xl">
				<p className="text-slate-500 text-sm">Loading tasks...</p>
			</div>
		</div>
	);
}

function EmptyState() {
	return (
		<div className="text-center border border-dashed border-slate-800 p-12 rounded-2xl">
			<p className="text-slate-500 text-sm">
				No task matrices match selected constraints.
			</p>
		</div>
	);
}