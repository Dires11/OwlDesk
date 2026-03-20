import { markPaymentPaidAction } from "@/app/actions";
import { PageHeader } from "@/app/components/page-header";
import { StatusBadge } from "@/app/components/status-badge";
import { getPaymentsData } from "@/app/lib/data";
import { formatCurrency, formatDate } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function PaymentsPage() {
  const payments = await getPaymentsData();
  const summary = {
    collected: payments.filter((payment) => payment.status === "PAID").reduce((sum, payment) => sum + payment.amount, 0),
    pending: payments.filter((payment) => payment.status === "PENDING" || payment.status === "UNPAID").reduce((sum, payment) => sum + payment.amount, 0),
    overdue: payments.filter((payment) => payment.status === "OVERDUE").reduce((sum, payment) => sum + payment.amount, 0),
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Track collected revenue, pending tuition, and overdue follow-ups." />
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Total collected</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{formatCurrency(summary.collected)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Pending</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{formatCurrency(summary.pending)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Overdue</CardTitle></CardHeader><CardContent className="text-3xl font-semibold text-rose-600 dark:text-rose-300">{formatCurrency(summary.overdue)}</CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Payment records</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Due date</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.student}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell><StatusBadge status={payment.status} /></TableCell>
                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                  <TableCell>
                    <form action={markPaymentPaidAction}>
                      <input type="hidden" name="paymentId" value={payment.id} />
                      <Button type="submit" variant="outline" size="sm" disabled={payment.status === "PAID"}>Mark paid</Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
