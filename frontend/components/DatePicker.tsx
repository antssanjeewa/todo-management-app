"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  isPastDisabled?: boolean;
  required?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  isPastDisabled = false,
  disabled = false
}: DatePickerProps) {

  const [open, setOpen] = useState(false);

  const isDateDisabled = (date: Date) => {
    if (!isPastDisabled) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  const handleChange = (date?: Date) => {
    onChange(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className={cn(
            "h-10 w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleChange}
          disabled={disabled || isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  );
}