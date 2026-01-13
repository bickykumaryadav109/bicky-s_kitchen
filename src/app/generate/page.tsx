'use client';

import { useState } from 'react';
import { IngredientSelector } from '@/components/IngredientSelector';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GeneratePage() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const toggleIngredient = (ing: string) => {
        setIngredients(prev =>
            prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
        );
    };

    const handleGenerate = async () => {
        if (ingredients.length === 0) return;

        setIsGenerating(true);

        try {
            // Call our API
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients }),
            });

            const data = await response.json();

            if (data) {
                // Store data in localStorage to pass to the detail page (simple state sharing)
                // In a real app, we'd save to DB and render by ID.
                localStorage.setItem('generatedRecipe', JSON.stringify(data));
                router.push('/recipe/generated');
            }
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            // setIsGenerating(false); // Don't turn off, we are navigating
        }
    };

    return (
        <div className="min-h-screen bg-muted/10 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12 space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <ChefHat className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tight">What&apos;s in your Kitchen?</h1>
                    <p className="text-muted-foreground text-lg">
                        Select at least 3 ingredients and let our AI Chef design a masterpiece.
                    </p>
                </div>

                <div className="bg-card rounded-3xl shadow-xl shadow-black/5 p-8 md:p-12 border border-border/50">
                    <IngredientSelector
                        selectedIngredients={ingredients}
                        onToggle={toggleIngredient}
                    />

                    <div className="mt-12 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={ingredients.length === 0 || isGenerating}
                            onClick={handleGenerate}
                            className={`
                w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${ingredients.length > 0
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 cursor-pointer'
                                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                                }
              `}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating Video...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Magic Recipe
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
