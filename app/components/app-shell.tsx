"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, CreditCard, GraduationCap, LayoutDashboard, MoonStar, Users } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { cn } from "@/app/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/sessions", label: "Sessions", icon: BookOpen },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/tutors", label: "Tutors", icon: Users },
  { href: "/payments", label: "Payments", icon: CreditCard },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-border/70 bg-sidebar px-5 py-6">
          <div className="flex items-center gap-3 pb-8">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <MoonStar className="size-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">OwlDesk</p>
              <p className="text-sm text-muted-foreground">Tutoring center CRM</p>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", active && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary") }>
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-3xl border border-border/70 bg-card p-4">
            <p className="text-sm font-medium">Center snapshot</p>
            <p className="mt-2 text-sm text-muted-foreground">Track sessions, staffing, and tuition follow-ups from a single desk.</p>
          </div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-6 py-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">OwlDesk workspace</p>
              <h1 className="text-2xl font-semibold">Manage your tutoring center with clarity</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserButton />
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
