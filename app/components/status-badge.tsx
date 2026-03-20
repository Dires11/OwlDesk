import { Badge } from "@/components/ui/badge";

const variants: Record<string, "success" | "warning" | "destructive" | "secondary" | "default"> = {
  ACTIVE: "success",
  PAUSED: "warning",
  LEAD: "secondary",
  SCHEDULED: "default",
  COMPLETED: "success",
  CANCELLED: "destructive",
  PAID: "success",
  PENDING: "warning",
  UNPAID: "secondary",
  OVERDUE: "destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={variants[status] ?? "outline"}>{status.toLowerCase()}</Badge>;
}
