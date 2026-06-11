export const priorityConfig = {
  high: {
    label: "High",
    className: "bg-red-800",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-800",
  },
  low: {
    label: "Low",
    className: "bg-blue-800",
  },
} as const;

export const statusConfig = {
  pending: {
    label: "Pending",
    className: "text-yellow-500",
  },
  completed: {
    label: "Completed",
    className: "text-green-500",
  },
} as const;

