import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getTutorsData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(await getTutorsData());
}

export async function POST(request: Request) {
  const { userId } = await auth();
  const body = await request.json();
  try {
    const tutor = await prisma.tutor.create({ data: { ...body, clerkUserId: userId ?? undefined } });
    return NextResponse.json(tutor, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
