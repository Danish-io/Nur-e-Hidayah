"use client";

import { motion } from "framer-motion";
import {
    BookOpen, Moon, Radio, Sparkles, Clock, Compass,
    HandHeart, BookText, Bookmark, Settings, HelpCircle,
    CheckCircle2
} from "lucide-react";

export function FeatureDetails() {

    const details = [
        {
            title: "Quran",
            description: "A complete digital Mushaf experience.",
            icon: BookOpen,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            features: [
                "Immersive Reading Mode (Distraction-free)",
                "Word-by-Word Translation & Transliteration",
                "Tafseer from renowned scholars (Ibn Kathir, etc.)",
                "Audio Recitation with Verse Sync"
            ]
        },
        {
            title: "Ramadan Companion",
            description: "Your spiritual dashboard for the holy month.",
            icon: Moon,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            features: [
                "Fasting Tracker & Streak Analytics",
                "Taraweeh Counter (track Rakaats)",
                "Juz Completion Goals",
                "Mood-based Daily Reflections"
            ]
        },
        {
            title: "AI Companion",
            description: "Ask questions, get answers from the Quran.",
            icon: Sparkles,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            features: [
                "Natural Language Search (e.g. \"Verses about patience\")",
                "Contextual Explanations",
                "Thematic grouping of verses",
                "Instant References & Sources"
            ]
        },
        {
            title: "Prayer & Qibla",
            description: "Never miss a prayer, wherever you are.",
            icon: Clock,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
            features: [
                "Auto-detected Location & Timings",
                "Adjustable Calculation Methods",
                "Qibla Compass with AR View",
                "Next Prayer Countdown"
            ]
        },
        {
            title: "Hadith & Duas",
            description: "Prophetic wisdom and supplications.",
            icon: HandHeart,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            features: [
                "Sahih Bukhari & Muslim Collections",
                "Duas for every Emotion (Anxiety, Joy, etc.)",
                "Daily Hadith Notifications",
                "Rabbana Duas Collection"
            ]
        },
        {
            title: "Quran Radio",
            description: "Soul-soothing recitations 24/7.",
            icon: Radio,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            features: [
                "Live curated stations",
                "Background Playback",
                "Multiple Reciters",
                "Sleep Timer"
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-black/20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
                    >
                        Detailed Feature Breakdown
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 dark:text-slate-400"
                    >
                        Explore the tools designed to deepen your connection with the Divine.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {details.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl p-8 hover:shadow-lg hover:border-emerald-500/20 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.bg} ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.description}</p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {item.features.map((feat, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="leading-relaxed">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
