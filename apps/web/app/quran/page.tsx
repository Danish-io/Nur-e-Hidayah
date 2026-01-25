"use client";

import Link from "next/link";
import { quranData } from "@/data/quran";
import { motion } from "framer-motion";

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
                        <p className="text-slate-500 dark:text-slate-400">Select a Surah to start reading with AI-powered insights.</p>
                    </motion.div>
                </div>

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
            </div>
        </div>
    );
}
