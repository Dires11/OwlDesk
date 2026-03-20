"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";

function parseSubjects(input: FormDataEntryValue | null) {
  return String(input ?? "")
    .split(",")
    .map((subject) => subject.trim())
    .filter(Boolean);
}

export async function addStudentAction(formData: FormData) {
  const { userId } = await auth();
  try {
    await prisma.student.create({
      data: {
        name: String(formData.get("name") ?? ""),
        grade: String(formData.get("grade") ?? ""),
        email: String(formData.get("email") ?? ""),
        subjects: parseSubjects(formData.get("subjects")),
        status: (String(formData.get("status") ?? "ACTIVE") as "ACTIVE" | "PAUSED" | "LEAD"),
        clerkUserId: userId ?? undefined,
      },
    });
  } catch {}
  revalidatePath("/students");
}

export async function addTutorAction(formData: FormData) {
  const { userId } = await auth();
  try {
    await prisma.tutor.create({
      data: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subjects: parseSubjects(formData.get("subjects")),
        ratePerHr: String(formData.get("ratePerHr") ?? "0"),
        clerkUserId: userId ?? undefined,
      },
    });
  } catch {}
  revalidatePath("/tutors");
}

export async function addSessionAction(formData: FormData) {
  const { userId } = await auth();
  try {
    await prisma.session.create({
      data: {
        studentId: String(formData.get("studentId") ?? ""),
        tutorId: String(formData.get("tutorId") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        date: new Date(String(formData.get("date") ?? new Date().toISOString())),
        duration: Number(formData.get("duration") ?? 60),
        status: (String(formData.get("status") ?? "SCHEDULED") as "SCHEDULED" | "COMPLETED" | "CANCELLED"),
        clerkUserId: userId ?? undefined,
      },
    });
  } catch {}
  revalidatePath("/calendar");
  revalidatePath("/sessions");
  revalidatePath("/dashboard");
}

export async function markPaymentPaidAction(formData: FormData) {
  try {
    await prisma.payment.update({
      where: { id: String(formData.get("paymentId") ?? "") },
      data: { status: "PAID" },
    });
  } catch {}
  revalidatePath("/payments");
  revalidatePath("/dashboard");
}
