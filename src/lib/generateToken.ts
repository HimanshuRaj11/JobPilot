import crypto from "crypto";
import prisma from "@/lib/prisma";
import { verifyUser } from "./verifyUser";
import { NextResponse } from "next/server";
import { SendEmail } from "./sendemail";

export async function sendVerificationEmail() {

    const userId = await verifyUser() as string;
    const User = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            applications: true,
            Address: true
        }
    })
    if (!User) return NextResponse.json({ message: "User not Found Please Login...", error: true })
    const email = User.email
    if (!email) {
        return NextResponse.json({ error: "Email is required" });
    }
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.emailVerificationToken.deleteMany({
        where: { userId },
    });

    const verificationToken = await prisma.emailVerificationToken.create({
        data: {
            token,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        },
    });
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken.id}`;

    await SendEmail(email, verifyUrl);

    return verifyUrl
}
