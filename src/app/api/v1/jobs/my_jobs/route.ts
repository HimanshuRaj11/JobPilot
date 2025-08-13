import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Your Prisma client setup
import { verifyUser } from "@/lib/verifyUser";

export async function GET(req: Request) {
    try {
        const userId = await verifyUser() as string;
        const User = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!User) {
            return NextResponse.json(
                { message: "User not found", error: true },
                { status: 404 }
            );
        }

        const company = await prisma.company.findFirst({
            where: { ownerId: User.id },
        });
        if (!company) {
            return NextResponse.json(
                { message: "Company not found", error: true },
                { status: 404 }
            );
        }

        const jobs = await prisma.job.findMany({
            where: { companyId: company.id },
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { applications: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
