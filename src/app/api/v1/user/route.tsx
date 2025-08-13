import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";
import { NextResponse } from "next/server";

export async function GET(Req: Request) {
    try {
        const userId = await verifyUser() as string;

        const User = await prisma.user.findUnique({
            where: { id: userId },
        })
        if (!User) return NextResponse.json({ message: "User not Found Please Login...", error: true })
        const { password, ...safeUser } = User;
        return NextResponse.json({ User: safeUser })

    } catch (error) {
        console.error("Update Company Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}