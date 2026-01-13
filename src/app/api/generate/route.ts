import { NextResponse } from 'next/server';
import yts from 'yt-search';

// Helper to simulate "AI" recipe logic (since we don't have a text-gen key)
// In a real app, this would call GPT-4/Gemini to get the text.
const generateRecipeText = (ingredients: string[]) => {
    const mainIngredient = ingredients[0] || 'Food';
    return {
        title: `Delicious ${mainIngredient} Special`,
        description: `A unique dish crafted from ${ingredients.join(', ')}. Perfect for a quick meal.`,
        prepTime: "25 mins",
        servings: 2,
        calories: "450",
        ingredients: ingredients,
        instructions: [
            `Wash and prepare the ${mainIngredient}.`,
            `Chop the ${ingredients[1] || 'vegetables'} into small pieces.`,
            `Heat a pan and sauté the ${ingredients[0]} until golden brown.`,
            `Mix all ingredients together and season well.`,
            `Serve hot and enjoy your custom creation.`
        ]
    };
};

export async function POST(request: Request) {
    try {
        const { ingredients } = await request.json();

        if (!ingredients || ingredients.length === 0) {
            return NextResponse.json({ error: 'Ingredients required' }, { status: 400 });
        }

        // 1. Generate Recipe Text
        const recipe = generateRecipeText(ingredients);

        // 2. Search for Real YouTube Video
        let videoId = null;
        try {
            // Search query: e.g. "Chicken Fish Recipe"
            const query = `${ingredients.join(' ')} recipe`;
            const searchResult = await yts(query);

            if (searchResult && searchResult.videos && searchResult.videos.length > 0) {
                // Get the top video
                videoId = searchResult.videos[0].videoId;
            }
        } catch (err) {
            console.error("YouTube search failed:", err);
            // Fallback to null, which will trigger the procedural video
        }

        // 3. Generate Procedural Video Frames (Fallback / Enhancer)
        const videoFrames = recipe.instructions.map((step, index) => {
            // Cycle through ingredients for each step to ensure variety and specific relevance
            // e.g. Step 1 -> Ingredient 1, Step 2 -> Ingredient 2, etc.
            const ingredientIndex = index % ingredients.length;
            const ingredient = ingredients[ingredientIndex].replace(/[^a-zA-Z0-9 ]/g, '').trim();

            // Primary keyword is the specific ingredient, secondary is generic 'food' for backup
            const keywords = `${ingredient},food`;

            // Use LoremFlickr for reliable, high-quality food images without strict rate limits
            return `https://loremflickr.com/1024/576/${keywords}?lock=${Math.floor(Math.random() * 1000) + index}`;
        });

        return NextResponse.json({
            ...recipe,
            videoFrames, // Array of image URLs to play as video
            videoId // Real YouTube ID
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
    }
}
