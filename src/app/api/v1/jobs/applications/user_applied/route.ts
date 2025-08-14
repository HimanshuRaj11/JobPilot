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

        const Applications = await prisma.application.findMany({
            where: {
                userId: User.id
            },
            include: {
                job: {
                    include: {
                        company: true
                    }
                }
            }
        });

        return NextResponse.json({ Applications, success: true }, { status: 200 })

    } catch (error) {
        console.error("Update Company Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}