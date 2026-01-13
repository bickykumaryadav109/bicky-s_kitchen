'use client';

import { motion } from 'framer-motion';
import { ChefHat, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function BookChefPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Hire a Private Chef</h1>
                <p className="text-muted-foreground text-lg">
                    Transform your kitchen into a 5-star restaurant. Our verified chefs bring the ingredients and the magic.
                </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="text-primary" /> Event Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <input type="date" className="w-full p-3 bg-muted/20 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Time</label>
                                <input type="time" className="w-full p-3 bg-muted/20 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input type="text" placeholder="Enter your address" className="w-full pl-10 p-3 bg-muted/20 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl mt-4 hover:opacity-90 transition-opacity">
                            Next: Choose Menu
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <ChefHat className="text-primary" /> Select Chef Preference
                        </h2>

                        <div className="grid gap-4">
                            {['Professional Chef (₹5000/meal)', 'Home Cook Specialist (₹1500/meal)', 'Michelin Star Experience (₹15000/meal)'].map((opt) => (
                                <button key={opt} className="p-4 border border-border rounded-xl text-left hover:border-primary hover:bg-primary/5 transition-all font-medium">
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button onClick={() => setStep(1)} className="flex-1 py-4 border border-border font-bold rounded-xl hover:bg-muted transition-colors">
                                Back
                            </button>
                            <button onClick={() => setStep(3)} className="flex-1 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">
                                Review & Book
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
                        <p className="text-muted-foreground">
                            Your request has been sent to our chef network. You will receive a confirmation call shortly.
                        </p>
                        <button onClick={() => setStep(1)} className="px-8 py-3 bg-muted text-foreground font-medium rounded-full hover:bg-muted/80">
                            Book Another
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
