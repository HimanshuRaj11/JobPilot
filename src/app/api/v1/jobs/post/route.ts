// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";

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

        const company = await prisma.company.findFirst({
            where: { ownerId: User.id },
        });
        if (!company) {
            return NextResponse.json(
                { message: "Company not found", error: true },
                { status: 404 }
            );
        }
        const data = await req.json();

        const {
            title,
            description,
            location,
            minSalary,
            maxSalary,
            employmentType,
            role,
            experienceLevel,
            remote,
            skills,
            requirements,
            benefits,
        } = data;


        const job = await prisma.job.create({
            data: {
                title,
                description,
                postedBy: User.id,
                companyId: company.id,
                location,
                minSalary,
                maxSalary,
                employmentType,
                role,
                experienceLevel,
                remote: remote ?? false,
                skills,
                requirements,
                benefits,
            },
        });

        return NextResponse.json(
            { message: "Job posted successfully", job, success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error posting job:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: true },
            { status: 500 }
        );
    }
}
