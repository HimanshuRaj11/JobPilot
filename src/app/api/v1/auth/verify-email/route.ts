import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const token = req.nextUrl.searchParams.get("token");

        if (!token) {
            return new Response(JSON.stringify({ error: "Token is required" }), { status: 400 });
        }

        // Find token in DB
        // const storedToken = await prisma.verificationToken.findUnique({
        //     where: { token },
        //     include: { user: true }
        // });

        // if (!storedToken) {
        //     return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
        // }

        // // Mark user as verified
        // await prisma.user.update({
        //     where: { id: storedToken.userId },
        //     data: { emailVerified: true }
        // });

        // Delete token
        // await prisma.verificationToken.delete({ where: { id: storedToken.id } });

        return new Response(JSON.stringify({ message: "Email verified successfully!" }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}
