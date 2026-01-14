import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Test 1: Check Env Vars
        const dbUrl = process.env.DATABASE_URL;
        const hasAuthSecret = !!process.env.AUTH_SECRET;

        // Test 2: Try simple DB query
        const userCount = await prisma.user.count();

        return NextResponse.json({
            status: "ok",
            env: {
                hasDbUrl: !!dbUrl,
                hasAuthSecret,
                nodeEnv: process.env.NODE_ENV
            },
            dbConnection: "success",
            userCount
        });

    } catch (error: any) {
        console.error("Debug Error:", error);
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
