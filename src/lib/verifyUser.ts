
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
interface DecodedToken {
    userId: string;
    key: string;
}


export const verifyUser = async (): Promise<string | NextResponse> => {
    const cookiesObj = await cookies();
    const token = cookiesObj.get("jobPilotAuth")?.value;

    try {
        if (!token) {
            return NextResponse.json({ message: "Token not found!" }, { status: 401 });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        if (!decodedToken) {
            return NextResponse.json({ message: "User Not verified!!!", error: true }, { status: 401 });
        }
        return decodedToken.userId;
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" });
    }
}

