"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Todo, TodoStatus } from "@/types/todo";
import { todoService } from "@/services/todoService";
import TodoForm from "@/components/todo/TodoForm";
import TodoItem from "@/components/todo/TodoItem";
import TodoFilters from "@/components/todo/TodoFilters";
import { TodoPriority } from "@/types/todo";

export default function DashboardPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");
	const [priorityFilter, setPriorityFilter] = useState<TodoPriority | "all">("all");
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [completedCollapsed, setCompletedCollapsed] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, [search, statusFilter, priorityFilter]);

	const fetchTodos = async () => {
		setLoading(true);
		try {
			const res = await todoService.getTodos({
				search,
				status: statusFilter,
				priority: priorityFilter,
			});
			setTodos(res.data.todos);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateOrUpdate = async (
		title: string,
		description: string,
		priority: TodoPriority,
		dueDate?: Date
	) => {
		setSubmitting(true);
		try {
			if (editingTodo) {
				await todoService.updateTodo(editingTodo.id, {
					title,
					description,
					status: editingTodo.status,
					priority,
					due_date: dueDate || undefined,
				});
				toast.success("Task details updated");
				setEditingTodo(null);
			} else {
				await todoService.createTodo({
					title,
					description,
					priority,
					due_date: dueDate || undefined,
				});
				toast.success("New task logged successfully");
			}
			fetchTodos();
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	const toggleStatus = async (todo: Todo) => {
		try {
			const res = await todoService.toggleTodo(todo.id);
			if (res.success) {
				todo.status = res.data.status;
				toast.success(res.message);
				setTodos((prevTodos) =>
					prevTodos.map((t) => (t.id === todo.id ? res.data : t))
				);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const deleteTodo = async (id: number) => {
		try {
			await todoService.deleteTodo(id);
			toast.success("Task removed securely");
			fetchTodos();
		} catch (error) {
			toast.error("Could not process deletion");
		}
	};

	const pendingTodos = todos.filter((todo) => todo.status !== "completed");
	const completedTodos = todos.filter((todo) => todo.status === "completed");

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div className="h-fit">
				<TodoForm
					editingTodo={editingTodo}
					onSubmit={handleCreateOrUpdate}
					onCancel={() => setEditingTodo(null)}
					loading={submitting}
				/>
			</div>

			<div className="lg:col-span-2 space-y-5">
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
						<div className="animate-pulse">
							<div className="bg-slate-900 text-center border border-dashed border-slate-800 p-12 rounded-2xl">
								<p className="text-slate-500 text-sm ">
									Loading tasks...
								</p>
							</div>
						</div>
					) : todos.length === 0 ? (
						<div className="text-center border border-dashed border-slate-800 p-12 rounded-2xl">
							<p className="text-slate-500 text-sm">
								No task matrices match selected constraints.
							</p>
						</div>
					) : (
						<>

							{pendingTodos.length > 0 && (
								<div className="space-y-3">
									{pendingTodos.map((todo) => (
										<TodoItem
											key={todo.id}
											todo={todo}
											onToggleStatus={toggleStatus}
											onEdit={setEditingTodo}
											onDelete={deleteTodo}
										/>
									))}
								</div>
							)}


							{completedTodos.length > 0 && (
								<div className="space-y-3">
									<div className="flex items-center gap-3 pt-2">
										<div className="h-px bg-slate-800/80 flex-1"></div>
										<button
											type="button"
											onClick={() => setCompletedCollapsed(!completedCollapsed)}
											className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors uppercase tracking-wider select-none"
										>
											{completedCollapsed ? (
												<ChevronRight size={14} />
											) : (
												<ChevronDown size={14} />
											)}
											<span>Completed Tasks ({completedTodos.length})</span>
										</button>
										<div className="h-px bg-slate-800/80 flex-1"></div>
									</div>

									{!completedCollapsed && (
										<div className="space-y-3">
											{completedTodos.map((todo) => (
												<TodoItem
													key={todo.id}
													todo={todo}
													onToggleStatus={toggleStatus}
													onEdit={setEditingTodo}
													onDelete={deleteTodo}
												/>
											))}
										</div>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}