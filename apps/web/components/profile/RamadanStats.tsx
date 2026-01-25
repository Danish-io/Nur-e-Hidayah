"use client";

import { useEffect, useState } from "react";
import { Moon, BookOpen, Coffee, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function RamadanStats() {
    const [stats, setStats] = useState({
        fastingStreak: 0,
        prayersCompleted: 0,
        taraweehRakaats: 0,
        quranProgress: 0, // Percentage
        lastSurah: "Al-Fatiha"
    });

    useEffect(() => {
        // Mocking 'streak' logic by reading the current day's status plus a simulated history
        // In a real app, we'd query the DB for history

        // 1. Worship
        const worship = localStorage.getItem("ramadan-worship-tracker");
        let streak = 0;
        let prayers = 0;
        if (worship) {
            const parsed = JSON.parse(worship);
            if (parsed.fasting) streak = 1; // Simple placeholder for now
            prayers = parsed.prayers.filter(Boolean).length;
        }

        // 2. Taraweeh
        const taraweeh = localStorage.getItem("ramadan-taraweeh");
        const rakaats = taraweeh ? parseInt(taraweeh) : 0;

        // 3. Quran
        const quran = localStorage.getItem("ramadan-quran-progress");
        let qProgress = 0;
        let surah = "Start Reading";
        if (quran) {
            const parsed = JSON.parse(quran);
            qProgress = Math.round((parsed.juz / 30) * 100);
            surah = `Surah ${parsed.surah}, Ayah ${parsed.verse}`;
        }

        setStats({
            fastingStreak: streak,
            prayersCompleted: prayers,
            taraweehRakaats: rakaats,
            quranProgress: qProgress,
            lastSurah: surah
        });
    }, []);

    const statCards = [
        {
            label: "Fasting Days",
            value: stats.fastingStreak,
            subtext: "Ramadan 1447",
            icon: Coffee,
            color: "text-amber-500 bg-amber-500/10",
        },
        {
            label: "Night Worship",
            value: stats.taraweehRakaats,
            subtext: "Total Rakaats",
            icon: Moon,
            color: "text-indigo-500 bg-indigo-500/10",
        },
        {
            label: "Quran Progress",
            value: `${stats.quranProgress}%`,
            subtext: stats.lastSurah,
            icon: BookOpen,
            color: "text-emerald-500 bg-emerald-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-500" />
                Your Ramadan Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-2xl p-6 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("p-3 rounded-xl", stat.color)}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            {i === 0 && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md">Warrior</span>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</h3>
                            <p className="text-xs text-slate-400">{stat.subtext}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Badges Section */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            Achievements
                        </h3>
                        <p className="text-indigo-200 text-sm max-w-md">
                            Keep consistent to unlock special badges on your journey of purification.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <Moon className="w-5 h-5 text-indigo-300" />
                            </div>
                            <span className="text-xs font-medium">Night Owl</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
                                <Coffee className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-xs font-medium text-emerald-300">Fast 1</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <BookOpen className="w-5 h-5 text-amber-300" />
                            </div>
                            <span className="text-xs font-medium">Hafiz</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
