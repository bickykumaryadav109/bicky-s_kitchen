'use client';

import { useEffect, useState } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import { ChefHat, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const res = await fetch('/api/recipes/list');
            if (res.status === 401) {
                window.location.href = '/api/auth/signin';
                return;
            }
            if (!res.ok) throw new Error('Failed to fetch recipes');
            const data = await res.json();
            setRecipes(data.recipes);
        } catch (err) {
            console.error(err);
            setError('Failed to load your cookbook.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="relative bg-muted/30 border-b border-border py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">My Cookbook</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        All your culinary creations in one place.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {error && (
                    <div className="text-center text-red-500 mb-8 p-4 bg-red-500/10 rounded-xl">
                        {error}
                    </div>
                )}

                {recipes.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center gap-4">
                        <div className="p-4 bg-muted rounded-full">
                            <ChefHat className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">Your cookbook is empty</h3>
                        <p className="text-muted-foreground">Start creating magic in the kitchen!</p>
                        <Link
                            href="/generate"
                            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            Generate First Recipe
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="block group">
                                <RecipeCard
                                    recipe={{
                                        ...recipe,
                                        image: recipe.videoFrames?.[0] || 'https://loremflickr.com/800/600/food' // Fallback image
                                    }}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
