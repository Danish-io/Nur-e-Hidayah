"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EMOTIONAL_DUAS } from "@/lib/data/ramadan-duas";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EmotionalDuas() {
    const [selectedEmotion, setSelectedEmotion] = useState<string>("All");

    const filteredDuas = selectedEmotion === "All"
        ? EMOTIONAL_DUAS
        : EMOTIONAL_DUAS.filter(d => d.emotion === selectedEmotion);

    const emotions = ["All", ...Array.from(new Set(EMOTIONAL_DUAS.map(d => d.emotion)))];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm cursor-pointer hover:border-emerald-200 transition-all duration-500 hover:shadow-md group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-rose-100 dark:bg-rose-900/20 text-rose-600 rounded-full group-hover:scale-110 transition-transform duration-500">
                            <Heart className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">Feeling Heavy?</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-400">
                        A curated list of Duas for when the heart feels overwhelmed.
                    </p>
                    <span className="text-emerald-600 text-sm font-medium group-hover:underline flex items-center gap-2">
                        Browse Duas <Search className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[80vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">Duas for the Heart</DialogTitle>
                    <DialogDescription>
                        Select how you are feeling to find the perfect supplication.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 pb-4 overflow-x-auto custom-scrollbar">
                    {emotions.map(e => (
                        <button
                            key={e}
                            onClick={() => setSelectedEmotion(e)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                                selectedEmotion === e
                                    ? "bg-emerald-600 text-white scale-105 shadow-md shadow-emerald-500/20"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500"
                            )}
                        >
                            {e}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredDuas.map((dua) => (
                            <motion.div
                                key={dua.id}
                                layout
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className={cn(
                                        "text-xs font-bold px-2 py-1 rounded-md bg-opacity-10",
                                        dua.emotion === "Guilt" ? "bg-orange-500 text-orange-600" :
                                            dua.emotion === "Anxiety" ? "bg-blue-500 text-blue-600" :
                                                "bg-emerald-500 text-emerald-600"
                                    )}>
                                        {dua.emotion}
                                    </span>
                                    <span className="text-xs text-slate-400">{dua.source}</span>
                                </div>
                                <p className="text-2xl font-arabic text-right mb-4 leading-loose text-slate-800 dark:text-slate-100">{dua.arabic}</p>
                                <p className="text-sm text-slate-500 italic mb-2">{dua.transliteration}</p>
                                <p className="text-base font-medium text-slate-700 dark:text-slate-300">&quot;{dua.translation}&quot;</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
