"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, BookOpen } from "lucide-react";
import { fetchSurah, SurahData } from "@/lib/get-quran";
import { VerseCard } from "./verse-card";
import { Button } from "@/components/ui/button";

interface SurahOverlayProps {
    surahId?: number | null;
    juzId?: number | null;
    initialVerseId?: number | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SurahOverlay({ surahId, juzId, initialVerseId, isOpen, onClose }: SurahOverlayProps) {
    const [surah, setSurah] = useState<SurahData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            if (juzId) {
                import("@/lib/get-quran").then(m => m.fetchJuz(juzId)).then((data) => {
                    setSurah(data);
                    setLoading(false);
                });
            } else if (surahId) {
                import("@/lib/get-quran").then(m => m.fetchSurah(surahId)).then((data) => {
                    setSurah(data);
                    setLoading(false);
                });
            }
        }
    }, [isOpen, surahId, juzId]);

    useEffect(() => {
        if (!loading && initialVerseId) {
            const timer = setTimeout(() => {
                const element = document.getElementById(`verse-${initialVerseId}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading, initialVerseId]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
                
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl h-full max-h-[90vh] bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-800"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-100">
                                    {loading ? "Loading..." : surah?.transliteration}
                                </h2>
                                <p className="text-sm text-slate-400">
                                    {loading ? "Please wait" : `${surah?.name} • ${surah?.total_verses} Verses`}
                                </p>
                            </div>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={onClose}
                            className="rounded-full text-slate-400 hover:bg-zinc-800 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-4 bg-zinc-950">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                                <p className="text-slate-500 animate-pulse">Fetching Holy Verses...</p>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto space-y-4">
                                {surah?.verses.map((verse) => (
                                    <div key={verse.id} id={`verse-${verse.id}`}>
                                        <VerseCard 
                                            verse={verse} 
                                            surahId={surah.id} 
                                            isActive={verse.id === initialVerseId} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="p-4 border-t border-zinc-800 text-center bg-zinc-900/50">
                        <p className="text-xs text-slate-500 italic">
                            May Allah accept your recitation on this blessed night.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
