import { PageHeader } from "@/app/components/page-header";
import { StatusBadge } from "@/app/components/status-badge";
import { getSessionsData } from "@/app/lib/data";
import { formatDateTime } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const filters = ["All", "Scheduled", "Completed", "Cancelled"];

export default async function SessionsPage() {
  const sessions = await getSessionsData();
  return (
    <div className="space-y-6">
      <PageHeader title="Sessions" description="Review every tutoring session, filter by delivery status, and monitor payments." />
      <Card>
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All sessions</CardTitle>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => <Button key={filter} variant={filter === "All" ? "default" : "outline"} size="sm">{filter}</Button>)}
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Tutor</TableHead><TableHead>Subject</TableHead><TableHead>Date & time</TableHead><TableHead>Duration</TableHead><TableHead>Session status</TableHead><TableHead>Payment</TableHead></TableRow></TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.student}</TableCell>
                  <TableCell>{session.tutor}</TableCell>
                  <TableCell>{session.subject}</TableCell>
                  <TableCell>{formatDateTime(session.date)}</TableCell>
                  <TableCell>{session.duration} min</TableCell>
                  <TableCell><StatusBadge status={session.status} /></TableCell>
                  <TableCell><StatusBadge status={session.paymentStatus} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
