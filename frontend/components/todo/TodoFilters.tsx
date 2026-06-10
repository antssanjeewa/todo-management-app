import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TodoFiltersProps {
	search: string;
	onSearchChange: (value: string) => void;
	statusFilter: string;
	onStatusFilterChange: (value: string) => void;
	priorityFilter: string;
	onPriorityFilterChange: (value: string) => void;
}

export default function TodoFilters({
	search,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	priorityFilter,
	onPriorityFilterChange,
}: TodoFiltersProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-3">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
				<Input
					type="text"
					placeholder="Query entries via key terms..."
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					className="w-full bg-[#111827]/50 border-slate-800/80 pl-10 pr-4 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:ring-blue-500/20 placeholder:text-slate-500 h-10"
				/>
			</div>
			
			<div className="flex gap-2">
				<Select value={statusFilter} onValueChange={onStatusFilterChange}>
					<SelectTrigger className="w-full sm:w-[160px] h-10 bg-[#111827]/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 focus:border-blue-500 focus:ring-blue-500/20">
						<SelectValue placeholder="All Statuses" />
					</SelectTrigger>
					<SelectContent className="bg-[#111827] border-slate-800 text-slate-300">
						<SelectItem value="">All Statuses</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
					</SelectContent>
				</Select>

				<Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
					<SelectTrigger className="w-full sm:w-[160px] h-10 bg-[#111827]/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 focus:border-blue-500 focus:ring-blue-500/20">
						<SelectValue placeholder="All Priorities" />
					</SelectTrigger>
					<SelectContent className="bg-[#111827] border-slate-800 text-slate-300">
						<SelectItem value="">All Priorities</SelectItem>
						<SelectItem value="low">Low Priority</SelectItem>
						<SelectItem value="medium">Medium Priority</SelectItem>
						<SelectItem value="high">High Priority</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
