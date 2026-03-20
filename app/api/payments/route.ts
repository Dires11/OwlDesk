import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getPaymentsData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(await getPaymentsData());
}

export async function POST(request: Request) {
  const { userId } = await auth();
  const body = await request.json();
  try {
    const payment = await prisma.payment.create({ data: { ...body, clerkUserId: userId ?? undefined, dueDate: new Date(body.dueDate) } });
    return NextResponse.json(payment, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  try {
    const payment = await prisma.payment.update({ where: { id: body.id }, data: { status: body.status ?? "PAID" } });
    return NextResponse.json(payment);
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
