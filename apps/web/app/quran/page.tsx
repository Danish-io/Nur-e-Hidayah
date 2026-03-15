"use client";

import Link from "next/link";
import { quranData } from "@/data/quran";
import { juzData } from "@/data/juz";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Layers, Calendar } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function QuranIndex() {
    // Separate Meccan and Medinan surahs for Revelation tab
    const meccanSurahs = quranData.filter(s => s.type === "Meccan").sort((a, b) => a.revelationOrder - b.revelationOrder);
    const medinanSurahs = quranData.filter(s => s.type === "Medinan").sort((a, b) => a.revelationOrder - b.revelationOrder);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 pt-12 pb-12">
                <div className="mb-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Quran Reader</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Select a Surah to start reading with AI-powered insights.</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto md:mx-0">
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Surahs</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">114</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Juz</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">30</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Meccan</p>
                                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{meccanSurahs.length}</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Medinan</p>
                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{medinanSurahs.length}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <Tabs defaultValue="surahs" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto md:mx-0 grid-cols-3 mb-8">
                        <TabsTrigger value="surahs" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Surahs</span>
                        </TabsTrigger>
                        <TabsTrigger value="juz" className="flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            <span>Juz (Para)</span>
                        </TabsTrigger>
                        <TabsTrigger value="revelation" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Revelation</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Surahs Tab */}
                    <TabsContent value="surahs">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {quranData.map((surah) => (
                                <motion.div key={surah.id} variants={item}>
                                    <Link
                                        href={`/quran/${surah.id}`}
                                        className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-quran-gold/50 hover:shadow-lg hover:shadow-quran-gold/5 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:bg-quran-gold group-hover:text-white transition-colors font-bold text-sm">
                                                    {surah.id}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-quran-gold transition-colors text-lg">
                                                        {surah.transliteration}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 group-hover:text-quran-gold/70 transition-colors">{surah.translation}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-arabic text-2xl text-slate-800 dark:text-slate-200 group-hover:text-quran-gold transition-colors">{surah.name}</p>
                                                <p className="text-xs text-slate-400">{surah.totalVerses} Verses</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    {/* Juz Tab */}
                    <TabsContent value="juz">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {juzData.map((juz) => {
                                const startSurah = quranData.find(s => s.id === juz.startSurah);
                                const endSurah = quranData.find(s => s.id === juz.endSurah);

                                return (
                                    <motion.div key={juz.id} variants={item}>
                                        <Link
                                            href={`/quran/para/${juz.id}`}
                                            className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-quran-gold/50 hover:shadow-lg hover:shadow-quran-gold/5 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:bg-quran-gold group-hover:text-white transition-colors font-bold text-sm">
                                                        {juz.id}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-quran-gold transition-colors text-lg">
                                                            {juz.name}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 group-hover:text-quran-gold/70 transition-colors">Para {juz.id}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-arabic text-2xl text-slate-800 dark:text-slate-200 group-hover:text-quran-gold transition-colors">{juz.nameArabic}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-zinc-800 pt-3">
                                                <p>{startSurah?.transliteration} ({juz.startVerse}) → {endSurah?.transliteration} ({juz.endVerse})</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </TabsContent>

                    {/* Revelation Tab */}
                    <TabsContent value="revelation">
                        <div className="space-y-8">
                            {/* Meccan Surahs */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Meccan Surahs ({meccanSurahs.length})
                                </h2>
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                >
                                    {meccanSurahs.map((surah) => (
                                        <motion.div key={surah.id} variants={item}>
                                            <Link
                                                href={`/quran/${surah.id}`}
                                                className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors font-bold text-sm">
                                                            {surah.id}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors text-lg">
                                                                {surah.transliteration}
                                                            </h3>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-xs text-slate-500 group-hover:text-emerald-500/70 transition-colors">{surah.translation}</p>
                                                                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                                                                    Seq: {surah.revelationOrder}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-arabic text-2xl text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">{surah.name}</p>
                                                        <p className="text-xs text-slate-400">{surah.totalVerses} Verses</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Medinan Surahs */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Medinan Surahs ({medinanSurahs.length})
                                </h2>
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                >
                                    {medinanSurahs.map((surah) => (
                                        <motion.div key={surah.id} variants={item}>
                                            <Link
                                                href={`/quran/${surah.id}`}
                                                className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors font-bold text-sm">
                                                            {surah.id}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors text-lg">
                                                                {surah.transliteration}
                                                            </h3>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-xs text-slate-500 group-hover:text-blue-500/70 transition-colors">{surah.translation}</p>
                                                                <span className="text-[10px] bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                                                                    Seq: {surah.revelationOrder}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-arabic text-2xl text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">{surah.name}</p>
                                                        <p className="text-xs text-slate-400">{surah.totalVerses} Verses</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
