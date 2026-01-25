"use client";

import { useGentleState, Mood } from "@/hooks/useGentleState";
import { cn } from "@/lib/utils";
import { Sun, Moon, Cloud, Heart, Battery } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOODS: { id: Mood; label: string; icon: any; color: string }[] = [
    { id: "peaceful", label: "Peaceful", icon: Sun, color: "text-amber-500 bg-amber-500/10" },
    { id: "tired", label: "Tired", icon: Battery, color: "text-slate-500 bg-slate-500/10" },
    { id: "overwhelmed", label: "Overwhelmed", icon: Cloud, color: "text-blue-500 bg-blue-500/10" },
    { id: "low_iman", label: "Low Iman", icon: Moon, color: "text-indigo-500 bg-indigo-500/10" },
    { id: "grateful", label: "Grateful", icon: Heart, color: "text-rose-500 bg-rose-500/10" },
];

export function RamadanHero({ hijriDate }: { hijriDate: string }) {
    const { mood, updateMood, mounted } = useGentleState();
    const [greeting, setGreeting] = useState("Ramadan Mubarak");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 5) setGreeting("Blessed Night");
        else if (hour < 12) setGreeting("Good Morning");
        else if (hour < 17) setGreeting("Good Afternoon");
        else if (hour < 20) setGreeting("Blessed Maghrib");
        else setGreeting("Peaceful Evening");
    }, []);

    if (!mounted) return <div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-3xl" />;

    const getBgColor = () => {
        switch (mood) {
            case "peaceful": return "from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-950";
            case "tired": return "from-slate-100 to-white dark:from-slate-900 dark:to-slate-950";
            case "overwhelmed": return "from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-950";
            case "low_iman": return "from-indigo-50 to-white dark:from-indigo-950/30 dark:to-slate-950";
            case "grateful": return "from-rose-50 to-white dark:from-rose-950/30 dark:to-slate-950";
            default: return "from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-950";
        }
    };

    return (
        <motion.div
            layout
            className={cn(
                "relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-sm transition-colors duration-1000 bg-gradient-to-br",
                getBgColor()
            )}
        >
            {/* Background Decor & Gentle Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-current opacity-5 blur-3xl animate-breathe" style={{ color: mood ? 'currentColor' : '#10b981' }} />

                {/* Floating Particles (Soft Light Effect) */}
                <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-current opacity-20 animate-particle-slow" style={{ animationDelay: '0s' }} />
                <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-current opacity-10 animate-particle-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[30%] left-[40%] w-1 h-1 rounded-full bg-current opacity-30 animate-particle-slow" style={{ animationDelay: '5s' }} />
            </div>

            <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wider mb-4">
                    {hijriDate || "RAMADAN 1447"}
                </span>

                <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-50 mb-4 leading-tight">
                    <AnimatePresence mode="wait">
                        {mood ? (
                            <motion.span
                                key="mood-text"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {mood === "tired" && "Rest is also worship,"}
                                {mood === "overwhelmed" && "One step at a time,"}
                                {mood === "low_iman" && "Allah is closer than you think,"}
                                {mood === "peaceful" && "May this peace last,"}
                                {mood === "grateful" && "Alhamdulillah for this moment,"}
                                <span className="block mt-2 opacity-80">Warrior.</span>
                            </motion.span>
                        ) : (
                            <motion.span
                                key="greeting"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {greeting}, <br />
                                <span className="text-slate-500 text-3xl md:text-4xl">How is your heart today?</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </h1>

                {!mood ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        {MOODS.filter(m => m.id !== null).map((m) => (
                            <button
                                key={m.id}
                                onClick={() => updateMood(m.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-3 rounded-xl border border-transparent transition-all duration-300 hover:scale-[1.02]",
                                    "bg-white dark:bg-slate-900 shadow-sm border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500",
                                    "text-slate-600 dark:text-slate-300 font-medium"
                                )}
                            >
                                <m.icon className={cn("w-5 h-5", m.color.split(" ")[0])} />
                                {m.label}
                            </button>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-8"
                    >
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                {mood === "tired" && "\"Allah does not burden a soul beyond that it can bear.\" (2:286). Take a nap, drink water, and breathe. Your intention counts."}
                                {mood === "overwhelmed" && "Suhoor, Fasting, Work, Ibadah... it's a lot. Just focus on the next prayer. That is enough."}
                                {mood === "low_iman" && "Fluctuations in Iman are natural. Prophet Yaqub cried until he went blind, yet he never lost hope. Raise your hands and just say 'Ya Allah'."}
                                {mood === "peaceful" && "Use this tranquility to make a heartfelt dua for someone who is struggling today."}
                                {mood === "grateful" && "\"If you are grateful, I will surely increase you.\" (14:7). Share a smile or charity today."}
                            </p>
                            <button
                                onClick={() => updateMood(null)}
                                className="mt-4 text-sm text-slate-400 hover:text-emerald-500 transition-colors"
                            >
                                Change mood
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
