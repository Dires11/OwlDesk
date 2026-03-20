import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, CalendarDays, CreditCard, GraduationCap, MoonStar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { title: "Calendar-first scheduling", description: "Coordinate sessions with a clean month view and quick scheduling workflows.", icon: CalendarDays },
  { title: "Student + tutor CRM", description: "Keep families, tutor staffing, and subject assignments in one place.", icon: GraduationCap },
  { title: "Payments at a glance", description: "Spot pending and overdue balances before they slip through the cracks.", icon: CreditCard },
  { title: "Operations dashboard", description: "See today’s sessions, weekly volume, and monthly revenue at a glance.", icon: Users },
];

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(88,81,216,0.14),transparent_35%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] px-6 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_30%),linear-gradient(to_bottom,#020617,#0f172a)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex items-center justify-between rounded-full border border-white/60 bg-background/80 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><MoonStar className="size-5" /></div>
            <div>
              <p className="text-lg font-semibold">OwlDesk</p>
              <p className="text-sm text-muted-foreground">A smarter desk for every tutoring center</p>
            </div>
          </div>
          <div className="flex gap-3">
            {userId ? (
              <Button asChild><Link href="/dashboard">Open app</Link></Button>
            ) : (
              <>
                <SignInButton mode="modal"><Button variant="outline">Log in</Button></SignInButton>
                <SignUpButton mode="modal"><Button>Get started</Button></SignUpButton>
              </>
            )}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">🦉 Built for admins, tutors, and billing teams</div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance">Run your tutoring center from one polished, full-stack workspace.</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">OwlDesk centralizes scheduling, tutor management, session tracking, and payments in a secure Next.js 16 app with Clerk auth, Prisma, and Neon-ready data models.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {userId ? (
                <Button size="lg" asChild><Link href="/dashboard">Go to dashboard <ArrowRight className="size-4" /></Link></Button>
              ) : (
                <SignUpButton mode="modal"><Button size="lg">Create your workspace <ArrowRight className="size-4" /></Button></SignUpButton>
              )}
              <Button size="lg" variant="outline" asChild><Link href="#features">Explore features</Link></Button>
            </div>
          </div>
          <Card className="overflow-hidden border-primary/10 bg-card/90 shadow-2xl shadow-primary/10 backdrop-blur">
            <CardContent className="grid gap-4 p-6">
              <div className="rounded-3xl bg-primary p-5 text-primary-foreground">
                <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/70">Today at OwlDesk</p>
                <h2 className="mt-3 text-3xl font-semibold">12 sessions, 4 tutors, 3 payment reminders.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-2xl border bg-background p-4">
                      <Icon className="mb-3 size-5 text-primary" />
                      <p className="font-medium">{feature.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="features" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="space-y-3 p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
