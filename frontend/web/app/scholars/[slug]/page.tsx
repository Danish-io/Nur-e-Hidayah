"use client";

import { useState } from "react";
import { scholars } from "@/data/scholars";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, GraduationCap, BookOpen, Baby } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScholarLevel } from "@/types/scholar";

export default function ScholarProfile({ params }: { params: { slug: string } }) {
    const scholar = scholars.find((s) => s.id === params.slug);
    const [lang, setLang] = useState<'en' | 'ar'>('en');
    const [level, setLevel] = useState<ScholarLevel>('madrasah');

    if (!scholar) {
        notFound();
    }

    const isRtl = lang === 'ar';

    const levels: { id: ScholarLevel; icon: React.ReactNode; label: string }[] = [
        { id: 'kids', icon: <Baby className="w-4 h-4" />, label: "Kids" },
        { id: 'madrasah', icon: <BookOpen className="w-4 h-4" />, label: "Madrasah" },
        { id: 'university', icon: <GraduationCap className="w-4 h-4" />, label: "University" },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Nav */}
            <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/scholars"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Scholars
                    </Link>

                    <button
                        onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
                        className="text-sm font-medium px-4 py-1.5 rounded-full bg-accent/50 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                    </button>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-6 py-12">
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn("space-y-8", isRtl && "text-right", isRtl ? "rtl" : "ltr")}
                    dir={isRtl ? "rtl" : "ltr"}
                >
                    {/* Title Section */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-amber-500 font-medium tracking-wider uppercase">
                            <span>{scholar.school}</span>
                            <span>•</span>
                            <span>{scholar.era}</span>
                            <span>•</span>
                            <span>{scholar.region}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            {scholar.name[lang]}
                        </h1>
                    </div>

                    {/* Level Toggle */}
                    <div className="flex flex-wrap gap-2 p-1 bg-muted/40 rounded-xl w-fit border border-border/40">
                        {levels.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => setLevel(l.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                    level === l.id
                                        ? "bg-amber-100 text-amber-700 shadow-sm dark:bg-amber-900/40 dark:text-amber-300"
                                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                )}
                            >
                                {l.icon}
                                <span>{l.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Card */}
                    <motion.div
                        key={level + lang} // Re-animate when filter changes
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-xl"
                    >
                        <p className="text-lg md:text-xl leading-relaxed text-card-foreground/90 font-serif">
                            {scholar.bio[level][lang]}
                        </p>
                    </motion.div>

                </motion.article>
            </main>
        </div>
    );
}
