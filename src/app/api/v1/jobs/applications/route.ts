import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const userId = await verifyUser() as string;


        const User = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!User) return NextResponse.json({ message: "User not Found Please Login...", error: true })

        const company = await prisma.company.findFirst({
            where: { ownerId: User.id },
        });

        if (!company) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }

        const jobs = await prisma.job.findMany({
            where: {
                companyId: company.id,
            }
        })
        const Applications: any[] = [];

        await Promise.all(
            jobs.map(async (job) => {
                const applications = await prisma.application.findMany({
                    where: {
                        jobId: job.id
                    },
                    include: {
                        user: true,
                        job: true
                    }
                });

                Applications.push(...applications);
            })
        );


        return NextResponse.json({ Applications, success: true }, { status: 200 })

    } catch (error) {
        console.error("Update Company Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}