
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/generateToken";

export async function GET(req: Request) {
    try {

        const token = await sendVerificationEmail()

        return NextResponse.json({ token, message: "Verification link sent" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message });
    }
}
