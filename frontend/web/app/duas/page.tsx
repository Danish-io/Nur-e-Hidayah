"use client";
import { useState } from "react";
import { duas, Dua } from "@/lib/data/duas";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, BookOpen, Share2, Copy } from "lucide-react";

export default function DuasPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All Duas");

    const categories = [
        { name: "All Duas", icon: "📿", count: duas.length },
        { name: "Morning", icon: "🌅", count: duas.filter(d => d.category === "Morning").length },
        { name: "Evening", icon: "🌙", count: duas.filter(d => d.category === "Evening").length },
        { name: "Daily", icon: "🕌", count: duas.filter(d => d.category === "Daily").length },
        { name: "Selected", icon: "⭐", count: duas.filter(d => d.category === "Selected").length },
        { name: "After Salah", icon: "🕋", count: duas.filter(d => d.category === "After Salah").length },
        { name: "Ramadan", icon: "📖", count: duas.filter(d => d.category === "Ramadan").length },
    ];

    const filteredDuas = selectedCategory === "All Duas"
        ? duas
        : duas.filter(d => d.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-24 px-4 font-sans text-slate-800 dark:text-slate-100">
            <div className="container mx-auto max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3 text-slate-800 dark:text-gray-100 tracking-tight">Daily Adhkar & Duas</h1>
                    <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full opacity-50"></div>
                </header>

                {/* Categories Row */}
                <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar mb-10 justify-start w-full px-1">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center whitespace-nowrap px-5 py-2.5 rounded-full border transition-all duration-200 text-sm font-semibold tracking-wide ${selectedCategory === cat.name
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20 transform -translate-y-0.5"
                                : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-zinc-600 hover:shadow-md"
                                }`}
                        >
                            <span className="mr-2.5 text-lg">{cat.icon}</span>
                            {cat.name}
                            <span className={`ml-2.5 text-xs py-0.5 px-2 rounded-full font-bold ${selectedCategory === cat.name
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-500"
                                }`}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Duas List - Single Column for Focus */}
                <div className="space-y-12">
                    {filteredDuas.map((dua) => (
                        <DuaCard key={dua.id} dua={dua} />
                    ))}
                </div>

                {filteredDuas.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <p className="text-lg">No duas found in this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function DuaCard({ dua }: { dua: Dua }) {
    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-50 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow pt-10 pb-6 px-6 md:px-10"
        >
            {/* ID Badge - Centered Top */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-50 dark:bg-zinc-900 border-2 border-amber-100 dark:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 font-bold shadow-sm z-10">
                {dua.id}
            </div>

            {/* Header: Category & Title */}
            <div className="mb-8">
                <span className="inline-block bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-3">
                    {dua.category}
                </span>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-gray-100">{dua.title}</h3>
                    {/* Actions Row */}
                    <div className="flex space-x-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors bg-gray-50 dark:bg-zinc-800 rounded-lg">
                            <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors bg-gray-50 dark:bg-zinc-800 rounded-lg">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Arabic Content Area with Decorative Corners */}
            <div className="relative bg-[#FFFCF7] dark:bg-black/20 rounded-xl p-8 md:p-12 mb-6 border border-amber-50/50 dark:border-white/5">
                {/* Decorative Corners (Feathers) */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-br-lg"></div>

                <p className="text-center font-arabic text-3xl md:text-4xl leading-loose text-slate-800 dark:text-slate-100 loading-relaxed" dir="rtl">
                    {dua.arabic}
                </p>
            </div>

            {/* Translation Actions */}
            <div className="flex flex-col items-center">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${showTranslation
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-gray-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        <span>Translation</span>
                        {showTranslation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button className="flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg shadow-emerald-200 dark:shadow-none">
                        <BookOpen className="w-4 h-4" />
                        <span>Read Full</span>
                    </button>
                </div>

                <AnimatePresence>
                    {showTranslation && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden w-full text-center"
                        >
                            <div className="pt-2 pb-4 space-y-4 max-w-2xl mx-auto border-t border-gray-100 dark:border-zinc-800 mt-2">
                                <div>
                                    <h4 className="text-emerald-600 dark:text-emerald-500 text-sm font-bold uppercase tracking-wide mb-1">Transliteration</h4>
                                    <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                                        &quot;{dua.transliteration}&quot;
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-emerald-600 dark:text-emerald-500 text-sm font-bold uppercase tracking-wide mb-1">Meaning</h4>
                                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                        {dua.translation}
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <span className="text-xs text-slate-400 bg-slate-50 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                        Reference: {dua.source}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
