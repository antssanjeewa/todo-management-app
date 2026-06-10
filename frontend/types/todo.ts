export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  is_overdue: boolean;
  user_id: number;
  created_at: string;
}