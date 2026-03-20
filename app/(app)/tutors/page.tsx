import { addTutorAction } from "@/app/actions";
import { PageHeader } from "@/app/components/page-header";
import { getTutorsData } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function TutorsPage() {
  const tutors = await getTutorsData();
  return (
    <div className="space-y-6">
      <PageHeader title="Tutors" description="Manage tutor capacity, subject specialties, rates, and monthly earnings." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Tutor directory</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Subjects</TableHead><TableHead>Session count</TableHead><TableHead>Hourly rate</TableHead><TableHead>Monthly earnings</TableHead></TableRow></TableHeader>
              <TableBody>
                {tutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell><div><p className="font-medium">{tutor.name}</p><p className="text-xs text-muted-foreground">{tutor.email}</p></div></TableCell>
                    <TableCell>{tutor.subjects.join(", ")}</TableCell>
                    <TableCell>{tutor.sessionCount}</TableCell>
                    <TableCell>{formatCurrency(tutor.ratePerHr)}</TableCell>
                    <TableCell>{formatCurrency(tutor.monthlyEarnings)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Add tutor</CardTitle></CardHeader>
          <CardContent>
            <form action={addTutorAction} className="space-y-4">
              <Input name="name" placeholder="Tutor name" required />
              <Input name="email" type="email" placeholder="Email address" required />
              <Input name="subjects" placeholder="Subjects, comma separated" required />
              <Input name="ratePerHr" type="number" step="0.01" placeholder="Hourly rate" required />
              <Button type="submit" className="w-full">Add Tutor</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
