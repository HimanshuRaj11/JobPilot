import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const data = await req.json();
        const { email, password } = data
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required", error: true }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password", error: true }, { status: 401 })
        }

        const isPasswordValid = await bcrypt.compare(password, (user as any).password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password", error: true }, { status: 401 })
        }

        const { password: _, ...userWithoutPassword } = user;
        const token = jwt.sign(
            { userId: user.id, firebaseUid: user.firebaseUid },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        const response = NextResponse.json({ user: userWithoutPassword, token, success: true }, { status: 200 });

        response.cookies.set("jobPilotAuth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error", error: true }, { status: 500 });
    }
}
