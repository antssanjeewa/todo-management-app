import React, { useState, useEffect } from "react";
import { Loader2, Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Todo, TodoPriority } from "@/types/todo";

interface TodoFormProps {
	editingTodo: Todo | null;
	onSubmit: (
		title: string,
		description: string,
		priority: TodoPriority,
		dueDate: string
	) => Promise<void>;
	onCancel: () => void;
	loading: boolean;
}

export default function TodoForm({
	editingTodo,
	onSubmit,
	onCancel,
	loading,
}: TodoFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<TodoPriority>("medium");
	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		if (editingTodo) {
			setTitle(editingTodo.title);
			setDescription(editingTodo.description || "");
			setPriority(editingTodo.priority || "medium");
			setDueDate(editingTodo.due_date ? editingTodo.due_date.substring(0, 10) : "");
		} else {
			setTitle("");
			setDescription("");
			setPriority("medium");
			setDueDate("");
		}
	}, [editingTodo]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		await onSubmit(title, description, priority, dueDate);
		if (!editingTodo) {
			setTitle("");
			setDescription("");
			setPriority("medium");
			setDueDate("");
		}
	};

	return (
		<Card className="bg-[#111827]/50 border-slate-800/80 backdrop-blur-sm shadow-md">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
					{editingTodo ? (
						<Edit3 size={18} className="text-purple-400" />
					) : (
						<Plus size={18} className="text-blue-400" />
					)}
					<span>{editingTodo ? "Modify Task Details" : "Create New Task"}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-1">
						<Label className="text-slate-400 text-sm font-medium">Task Title</Label>
						<Input
							type="text"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="E.g., Review architectural blueprint"
							className="bg-[#0B0F19] border-slate-700/60 text-white placeholder:text-slate-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
						/>
					</div>

					<div className="space-y-1">
						<Label className="text-slate-400 text-sm font-medium">Context Notes</Label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full bg-[#0B0F19] border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
							placeholder="Add auxiliary details..."
							rows={3}
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label className="text-slate-400 text-sm font-medium">Priority</Label>
							<Select
								value={priority}
								onValueChange={(val: string) => setPriority(val as TodoPriority)}
							>
								<SelectTrigger className="w-full h-10 bg-[#0B0F19] border-slate-700/60 text-white focus:border-blue-500 focus:ring-blue-500/20">
									<SelectValue placeholder="Select Priority" />
								</SelectTrigger>
								<SelectContent className="bg-[#111827] border-slate-800 text-white">
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="high">High</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label className="text-slate-400 text-sm font-medium">Due Date</Label>
							<Input
								type="date"
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
								className="bg-[#0B0F19] border-slate-700/60 text-white focus-visible:border-blue-500 focus-visible:ring-blue-500/20 [color-scheme:dark]"
							/>
						</div>
					</div>

					<Button
						type="submit"
						disabled={loading}
						className={`w-full font-medium h-10 transition-all flex justify-center items-center gap-1.5 text-white shadow-sm mt-2 ${
							editingTodo
								? "bg-purple-600 hover:bg-purple-500 active:bg-purple-700"
								: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
						}`}
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : editingTodo ? (
							"Update Record"
						) : (
							"Commit Task"
						)}
					</Button>
					{editingTodo && (
						<Button
							type="button"
							variant="outline"
							onClick={onCancel}
							className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium h-10 border-slate-700/60 transition-colors"
						>
							Abort Edit
						</Button>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
