'use client';

import { VideoPlayer } from '@/components/VideoPlayer';
import { RecipeCard } from '@/components/RecipeCard';
import { motion } from 'framer-motion';
import { Share2, Heart, ArrowLeft, ChefHat, Bookmark } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

import { getRecipeById } from '@/data/recipes';

function RecipeContent() {
    const { id } = useParams() as { id: string };
    const [recipe, setRecipe] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        if (!recipe) return;
        setIsSaving(true);
        try {
            const response = await fetch('/api/recipes/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe),
            });

            if (response.status === 401) {
                // Not logged in
                window.location.href = "/api/auth/signin";
                return;
            }

            if (response.ok) {
                alert("Recipe saved to your cookbook!");
            } else {
                alert("Failed to save recipe.");
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (id === 'generated') {
            const stored = localStorage.getItem('generatedRecipe');
            if (stored) {
                setRecipe(JSON.parse(stored));
            } else {
                setRecipe(getRecipeById('demo'));
            }
        } else if (id) {
            const found = getRecipeById(id);
            setRecipe(found || getRecipeById('demo'));
        }
    }, [id]);

    if (!recipe) return <div className="min-h-screen grid place-items-center">Loading Recipe...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Recipes
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-medium text-primary uppercase tracking-wide mb-2"
                    >
                        AI Generated Recipe
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground"
                    >
                        {recipe.title}
                    </motion.h1>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{recipe.description}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium flex items-center gap-2"
                    >
                        <Bookmark className="w-5 h-5" />
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button className="p-3 rounded-full hover:bg-muted transition-colors border border-border">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8">
                {/* Video Section */}
                <section>
                    <VideoPlayer
                        videoFrames={recipe.videoFrames || []}
                        instructions={recipe.instructions || []}
                        videoId={recipe.videoId}
                        searchQuery={recipe.searchQuery}
                    />
                    <div className="mt-6 flex justify-center">
                        <Link href="/book-chef">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:shadow-secondary/40"
                            >
                                <ChefHat className="w-5 h-5" />
                                Hire a Chef to Cook This
                            </motion.button>
                        </Link>
                    </div>
                </section>

                {/* Recipe Details */}
                <section>
                    <RecipeCard recipe={recipe} />
                </section>
            </div>
        </div>
    );
}

export default function RecipePage() {
    return (
        <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
            <RecipeContent />
        </Suspense>
    )
}
