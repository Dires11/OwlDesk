import { addSessionAction } from "@/app/actions";
import { PageHeader } from "@/app/components/page-header";
import { getSessionsData, getStudentsData, getTutorsData } from "@/app/lib/data";
import { cn, formatDate } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const subjectColors: Record<string, string> = {
  Math: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Science: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Physics: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  Reading: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
};

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const [{ month }, sessions, students, tutors] = await Promise.all([searchParams, getSessionsData(), getStudentsData(), getTutorsData()]);
  const baseDate = month ? new Date(`${month}-01T00:00:00`) : new Date("2026-03-01T00:00:00.000Z");
  const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const daysInMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
  const prevMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1).toISOString().slice(0, 7);
  const nextMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1).toISOString().slice(0, 7);

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" description="Navigate by month, scan color-coded sessions by subject, and schedule a new lesson." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{formatDate(start, { month: "long", year: "numeric" })}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" asChild><a href={`/calendar?month=${prevMonth}`}>Previous</a></Button>
              <Button variant="outline" asChild><a href={`/calendar?month=${nextMonth}`}>Next</a></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-3 text-center text-sm text-muted-foreground">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-7">
              {Array.from({ length: daysInMonth }, (_, index) => {
                const date = new Date(baseDate.getFullYear(), baseDate.getMonth(), index + 1);
                const daySessions = sessions.filter((session) => new Date(session.date).toDateString() === date.toDateString());
                return (
                  <div key={date.toISOString()} className="min-h-36 rounded-2xl border p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-medium">{index + 1}</p>
                      <p className="text-xs text-muted-foreground">{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                    </div>
                    <div className="space-y-2">
                      {daySessions.map((session) => (
                        <div key={session.id} className={cn("rounded-xl px-2 py-1 text-xs font-medium", subjectColors[session.subject] ?? "bg-primary/10 text-primary")}>
                          {session.subject} • {session.student}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Schedule a session</CardTitle></CardHeader>
          <CardContent>
            <form action={addSessionAction} className="space-y-4">
              <Select name="studentId" defaultValue={students[0]?.id}>{students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}</Select>
              <Select name="tutorId" defaultValue={tutors[0]?.id}>{tutors.map((tutor) => <option key={tutor.id} value={tutor.id}>{tutor.name}</option>)}</Select>
              <Input name="subject" placeholder="Subject" required />
              <Input name="date" type="datetime-local" required />
              <Input name="duration" type="number" defaultValue={60} required />
              <Select name="status" defaultValue="SCHEDULED"><option value="SCHEDULED">Scheduled</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></Select>
              <Button type="submit" className="w-full">Create session</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
