import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
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

        // validate ApplicationId belongs to Company -- not working Application model for CompanyId due to migration issue -- done later


        const { id, status } = await req.json()

        const application = await prisma.application.findUnique({
            where: {
                id: id
            }
        })

        if (!application) {
            throw new Error("Application not found");
        }

        await prisma.application.update({
            where: { id: id },
            data: { status }
        });



        return NextResponse.json({ message: "Status Updated", success: true }, { status: 200 })

    } catch (error) {
        console.error("Update Company Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}