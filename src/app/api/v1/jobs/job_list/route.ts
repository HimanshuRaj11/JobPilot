import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        // Get query params
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ message: "Search query is required", error: true }, { status: 400 });
        }
        console.log(query);

        // Split search string into words
        const keywords = query.split(" ").filter(Boolean);
        console.log(keywords);


        const jobs = await prisma.job.findMany({
            where: {
                AND: keywords.map(word => ({
                    OR: [
                        { title: { contains: word, mode: "insensitive" } },
                        { skills: { contains: word, mode: "insensitive" } },
                        { requirements: { contains: word, mode: "insensitive" } },
                        { location: { contains: word, mode: "insensitive" } },
                    ]
                }))
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, jobs });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
