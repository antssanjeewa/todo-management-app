import React from "react";
import { Trash2, CheckCircle, Circle, Edit3, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Todo } from "@/types/todo";
import { priorityConfig } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface TodoItemProps {
	todo: Todo;
	onToggleStatus: (todo: Todo) => void;
	onEdit: (todo: Todo) => void;
	onDelete: (id: number) => void;
}

export default function TodoItem({
	todo,
	onToggleStatus,
	onEdit,
	onDelete,
}: TodoItemProps) {

	const priority = priorityConfig[todo.priority];
	const isCompleted = todo.status === "completed";

	return (
		<div
			className={`flex items-start justify-between p-4 bg-[#111827]/30 rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all shadow-sm ${isCompleted ? "opacity-60" : ""
				}`}
		>
			<div className="flex gap-4">
				<button
					onClick={() => onToggleStatus(todo)}
					className="mt-1 text-slate-500 hover:text-blue-400 transition-colors focus:outline-none"
				>
					{isCompleted ? (
						<CheckCircle className="text-emerald-500" size={20} />
					) : (
						<Circle size={20} />
					)}
				</button>
				<div className="space-y-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h3
							className={`font-semibold text-white ${isCompleted ? "line-through text-slate-500" : ""}`}
						>
							{todo.title}
						</h3>
						<Badge className={`capitalize text-[10px] px-1.5 h-4.5 ${priority.className}`}>
							{priority.label}
						</Badge>
					</div>
					{todo.description && (
						<p
							className={`text-sm text-slate-400 mt-1 whitespace-pre-line ${isCompleted ? "line-through text-slate-600" : ""
								}`}
						>
							{todo.description}
						</p>
					)}
					{todo.due_date && (
						<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
							<div className="flex items-center gap-1">
								<Calendar size={12} />
								<span>
									{formatDate(new Date(todo.due_date))}
								</span>
							</div>

							<div
								className={`flex items-center gap-1 ${todo.is_overdue ? "text-red-400 font-medium" : "text-slate-500"}`}
							>
								{todo.is_overdue && (
									<div className="flex items-center gap-1">
										<AlertCircle size={12} className="text-red-400 animate-pulse" />
										<span>Overdue</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex gap-1 ml-4">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => onEdit(todo)}
					className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
				>
					<Edit3 size={16} />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => onDelete(todo.id)}
					className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
				>
					<Trash2 size={16} />
				</Button>
			</div>
		</div>
	);
}
