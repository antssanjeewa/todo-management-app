import React, { useState, useEffect } from "react";
import { Loader2, Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SelectInput from "@/components/SelectInput";
import { Todo, TodoPriority } from "@/types/todo";
import { priorityConfig } from "@/lib/constants";
import { DatePicker } from "../DatePicker";
import { Textarea } from "../ui/textarea";

interface TodoFormProps {
	editingTodo: Todo | null;
	onSubmit: (
		title: string,
		description: string,
		priority: TodoPriority,
		dueDate: Date
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
	const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

	useEffect(() => {
		if (editingTodo) {
			setTitle(editingTodo.title);
			setDescription(editingTodo.description || "");
			setPriority(editingTodo.priority || "medium");
			setDueDate(editingTodo.due_date ? new Date(editingTodo.due_date) : undefined);
		} else {
			clearForm();
		}
	}, [editingTodo]);

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		await onSubmit(title, description, priority, dueDate!);
		if (!editingTodo) {
			clearForm();
		}
	};

	const clearForm = () => {
		setTitle("");
		setDescription("");
		setPriority("medium");
		setDueDate(undefined);
	}

	const priorityOptions = Object.entries(priorityConfig).map(
		([value, config]) => ({
			value,
			label: config.label,
		})
	);

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
						<Label>Task Title</Label>
						<Input
							type="text"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="E.g., Review architectural blueprint"
						/>
					</div>

					<div className="space-y-1">
						<Label>Context Notes</Label>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add auxiliary details..."
							rows={3}
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Priority</Label>
							<SelectInput
								value={priority}
								onValueChange={(val: string) => setPriority(val as TodoPriority)}
								placeholder="Select Priority"
								options={priorityOptions}
							/>
						</div>

						<div className="space-y-1">
							<Label>Due Date</Label>
							<DatePicker
								value={dueDate}
								onChange={setDueDate}
								placeholder="Pick a date"
								isPastDisabled={true}
							/>
						</div>
					</div>

					<Button
						type="submit"
						disabled={loading}
						className={`h-10 w-full ${editingTodo
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
							className="h-10 w-full"
						>
							Abort Edit
						</Button>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
