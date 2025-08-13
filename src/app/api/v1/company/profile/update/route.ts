
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verifyUser";


// put - update company profile

export async function PUT(req: Request) {
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

        if (!User.emailVerified) {
            return NextResponse.json(
                { message: "Email not verified. Please verify before updating company.", error: true },
                { status: 403 }
            );
        }

        const body = await req.json();

        const {
            name,
            websiteUrl,
            logoUrl,
            location,
            established,
            phone,
            email,
            industry,
            size,
            bannerUrl,
            description,
            socialLinks,
            verified,
        } = body;

        const company = await prisma.company.findFirst({
            where: { ownerId: User.id },
        });

        if (!company) {
            return NextResponse.json(
                { message: "Company not found", error: true },
                { status: 404 }
            );
        }

        // 5️⃣ Update the company
        const updatedCompany = await prisma.company.update({
            where: { id: company.id },
            data: {
                name,
                websiteUrl,
                logoUrl,
                location,
                established: established ? new Date(established) : undefined,
                phone,
                email,
                industry,
                size,
                bannerUrl,
                description,
                verified,
            },
        });

        if (Array.isArray(socialLinks) && socialLinks.length > 0) {
            const formattedLinks = socialLinks.map((link) => ({
                label: link.label,
                url: link.link,
                companyId: company.id,
            }));

            await prisma.socialLink.createMany({
                data: formattedLinks,
            });
        }
        return NextResponse.json(
            { message: "Company updated successfully", company: updatedCompany, success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update Company Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}
