"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Todo } from "@/types/todo";
import { todoService } from "@/services/todoService";
import TodoForm from "@/components/todo/TodoForm";
import TodoItem from "@/components/todo/TodoItem";
import TodoFilters from "@/components/todo/TodoFilters";

export default function DashboardPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
	const [loading, setLoading] = useState(false);
	const [completedCollapsed, setCompletedCollapsed] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, [search, statusFilter, priorityFilter]);

	const fetchTodos = async () => {
		try {
			const data = await todoService.getTodos({
				search,
				status: statusFilter,
				priority: priorityFilter,
			});
			setTodos(data);
		} catch (error) {
			toast.error("Failed to update task sequence");
		}
	};

	const handleCreateOrUpdate = async (
		title: string,
		description: string,
		priority: "low" | "medium" | "high",
		dueDate: string
	) => {
		setLoading(true);
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
		} catch (error) {
			toast.error("Operation failed");
		} finally {
			setLoading(false);
		}
	};

	const toggleStatus = async (todo: Todo) => {
		const nextStatus = todo.status === "pending" ? "completed" : "pending";
		try {
			await todoService.updateTodo(todo.id, {
				title: todo.title,
				description: todo.description || undefined,
				status: nextStatus,
				priority: todo.priority,
				due_date: todo.due_date || undefined,
			});
			fetchTodos();
		} catch (error) {
			toast.error("Status synchronization error");
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
					loading={loading}
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
					{todos.length === 0 ? (
						<div className="text-center border border-dashed border-slate-800 p-12 rounded-2xl">
							<p className="text-slate-500 text-sm">
								No task matrices match selected constraints.
							</p>
						</div>
					) : (
						<>
							{/* Active/Pending Todos */}
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

							{/* Completed Divider and List */}
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