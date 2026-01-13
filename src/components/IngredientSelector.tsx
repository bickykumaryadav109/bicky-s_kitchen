'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, X, Check } from 'lucide-react';

const COMMON_INGREDIENTS = {
    'Vegetables': ['Tomato', 'Onion', 'Potato', 'Carrot', 'Spinach', 'Garlic', 'Bell Pepper'],
    'Proteins': ['Chicken', 'Egg', 'Beef', 'Tofu', 'Salmon', 'Lentils'],
    'Pantry': ['Rice', 'Pasta', 'Flour', 'Sugar', 'Salt', 'Olive Oil', 'Milk'],
    'Spices': ['Black Pepper', 'Cumin', 'Turmeric', 'Paprika', 'Basil', 'Oregano']
};

interface IngredientSelectorProps {
    selectedIngredients: string[];
    onToggle: (ingredient: string) => void;
}

export function IngredientSelector({ selectedIngredients, onToggle }: IngredientSelectorProps) {
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onToggle(searchTerm.trim());
            setSearchTerm('');
        }
    };

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <form onSubmit={handleSearchAdd} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search or add any ingredient (e.g., 'Avocado')..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                />
                <button
                    type="button"
                    onClick={handleSearchAdd}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </form>

            {/* Categories */}
            <div className="space-y-6">
                {Object.entries(COMMON_INGREDIENTS).map(([category, ingredients]) => (
                    <div key={category}>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {ingredients.map((ing) => {
                                const isSelected = selectedIngredients.includes(ing);
                                return (
                                    <motion.button
                                        key={ing}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onToggle(ing)}
                                        className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all select-none flex items-center gap-2
                      ${isSelected
                                                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                                                : 'bg-card border border-border text-foreground hover:border-primary/50'
                                            }
                    `}
                                    >
                                        {ing}
                                        {isSelected && <Check className="w-3 h-3" />}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Summary */}
            <AnimatePresence>
                {selectedIngredients.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-border"
                    >
                        <h3 className="text-sm font-medium mb-3">Your Basket ({selectedIngredients.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedIngredients.map((ing) => (
                                <span key={ing} className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-sm flex items-center gap-2 border border-secondary/20">
                                    {ing}
                                    <button onClick={() => onToggle(ing)} className="hover:text-secondary/70">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper for AnimatePresence to work in same file
import { AnimatePresence } from 'framer-motion';
