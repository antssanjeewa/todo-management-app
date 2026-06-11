import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/SelectInput";
import { TodoPriority, TodoStatus } from "@/types/todo";
import { priorityConfig, statusConfig } from "@/lib/constants";

interface TodoFiltersProps {
	search: string;
	onSearchChange: (value: string) => void;
	statusFilter: TodoStatus | "all";
	onStatusFilterChange: (value: TodoStatus | "all") => void;
	priorityFilter: TodoPriority | "all";
	onPriorityFilterChange: (value: TodoPriority | "all") => void;
}

export default function TodoFilters({
	search,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	priorityFilter,
	onPriorityFilterChange,
}: TodoFiltersProps) {

	
	const priorityOptions = [
  { value: "all", label: "All Priorities" },
  ...Object.entries(priorityConfig).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

	const statusOptions = [
		{ value: "all", label: "All Statuses" },
		...Object.entries(statusConfig).map(([value, config]) => ({
			value,
			label: config.label,
		})),
	];

	return (
		<div className="flex flex-col sm:flex-row gap-3">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
				<Input
					type="text"
					placeholder="Query entries via key terms..."
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-10"
				/>
			</div>
			
			<div className="flex gap-2">
				<SelectInput
					value={statusFilter}
					onValueChange={(val) => onStatusFilterChange(val as TodoStatus | 'all')}
					placeholder="All Statuses"
					options={statusOptions}
				/>

				<SelectInput
					value={priorityFilter}
					onValueChange={(val) => onPriorityFilterChange(val as TodoPriority | 'all')}
					placeholder="All Priorities"
					options={priorityOptions}
				/>
			</div>
		</div>
	);
}
