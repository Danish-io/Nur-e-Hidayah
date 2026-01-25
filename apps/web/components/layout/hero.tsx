"use client";
import { Button } from "@/components/ui/button";
import {
    BookOpen, Search, ArrowRight, Sparkles, MoveRight,
    Moon, Radio, BookText, Clock, Compass, HandHeart, Bookmark,
    Settings, HelpCircle, Heart, Star, ChevronRight, User
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { RamadanStats } from "@/components/profile/RamadanStats";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

// Floating Element Component
const FloatingElement = ({ delay = 0, duration = 20, className = "", children }: { delay?: number; duration?: number; className?: string; children: React.ReactNode }) => (
    <motion.div
        className={cn("absolute pointer-events-none", className)}
        initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
        animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 5, -3, 4, 0],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

// Glowing Orb Component
const GlowingOrb = ({ color, size, top, left, delay = 0 }: { color: string; size: string; top: string; left: string; delay?: number }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl ${color}`}
        style={{ width: size, height: size, top, left }}
        animate={{
            scale: [1, 1.2, 1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    />
);

export function Hero() {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<"features" | "profile">("features");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse for subtle parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Feature List - Sorted by Usage Priority (using translations)
    const features = [
        { title: t.nav.prayer, desc: t.home.prayerTimings, icon: Clock, href: "/prayer", color: "text-teal-500", bg: "bg-teal-500/10", glow: "group-hover:shadow-teal-500/20" },
        { title: t.nav.quran, desc: t.home.readAndReflect, icon: BookOpen, href: "/quran", color: "text-emerald-500", bg: "bg-emerald-500/10", glow: "group-hover:shadow-emerald-500/20" },
        { title: t.nav.ramadan, desc: t.home.trackJourney, icon: Moon, href: "/ramadan", color: "text-indigo-500", bg: "bg-indigo-500/10", glow: "group-hover:shadow-indigo-500/20" },
        { title: t.nav.qibla, desc: t.home.direction, icon: Compass, href: "/qibla", color: "text-rose-500", bg: "bg-rose-500/10", glow: "group-hover:shadow-rose-500/20" },
        { title: t.nav.search, desc: t.home.askInsight, icon: Sparkles, href: "/search", color: "text-purple-500", bg: "bg-purple-500/10", glow: "group-hover:shadow-purple-500/20" },
        { title: t.nav.duas, desc: t.home.supplications, icon: HandHeart, href: "/duas", color: "text-pink-500", bg: "bg-pink-500/10", glow: "group-hover:shadow-pink-500/20" },
        { title: t.nav.radio, desc: t.home.live24_7, icon: Radio, href: "/radio", color: "text-amber-500", bg: "bg-amber-500/10", glow: "group-hover:shadow-amber-500/20" },
        { title: t.nav.hadith, desc: t.home.wisdom, icon: BookText, href: "/hadith", color: "text-blue-500", bg: "bg-blue-500/10", glow: "group-hover:shadow-blue-500/20" },
        { title: t.nav.bookmarks, desc: t.home.saved, icon: Bookmark, href: "/bookmarks", color: "text-cyan-500", bg: "bg-cyan-500/10", glow: "group-hover:shadow-cyan-500/20" },
        { title: t.nav.settings, desc: t.home.customize, icon: Settings, href: "/settings", color: "text-slate-500", bg: "bg-slate-500/10", glow: "group-hover:shadow-slate-500/20" },
        { title: t.nav.help, desc: t.home.guide, icon: HelpCircle, href: "/help", color: "text-orange-500", bg: "bg-orange-500/10", glow: "group-hover:shadow-orange-500/20" },
    ];

    return (
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 pb-4 text-slate-900 dark:text-slate-100 overflow-hidden">

            {/* === ENHANCED ANIMATED BACKGROUND === */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

                {/* Glowing Orbs with Parallax */}
                <motion.div
                    style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                    className="absolute inset-0"
                >
                    <GlowingOrb color="bg-amber-400/20 dark:bg-amber-500/10" size="500px" top="10%" left="20%" delay={0} />
                    <GlowingOrb color="bg-emerald-400/15 dark:bg-emerald-500/10" size="400px" top="60%" left="70%" delay={2} />
                    <GlowingOrb color="bg-indigo-400/15 dark:bg-indigo-500/10" size="350px" top="20%" left="80%" delay={4} />
                    <GlowingOrb color="bg-rose-400/10 dark:bg-rose-500/5" size="300px" top="70%" left="10%" delay={6} />
                </motion.div>

                {/* Floating Islamic Symbols */}
                <FloatingElement delay={0} duration={25} className="top-[15%] left-[10%]">
                    <Star className="w-6 h-6 text-amber-400/40 dark:text-amber-500/30" fill="currentColor" />
                </FloatingElement>
                <FloatingElement delay={3} duration={30} className="top-[25%] right-[15%]">
                    <Moon className="w-8 h-8 text-indigo-400/30 dark:text-indigo-500/20" />
                </FloatingElement>
                <FloatingElement delay={5} duration={22} className="bottom-[30%] left-[5%]">
                    <Star className="w-4 h-4 text-emerald-400/40 dark:text-emerald-500/30" fill="currentColor" />
                </FloatingElement>
                <FloatingElement delay={8} duration={28} className="top-[60%] right-[8%]">
                    <Heart className="w-5 h-5 text-rose-400/30 dark:text-rose-500/20" />
                </FloatingElement>
                <FloatingElement delay={2} duration={35} className="top-[10%] right-[40%]">
                    <Sparkles className="w-5 h-5 text-purple-400/30 dark:text-purple-500/20" />
                </FloatingElement>
                <FloatingElement delay={10} duration={20} className="bottom-[20%] right-[30%]">
                    <Star className="w-3 h-3 text-amber-300/50 dark:text-amber-400/30" fill="currentColor" />
                </FloatingElement>
                <FloatingElement delay={7} duration={32} className="top-[45%] left-[15%]">
                    <Moon className="w-4 h-4 text-teal-400/25 dark:text-teal-500/15" />
                </FloatingElement>

                {/* Animated Light Rays */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.03] dark:opacity-[0.02]"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 bg-gradient-conic from-amber-500 via-transparent to-amber-500 rounded-full" />
                </motion.div>

                {/* Light Particles */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-amber-400/40 dark:bg-amber-500/30"
                        style={{
                            width: Math.random() * 4 + 2 + "px",
                            height: Math.random() * 4 + 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%"
                        }}
                        animate={{
                            y: [0, -100, -200],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            {/* Central Tabs */}
            <div className="relative z-20 container pt-6 md:pt-10 flex flex-col items-center shrink-0">
                {/* Custom Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex p-1.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-full border border-slate-200/50 dark:border-white/10 mb-6 shadow-lg shadow-slate-200/50 dark:shadow-black/20"
                >
                    <button
                        onClick={() => setActiveTab("features")}
                        className={cn(
                            "px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                            activeTab === "features"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transform scale-105"
                                : "text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5"
                        )}
                    >
                        <Sparkles className="w-4 h-4" />
                        {t.common.features}
                    </button>
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={cn(
                            "px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                            activeTab === "profile"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transform scale-105"
                                : "text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5"
                        )}
                    >
                        <User className="w-4 h-4" />
                        {t.common.profile}
                    </button>
                </motion.div>
            </div>


            {/* Content Area - Animate Presence for Tab Switch */}
            <div className="container relative z-10 px-4 md:px-8 flex-1 flex flex-col justify-center pb-6 md:pb-10 w-full max-w-[1600px]">
                <AnimatePresence mode="wait">

                    {activeTab === "features" && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full flex flex-col justify-center"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5 lg:gap-6 w-full content-center">
                                {features.map((item, i) => (
                                    <Link href={item.href} key={i} className="block group w-full min-h-[140px] md:min-h-[160px]">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                                            whileHover={{
                                                scale: 1.05,
                                                y: -8,
                                                transition: { duration: 0.2 }
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`h-full flex flex-col items-center justify-center p-4 md:p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 gap-3 md:gap-4 text-center shadow-lg hover:shadow-2xl ${item.glow}`}
                                        >
                                            {/* Animated Icon Container */}
                                            <motion.div
                                                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-inner ${item.bg} ${item.color} relative overflow-hidden`}
                                                whileHover={{ rotate: [0, -5, 5, 0] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <item.icon className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
                                                {/* Icon Glow Effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/30 dark:to-white/10"
                                                    initial={{ x: "-100%", y: "100%" }}
                                                    whileHover={{ x: "100%", y: "-100%" }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                            </motion.div>
                                            <div className="space-y-0.5">
                                                <h3 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.title}</h3>
                                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "profile" && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full max-w-5xl mx-auto space-y-6 p-2"
                        >
                            <ProfileHeader />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/30 dark:border-white/5 shadow-xl"
                            >
                                <RamadanStats />
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full opacity-[0.03] dark:opacity-[0.02] pointer-events-none z-0">
                <svg viewBox="0 0 1440 320" className="w-full h-24 md:h-40 text-emerald-900 dark:text-emerald-100 fill-current">
                    <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                </svg>
            </div>
        </section>
    );
}
