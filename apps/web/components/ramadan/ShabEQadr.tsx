"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SHAB_E_QADR_DUAS, SHAB_E_QADR_NAMAZ } from "@/lib/data/shab-e-qadr";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MoonStar, Sparkles, BookHeart, ScrollText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ShabEQadr() {
    const [activeTab, setActiveTab] = useState<"duas" | "namaz">("duas");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-gradient-to-br from-indigo-900 to-violet-950 border border-indigo-500/30 rounded-3xl p-6 shadow-lg shadow-indigo-900/20 cursor-pointer hover:border-indigo-400 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
                        <MoonStar className="w-24 h-24 text-indigo-300" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-800/50 text-indigo-200 rounded-full group-hover:scale-110 group-hover:bg-indigo-700 transition-all duration-500">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg drop-shadow-md">Shab-e-Qadr Guide</h3>
                        </div>
                        <p className="text-sm text-indigo-200/80 mb-4 max-w-xs transition-colors group-hover:text-indigo-100">
                            The Night of Power. Find the recommended Duas and Nawafil (prayers) for Laylatul Qadr.
                        </p>
                        <span className="text-indigo-300 text-sm font-semibold group-hover:text-indigo-200 flex items-center gap-2">
                            View Guide <ScrollText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-0 shadow-2xl">
                <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-6 pb-4">
                    <DialogHeader>
                        <div className="flex items-center gap-3 justify-center mb-2">
                            <MoonStar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <DialogTitle className="text-3xl font-serif text-slate-900 dark:text-slate-100">Shab-e-Qadr</DialogTitle>
                        </div>
                        <DialogDescription className="text-center text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                            &quot;The Night of Decree is better than a thousand months.&quot; (Quran 97:3)
                        </DialogDescription>
                    </DialogHeader>

                    {/* Tabs */}
                    <div className="flex mt-6 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 shadow-inner">
                        <button
                            onClick={() => setActiveTab("duas")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                                activeTab === "duas" 
                                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            <BookHeart className="w-4 h-4" /> Duas
                        </button>
                        <button
                            onClick={() => setActiveTab("namaz")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                                activeTab === "namaz" 
                                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            <Sparkles className="w-4 h-4" /> Namaz Methods
                        </button>
                    </div>
                </div>

                <div className="p-6 pt-2 bg-slate-50 dark:bg-slate-950 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "duas" ? (
                            <motion.div
                                key="duas"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {SHAB_E_QADR_DUAS.map((dua) => (
                                    <div key={dua.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200">{dua.title}</h4>
                                            <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md">
                                                {dua.source}
                                            </span>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-arabic text-right mb-5 leading-loose text-slate-900 dark:text-slate-100">
                                            {dua.arabic}
                                        </p>
                                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 italic mb-2">
                                                {dua.transliteration}
                                            </p>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                                &quot;{dua.translation}&quot;
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="namaz"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {SHAB_E_QADR_NAMAZ.map((namaz) => (
                                    <div key={namaz.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">{namaz.title}</h4>
                                            <span className="text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full whitespace-nowrap w-max">
                                                {namaz.rakats}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Method</h5>
                                            <ul className="space-y-2">
                                                {namaz.method.map((step, idx) => (
                                                    <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-0.5">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="leading-relaxed">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-3 flex gap-3">
                                            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500/80 mb-1">Benefit</h5>
                                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200/90 leading-relaxed">
                                                    {namaz.benefit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
