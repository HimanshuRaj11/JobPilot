import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface PageProps {
    params: {
        id: string;
    };
}

// GET /api/v1/company/[id]
export async function GET(req: Request, { params }: PageProps) {
    try {
        const companyId = params.id;

        if (!companyId) {
            return NextResponse.json(
                { error: "Company ID is required" },
                { status: 400 }
            );
        }

        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: {
                SocialLinks: true,
                Address: true,
            },
        });

        if (!company) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ company, success: true });
    } catch (error) {
        console.error("Error fetching company:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
