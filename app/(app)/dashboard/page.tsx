import { CalendarClock, DollarSign, GraduationCap, Users } from "lucide-react";
import { getDashboardData } from "@/app/lib/data";
import { formatCurrency, formatDate, formatDateTime } from "@/app/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/app/components/page-header";
import { StatusBadge } from "@/app/components/status-badge";

const statIcons = [CalendarClock, GraduationCap, DollarSign, Users];

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const stats = [
    { label: "Sessions this week", value: dashboard.stats.totalSessionsThisWeek, helper: "Upcoming and completed sessions in the next 7 days" },
    { label: "Active students", value: dashboard.stats.activeStudents, helper: "Students currently receiving tutoring support" },
    { label: "Monthly revenue", value: formatCurrency(dashboard.stats.monthlyRevenue), helper: "Collected this month" },
    { label: "Active tutors", value: dashboard.stats.activeTutors, helper: "Tutors currently serving students" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Monitor center performance, today’s schedule, and billing follow-ups from one place." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <Card key={stat.label}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="mt-2 text-3xl">{stat.value}</CardTitle>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Icon className="size-5" /></div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{stat.helper}</CardContent>
            </Card>
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s sessions</CardTitle>
            <CardDescription>Sessions scheduled for {formatDate(new Date(), { weekday: "long", month: "long", day: "numeric" })}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboard.todaySessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">{session.student} • {session.subject}</p>
                  <p className="text-sm text-muted-foreground">with {session.tutor} · {formatDateTime(session.date)}</p>
                </div>
                <StatusBadge status={session.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming payments</CardTitle>
            <CardDescription>Stay ahead of tuition collection and follow-up conversations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboard.upcomingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">{payment.student}</p>
                  <p className="text-sm text-muted-foreground">Due {formatDate(payment.dueDate)} · {formatCurrency(payment.amount)}</p>
                </div>
                <StatusBadge status={payment.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
