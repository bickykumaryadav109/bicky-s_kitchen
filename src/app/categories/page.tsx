import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = [
    { name: 'Breakfast', image: '🥞', color: 'bg-orange-100 text-orange-600' },
    { name: 'Vegan', image: '🥗', color: 'bg-green-100 text-green-600' },
    { name: 'Desserts', image: '🍰', color: 'bg-pink-100 text-pink-600' },
    { name: 'Quick Meals', image: '⚡', color: 'bg-blue-100 text-blue-600' },
    { name: 'Italian', image: '🍝', color: 'bg-red-100 text-red-600' },
    { name: 'Healthy', image: '🥑', color: 'bg-emerald-100 text-emerald-600' },
];

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="text-4xl font-bold">Browse Categories</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                    <Link href={`/categories/${cat.name.toLowerCase()}`} key={cat.name} className="group">
                        <div className={`aspect-square rounded-3xl ${cat.color} flex flex-col items-center justify-center gap-4 transition-transform group-hover:scale-105`}>
                            <span className="text-5xl">{cat.image}</span>
                            <span className="font-bold text-lg">{cat.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
