"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, BookOpen } from "lucide-react";
import { fetchSurah, SurahData } from "@/lib/get-quran";
import { Button } from "@/components/ui/button";

interface SurahOverlayProps {
    surahId?: number | null;
    juzId?: number | null;
    initialVerseId?: number | null;
    isOpen: boolean;
    onClose: () => void;
}

type TranslationLang = "english" | "urdu" | "roman";

export function SurahOverlay({ surahId, juzId, initialVerseId, isOpen, onClose }: SurahOverlayProps) {
    const [surah, setSurah] = useState<SurahData | null>(null);
    const [loading, setLoading] = useState(true);
    const [translationLang, setTranslationLang] = useState<TranslationLang>("english");

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

    if (!isOpen) return null;

    // Build the full Arabic paragraph
    const arabicParagraph = surah?.verses.map(v => v.text).join(" ﴿" + "﴾ ") || "";

    // Build translation paragraph based on selected language
    const getTranslation = () => {
        if (!surah) return "";
        return surah.verses.map((v, i) => {
            const num = `(${i + 1})`;
            if (translationLang === "english") {
                return `${v.englishTranslation || ""} ${num}`;
            } else if (translationLang === "urdu") {
                return `${v.translation || ""} ${num}`;
            } else {
                // Roman Urdu — use transliteration if available, otherwise fallback to English
                return `${v.englishTranslation || ""} ${num}`;
            }
        }).join(" ");
    };

    const langOptions: { id: TranslationLang; label: string }[] = [
        { id: "english", label: "English" },
        { id: "urdu", label: "اردو" },
        { id: "roman", label: "Roman Urdu" },
    ];

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
                    <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-100">
                                    {loading ? "Loading..." : surah?.transliteration}
                                </h2>
                                <p className="text-xs text-slate-400">
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
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-zinc-950">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                                <p className="text-slate-500 animate-pulse">Fetching Holy Verses...</p>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto space-y-8">
                                {/* Surah Title */}
                                <div className="text-center">
                                    <p className="font-arabic text-3xl text-slate-200 mb-1">{surah?.name}</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                                        {surah?.transliteration} — {surah?.translation}
                                    </p>
                                </div>

                                {/* Full Arabic Paragraph */}
                                <div className="bg-zinc-900/70 rounded-2xl border border-zinc-800/60 p-6 md:p-8">
                                    <p
                                        className="font-arabic text-2xl md:text-3xl leading-[2.5] text-slate-100 text-right"
                                        dir="rtl"
                                        style={{ fontFamily: 'var(--font-amiri)' }}
                                    >
                                        {surah?.verses.map((v, i) => (
                                            <span key={v.id}>
                                                {v.text}
                                                <span className="text-emerald-500/70 text-lg mx-1">﴿{i + 1}﴾</span>
                                            </span>
                                        ))}
                                    </p>
                                </div>

                                {/* Translation Language Toggle */}
                                <div className="flex items-center justify-center gap-2">
                                    {langOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setTranslationLang(opt.id)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                                translationLang === opt.id
                                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                    : "bg-zinc-800 text-slate-400 hover:bg-zinc-700 hover:text-slate-300"
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Translation Paragraph */}
                                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/40 p-6 md:p-8">
                                    {translationLang === "urdu" ? (
                                        <p
                                            className="font-arabic text-xl leading-[2.2] text-slate-300 text-right"
                                            dir="rtl"
                                        >
                                            {surah?.verses.map((v, i) => (
                                                <span key={v.id}>
                                                    {v.translation}
                                                    <span className="text-emerald-500/60 text-sm mx-1">({i + 1})</span>
                                                </span>
                                            ))}
                                        </p>
                                    ) : (
                                        <p className="text-base leading-relaxed text-slate-400">
                                            {surah?.verses.map((v, i) => (
                                                <span key={v.id}>
                                                    {v.englishTranslation}
                                                    <span className="text-emerald-500/60 text-xs mx-1">({i + 1})</span>
                                                    {" "}
                                                </span>
                                            ))}
                                        </p>
                                    )}
                                </div>
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
