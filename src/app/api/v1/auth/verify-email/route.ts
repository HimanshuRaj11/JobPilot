import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token not found" })
        }



        const storedToken = await prisma.emailVerificationToken.findUnique({
            where: { id: token }
        });
        console.log(storedToken, ":   Stored token");


        if (!storedToken) {
            return NextResponse.json({ storedToken, message: "Invalid or expired token", error: true })
        }


        const user = await prisma.user.update({
            where: { id: storedToken.userId },
            data: { emailVerified: true }
        });
        console.log(user);


        await prisma.emailVerificationToken.delete({ where: { id: storedToken.id } });

        return NextResponse.json({ message: "Email verified successfully!", success: true, storedToken });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "internal server error" })
    }
}
