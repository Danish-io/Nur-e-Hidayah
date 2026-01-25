"use client";

import { useState } from "react";
import { scholars } from "@/data/scholars";
import { ScholarCard } from "@/components/scholars/ScholarCard";
import { ScholarFilters } from "@/components/scholars/ScholarFilters";
import { motion } from "framer-motion";

export default function ScholarsPage() {
    const [filters, setFilters] = useState({
        school: "All",
        era: "All",
        region: "All"
    });

    const [lang, setLang] = useState<'en' | 'ar'>('en');

    const filteredScholars = scholars.filter(s =>
        (filters.school === "All" || s.school === filters.school) &&
        (filters.era === "All" || s.era === filters.era) &&
        (filters.region === "All" || s.region === filters.region)
    );

    const uniqueSchools = Array.from(new Set(scholars.map(s => s.school)));
    const uniqueEras = Array.from(new Set(scholars.map(s => s.era)));
    const uniqueRegions = Array.from(new Set(scholars.map(s => s.region)));

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Section */}
            <section className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 tracking-tight">
                        Scholars of Islam
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        Discover the lives and legacies of the great minds who shaped Islamic thought.
                    </p>

                    <button
                        onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
                        className="px-6 py-2 rounded-full border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
                    >
                        {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                    </button>
                </motion.div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6">
                <ScholarFilters
                    filters={filters}
                    setFilters={setFilters}
                    schools={uniqueSchools}
                    eras={uniqueEras}
                    regions={uniqueRegions}
                />

                {filteredScholars.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-muted-foreground"
                    >
                        <p>No scholars found matching your criteria.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredScholars.map(scholar => (
                            <ScholarCard key={scholar.id} scholar={scholar} lang={lang} />
                        ))}
                    </motion.div>
                )}
            </main>
        </div>
    );
}
