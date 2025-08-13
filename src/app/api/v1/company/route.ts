import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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
        // const company = await prisma.company.findUnique({
        //     where: { id: companyId },
        //     include: {
        //         SocialLinks: true,
        //         Address: true,
        //     },
        // });
        if (!company) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ company });
    } catch (error) {
        console.error("Error fetching company:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
