'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Flame } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';

import { getRecipesByCategory } from '@/data/recipes';

export default function CategoryParamsPage({ params }: { params: { slug: string } }) {
    // To support Next.js 15+ standard we might need to await params in server components
    // but since this is client component (use client) or standard next 14, params come as props.
    // Wait, in Next 13/14 App dir, pages receive params.
    // Let's rely on standard params prop.

    // NOTE: For client component, we should use useParams() hook or get params from props if async.
    // Let's use useParams() for safety in client component wrapper if needed, 
    // but page props work fine usually. Let's use useParams to be safe since I marked it 'use client'.
    const { slug } = useParams() as { slug: string };
    const decodedSlug = decodeURIComponent(slug || '');

    const recipes = getRecipesByCategory(decodedSlug);

    if (!slug) return null;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Categories
                </Link>
                <h1 className="text-4xl font-bold capitalize">{decodedSlug} Recipes</h1>
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
                    <p className="text-xl text-muted-foreground">No recipes found for this category yet.</p>
                    <Link href="/generate" className="text-primary font-bold mt-4 inline-block hover:underline">
                        Generate your own?
                    </Link>
                </div>
            )}
        </div>
    );
}
