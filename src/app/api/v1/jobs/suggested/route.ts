import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, jobs });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
