'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Utensils, Video } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Bicky&apos;s Smart Kitchen Assistant</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Turn Ingredients into <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Visual Recipes
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your ingredients, generate a delicious recipe, and watch it come to life with our AI-generated cooking videos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/generate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl shadow-primary/30 flex items-center gap-2"
              >
                Start Cooking <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-card text-foreground border border-border rounded-full font-bold text-lg hover:bg-muted transition-colors"
              >
                Explore Recipes
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Utensils className="w-8 h-8 text-primary" />}
              title="Smart Ingredient Selector"
              description="Simply tap the ingredients you have in your fridge. We'll find the perfect match."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-secondary" />}
              title="AI Recipe Generation"
              description="Get detailed, step-by-step instructions tailored to your specific ingredients."
            />
            <FeatureCard
              icon={<Video className="w-8 h-8 text-primary" />}
              title="Visual Demonstrations"
              description="Watch AI-generated video walkthroughs to visualize the cooking process."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 bg-card rounded-2xl border border-border/50 hover:shadow-lg transition-all"
    >
      <div className="mb-4 p-3 bg-background rounded-xl w-fit border border-border/50">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
