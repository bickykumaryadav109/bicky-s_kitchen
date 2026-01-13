'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Flame, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { searchRecipes } from '@/data/recipes';
import { Suspense } from 'react';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const recipes = searchRecipes(query);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="text-4xl font-bold mb-2">Search Results</h1>
                <p className="text-muted-foreground">
                    Found {recipes.length} results for <span className="font-bold text-foreground">"{query}"</span>
                </p>
            </div>

            {recipes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="group">
                            <div className="bg-card rounded-3xl p-6 border border-border/50 hover:shadow-lg transition-all hover:border-primary/50">
                                <div className="text-6xl mb-6 text-center bg-muted/20 rounded-2xl py-8 group-hover:scale-105 transition-transform">
                                    {recipe.image || '🍳'}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{recipe.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{recipe.prepTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-4 h-4" />
                                        <span>{recipe.calories} kcal</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-3xl">
                    <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No recipes found</h3>
                    <p className="text-muted-foreground mb-6">Try searching for something else like "breakfast" or "pasta"</p>
                    <Link href="/generate" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity inline-block">
                        Generate Custom Recipe
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
