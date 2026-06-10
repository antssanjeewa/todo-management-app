export const priorityConfig = {
  high: {
    label: "High",
    className: "text-red-500",
  },
  medium: {
    label: "Medium",
    className: "text-yellow-500",
  },
  low: {
    label: "Low",
    className: "text-blue-500",
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

