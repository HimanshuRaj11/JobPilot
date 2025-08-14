import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        return NextResponse.json({})
    } catch (error) {
        return NextResponse.json({ error: true })
    }
}