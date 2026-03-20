import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSessionsData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(await getSessionsData());
}

export async function POST(request: Request) {
  const { userId } = await auth();
  const body = await request.json();
  try {
    const session = await prisma.session.create({ data: { ...body, clerkUserId: userId ?? undefined, date: new Date(body.date) } });
    return NextResponse.json(session, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
