import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Option {
	value: string;
	label: string;
}

interface SelectInputProps {
	value: string;
	onValueChange: (value: string) => void;
	placeholder: string;
	options: Option[];
	className?: string;
}

export default function SelectInput({
	value,
	onValueChange,
	placeholder,
	options,
	className = "w-full",
}: SelectInputProps) {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger className={className} >
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-[#111827] p-3">
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
