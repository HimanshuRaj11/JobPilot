
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

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

        const { jobId } = await req.json();

        if (!jobId) {
            return NextResponse.json({ message: "jobId is required", error: true });
        }

        const job = await prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            return NextResponse.json({ message: "Job not found", error: true });
        }


        const existingApplication = await prisma.application.findUnique({
            where: {
                userId_jobId: {
                    userId: User.id,
                    jobId: jobId,
                },
            },
        });

        if (existingApplication) {
            return NextResponse.json({ message: "You have already applied for this job", error: true }, { status: 401 });
        }

        // ✅ Create new application
        const application = await prisma.application.create({
            data: {
                userId: User.id,
                jobId,
                status: "applied",
                resumeUrl: null,
                coverLetter: null,
            },
        });

        return NextResponse.json({ message: "Application submitted successfully", application, success: true }, { status: 201 });
    } catch (error) {
        console.error("Error posting job:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: true },
            { status: 500 }
        );
    }
}
