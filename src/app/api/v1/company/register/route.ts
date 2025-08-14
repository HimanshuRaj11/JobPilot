import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import cloudinary from "@/lib/cloudnary";
export async function POST(req: Request) {
    try {

        // Middleware should attach user info to request
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

        // 1. Check email verification
        if (!User.emailVerified) {
            return NextResponse.json(
                { message: "Email not verified. Please verify before creating a company.", error: true },
                { status: 403 }
            );
        }

        const CheckCompany = await prisma.company.findFirst({
            where: {
                ownerId: User.id
            }
        })

        if (CheckCompany) return NextResponse.json({ message: "Company all ready register ", error: true }, { status: 500 })

        // 2. Get request body
        const { CompanyRegisterData, logo, banner } = await req.json();

        const {
            name, email, websiteUrl, type, phone, industry, size, description, established, location,
        } = CompanyRegisterData

        if (!logo || !banner) return NextResponse.json({ message: "Something went wrong", error: true }, { status: 500 }
        );
        const logoRes = await cloudinary.uploader.upload(logo, {
            resource_type: "image",
            folder: 'JOB_PILOT',
        })
        const bannerRes = await cloudinary.uploader.upload(banner, {
            resource_type: "image",
            folder: 'JOB_PILOT',
        })

        if (!logoRes || !bannerRes) return NextResponse.json({ error: "Something went wrong" }, { status: 500 })

        // 3. Create company

        const company = await prisma.company.create({
            data: {
                name,
                email, websiteUrl, phone, industry, size, description, location,
                ownerId: User.id,
                logoUrl: logoRes.url,
                bannerUrl: bannerRes.url
            },
        });

        return NextResponse.json(
            { message: "Company registered", company, success: true },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
