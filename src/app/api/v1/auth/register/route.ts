import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
    try {
        const { name, email, password, phone, gender, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields", error: true }, { status: 400 });
        }


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
                phone: phone || null,
                // gender: gender || null,
                role: role || null,
                password: passwordHash,
            },
        });

        const token = jwt.sign(
            { userId: user.id, firebaseUid: user.firebaseUid },
            process.env.JWT_SECRET!,
        );
        const actionCodeSettings = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            handleCodeInApp: true
        };

        const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);
        const response = NextResponse.json({ message: "User registered successfully. Please verify your email.", success: true }, { status: 201 });

        response.cookies.set("jobPilotAuth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 90
        });
        return response
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
