import { addStudentAction } from "@/app/actions";
import { PageHeader } from "@/app/components/page-header";
import { StatusBadge } from "@/app/components/status-badge";
import { getStudentsData } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function StudentsPage() {
  const students = await getStudentsData();
  return (
    <div className="space-y-6">
      <PageHeader title="Students" description="Track each learner’s academic profile, assigned tutor, and current balance." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Student roster</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Grade</TableHead><TableHead>Subjects</TableHead><TableHead>Assigned tutor</TableHead><TableHead>Sessions</TableHead><TableHead>Balance</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell><div><p className="font-medium">{student.name}</p><p className="text-xs text-muted-foreground">{student.email}</p></div></TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.subjects.join(", ")}</TableCell>
                    <TableCell>{student.assignedTutor}</TableCell>
                    <TableCell>{student.sessions}</TableCell>
                    <TableCell>{formatCurrency(student.balance)}</TableCell>
                    <TableCell><StatusBadge status={student.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Add student</CardTitle></CardHeader>
          <CardContent>
            <form action={addStudentAction} className="space-y-4">
              <Input name="name" placeholder="Student name" required />
              <Input name="grade" placeholder="Grade" required />
              <Input name="email" type="email" placeholder="Email address" required />
              <Input name="subjects" placeholder="Subjects, comma separated" required />
              <Select name="status" defaultValue="ACTIVE"><option value="ACTIVE">Active</option><option value="PAUSED">Paused</option><option value="LEAD">Lead</option></Select>
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
