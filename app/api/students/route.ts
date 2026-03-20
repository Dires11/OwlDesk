import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getStudentsData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(await getStudentsData());
}

export async function POST(request: Request) {
  const { userId } = await auth();
  const body = await request.json();
  try {
    const student = await prisma.student.create({ data: { ...body, clerkUserId: userId ?? undefined } });
    return NextResponse.json(student, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
