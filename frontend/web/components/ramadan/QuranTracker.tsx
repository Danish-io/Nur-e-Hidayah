"use client";

import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, Save } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function QuranTracker() {
    // Simple mock data for Surahs (1-114) would be too long, using generic input for now or simplified range
    const [progress, setProgress] = useState<{ juz: number, surah: number, verse: number }>({
        juz: 1,
        surah: 1,
        verse: 1
    });

    useEffect(() => {
        const saved = localStorage.getItem("ramadan-quran-progress");
        if (saved) setProgress(JSON.parse(saved));
    }, []);

    const updateProgress = (key: string, val: number) => {
        const newProgress = { ...progress, [key]: val };
        setProgress(newProgress);
        localStorage.setItem("ramadan-quran-progress", JSON.stringify(newProgress));
    };

    const completion = Math.min(100, Math.round((progress.juz / 30) * 100));

    return (
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 text-amber-600 rounded-full">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Quran Companion</h3>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Juz Goal</span>
                    <span className="text-2xl font-serif text-emerald-600 dark:text-emerald-400">{completion}%</span>
                </div>
                <Progress value={completion} className="h-2 bg-slate-100 dark:bg-slate-800" />
                <div className="flex justify-between mt-2">
                    <button
                        onClick={() => updateProgress('juz', Math.max(1, progress.juz - 1))}
                        className="text-xs text-slate-400 hover:text-emerald-500"
                    >
                        - Prev
                    </button>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Juz {progress.juz} of 30</span>
                    <button
                        onClick={() => updateProgress('juz', Math.min(30, progress.juz + 1))}
                        className="text-xs text-slate-400 hover:text-emerald-500"
                    >
                        Next +
                    </button>
                </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Last Read Location</p>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="text-[10px] text-slate-500">Surah #</label>
                        <input
                            type="number"
                            min="1" max="114"
                            value={progress.surah}
                            onChange={(e) => updateProgress('surah', parseInt(e.target.value))}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] text-slate-500">Ayah #</label>
                        <input
                            type="number"
                            min="1"
                            value={progress.verse}
                            onChange={(e) => updateProgress('verse', parseInt(e.target.value))}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm"
                        />
                    </div>
                </div>
            </div>

            <Link href={`/quran/${progress.surah}`} className="flex items-center justify-center p-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors font-medium">
                Continue Reading <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="text-center text-xs text-slate-400 mt-3 italic">
                &quot;The Quran will always wait for you.&quot;
            </p>
        </div>
    );
}
