'use client';

import Link from 'next/link';
import { ChefHat, Menu, X, Sparkles, Search } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
                        Bicky&apos;s Kitchen
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-muted/50 border border-border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 transition-all group-hover:w-64 focus:w-64"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/book-chef" className="text-sm font-medium hover:text-primary transition-colors">
                        Book Chef
                    </Link>
                    <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                        Recipes
                    </Link>
                    <Link href="/generate">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate Recipe
                        </motion.div>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-border"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="relative mb-2">
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-muted/50 border border-border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                                    <Search className="w-4 h-4" />
                                </button>
                            </form>
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium py-2 hover:text-primary"
                            >
                                Home
                            </Link>
                            <Link
                                href="/categories"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium py-2 hover:text-primary"
                            >
                                Recipes
                            </Link>
                            <Link
                                href="/generate"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-sm font-medium py-2 text-primary"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate Recipe
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
