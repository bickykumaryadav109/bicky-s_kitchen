'use client';

import { Clock, Users, Flame } from 'lucide-react';

interface Recipe {
    title: string;
    description: string;
    prepTime: string;
    servings: number;
    calories: string;
    ingredients: string[];
    instructions: string[];
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-8 border-b border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{recipe.servings} Servings</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span>{recipe.calories} kcal</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-6 font-serif">Ingredients</h3>
                    <ul className="space-y-3">
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                <span>{ing}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-6 font-serif">Instructions</h3>
                    <ol className="space-y-6">
                        {recipe.instructions.map((step, i) => (
                            <li key={i} className="relative pl-8">
                                <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center border border-secondary/20">
                                    {i + 1}
                                </span>
                                <p className="text-muted-foreground leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
