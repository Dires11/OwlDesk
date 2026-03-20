import { prisma } from "@/app/lib/prisma";
import { payments as mockPayments, sessions as mockSessions, students as mockStudents, tutors as mockTutors } from "@/app/lib/mock-data";

export async function getDashboardData() {
  try {
    const [students, tutors, sessions, payments] = await Promise.all([
      prisma.student.findMany(),
      prisma.tutor.findMany(),
      prisma.session.findMany({ include: { student: true, tutor: true, payment: true }, orderBy: { date: "asc" } }),
      prisma.payment.findMany({ include: { session: { include: { student: true, tutor: true } } }, orderBy: { dueDate: "asc" } }),
    ]);

    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() + 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      stats: {
        totalSessionsThisWeek: sessions.filter((session) => new Date(session.date) >= now && new Date(session.date) <= weekEnd).length,
        activeStudents: students.filter((student) => student.status === "ACTIVE").length,
        monthlyRevenue: payments.filter((payment) => payment.status === "PAID" && new Date(payment.createdAt) >= monthStart).reduce((sum, payment) => sum + Number(payment.amount), 0),
        activeTutors: tutors.length,
      },
      todaySessions: sessions.filter((session) => new Date(session.date).toDateString() === now.toDateString()).map((session) => ({ id: session.id, student: session.student.name, tutor: session.tutor.name, subject: session.subject, date: session.date, status: session.status })),
      upcomingPayments: payments.filter((payment) => payment.status !== "PAID").slice(0, 5).map((payment) => ({ id: payment.id, student: payment.session.student.name, amount: Number(payment.amount), dueDate: payment.dueDate, status: payment.status })),
    };
  } catch {
    return {
      stats: {
        totalSessionsThisWeek: 3,
        activeStudents: mockStudents.filter((student) => student.status === "ACTIVE").length,
        monthlyRevenue: mockPayments.filter((payment) => payment.status === "PAID").reduce((sum, payment) => sum + payment.amount, 0),
        activeTutors: mockTutors.length,
      },
      todaySessions: mockSessions.filter((session) => session.date.startsWith("2026-03-20")).map(({ id, student, tutor, subject, date, status }) => ({ id, student, tutor, subject, date, status })),
      upcomingPayments: mockPayments.filter((payment) => payment.status !== "PAID").map(({ id, student, amount, dueDate, status }) => ({ id, student, amount, dueDate, status })),
    };
  }
}

export async function getStudentsData() { return mockStudents; }
export async function getTutorsData() { return mockTutors; }
export async function getSessionsData() { return mockSessions; }
export async function getPaymentsData() { return mockPayments; }
