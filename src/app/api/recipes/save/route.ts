import { NextResponse } from 'next/server';
import { auth } from "@/auth"; // Use our custom auth helper
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, ingredients, instructions, videoFrames, videoId, searchQuery } = body;

        // Validation
        if (!title || !description) {
            return NextResponse.json({ error: 'Missing recipe details' }, { status: 400 });
        }

        // Find the user by email to get their ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User record not found' }, { status: 404 });
        }

        // Save to Database
        const savedRecipe = await prisma.recipe.create({
            data: {
                title,
                description,
                ingredients: ingredients || [],
                instructions: instructions || [],
                videoFrames: videoFrames || [],
                videoId: videoId || null,
                videoQuery: searchQuery || null,
                userId: user.id
            }
        });

        return NextResponse.json({ success: true, recipeId: savedRecipe.id });

    } catch (error) {
        console.error("Failed to save recipe:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
