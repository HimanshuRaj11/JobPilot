import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields", error: true }, { status: 400 });
        }

        // 1. Create user in Firebase
        const firebaseUser = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });


        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firebaseUid: firebaseUser.uid,
                name,
                email,
                password: passwordHash,
            },
        });

        const token = jwt.sign(
            { userId: user.id, firebaseUid: user.firebaseUid },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const link = await admin.auth().generateEmailVerificationLink(email);
        const response = NextResponse.json({ message: "User registered successfully. Please verify your email.", success: true }, { status: 201 });

        response.cookies.set("jobPilotAuth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return response
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
