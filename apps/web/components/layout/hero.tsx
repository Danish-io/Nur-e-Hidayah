"use client";
import { Button } from "@/components/ui/button";
import {
    BookOpen, Search, ArrowRight, Sparkles, MoveRight,
    Moon, Radio, BookText, Clock, Compass, HandHeart, Bookmark,
    Settings, HelpCircle, Heart, Star, ChevronRight, Library, MoonStar
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    // Track mouse for subtle parallax effect — throttled to 1 update per frame
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (rafRef.current) return; // skip if a frame is already queued
            rafRef.current = requestAnimationFrame(() => {
                setMousePosition({
                    x: (e.clientX / window.innerWidth - 0.5) * 20,
                    y: (e.clientY / window.innerHeight - 0.5) * 20
                });
                rafRef.current = null;
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Feature Sections — memoized to avoid recreation on every render
    const featureSections = useMemo(() => [
        {
            name: "Books & Wisdom",
            icon: Library,
            items: [
                { title: t.nav.quran, desc: t.home.readAndReflect, icon: BookOpen, href: "/quran", color: "text-emerald-500", bg: "bg-emerald-500/10", glow: "group-hover:shadow-emerald-500/20" },
                { title: t.nav.hadith, desc: t.home.wisdom, icon: BookText, href: "/hadith", color: "text-blue-500", bg: "bg-blue-500/10", glow: "group-hover:shadow-blue-500/20" },
                { title: t.nav.duas, desc: t.home.supplications, icon: HandHeart, href: "/duas", color: "text-pink-500", bg: "bg-pink-500/10", glow: "group-hover:shadow-pink-500/20" },
                { title: t.nav.radio, desc: t.home.live24_7, icon: Radio, href: "/radio", color: "text-amber-500", bg: "bg-amber-500/10", glow: "group-hover:shadow-amber-500/20" },
                { title: "Shab-e-Qadr", desc: "Night of Power guide", icon: MoonStar, href: "/shab-e-qadr", color: "text-indigo-400", bg: "bg-indigo-500/10", glow: "group-hover:shadow-indigo-500/20" },
                { title: "Contact Us", desc: "Dev info & feedback", icon: Heart, href: "/contact", color: "text-rose-500", bg: "bg-rose-500/10", glow: "group-hover:shadow-rose-500/20" },
            ]
        },
        {
            name: "Spiritual Tools",
            icon: Compass,
            items: [
                { title: t.nav.prayer, desc: t.home.prayerTimings, icon: Clock, href: "/prayer", color: "text-teal-500", bg: "bg-teal-500/10", glow: "group-hover:shadow-teal-500/20" },
                { title: t.nav.ramadan, desc: t.home.trackJourney, icon: Moon, href: "/ramadan", color: "text-indigo-500", bg: "bg-indigo-500/10", glow: "group-hover:shadow-indigo-500/20" },
                { title: t.nav.qibla, desc: t.home.direction, icon: Compass, href: "/qibla", color: "text-rose-500", bg: "bg-rose-500/10", glow: "group-hover:shadow-rose-500/20" },
                { title: t.nav.search, desc: t.home.askInsight, icon: Sparkles, href: "/search", color: "text-purple-500", bg: "bg-purple-500/10", glow: "group-hover:shadow-purple-500/20" },
                { title: "Dua Builder", desc: "Craft personal duas", icon: HandHeart, href: "/dua-builder", color: "text-emerald-500", bg: "bg-emerald-500/10", glow: "group-hover:shadow-emerald-500/20" },
            ]
        },
        {
            name: "Personalization",
            icon: Settings,
            items: [
                { title: t.nav.bookmarks, desc: t.home.saved, icon: Bookmark, href: "/bookmarks", color: "text-cyan-500", bg: "bg-cyan-500/10", glow: "group-hover:shadow-cyan-500/20" },
                { title: t.nav.settings, desc: t.home.customize, icon: Settings, color: "text-slate-500", bg: "bg-slate-500/10", href: "/settings", glow: "group-hover:shadow-slate-500/20" },
                { title: t.nav.help, desc: t.home.guide, icon: HelpCircle, href: "/help", color: "text-orange-500", bg: "bg-orange-500/10", glow: "group-hover:shadow-orange-500/20" },
            ]
        }
    ], [t]);

    return (
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 pb-12 text-slate-900 dark:text-slate-100 overflow-hidden">

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
            </div>

            {/* Central Tabs */}



            {/* Content Area */}
            <div className="container relative z-10 px-4 md:px-8 flex-1 flex flex-col w-full max-w-[1400px] mx-auto overflow-y-auto custom-scrollbar pt-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-16"
                >
                    {featureSections.map((section, sectionIdx) => (
                        <div key={section.name} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: sectionIdx * 0.1 }}
                                className="flex items-center gap-3 px-2"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
                                    {section.name}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent ml-4" />
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                                {section.items.map((item, i) => (
                                    <Link href={item.href} key={i} className="block group">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: (sectionIdx * 0.1) + (i * 0.05), duration: 0.4 }}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={cn(
                                                "h-full flex flex-col items-center justify-center p-4 md:p-6 rounded-3xl transition-all duration-300 gap-3 text-center",
                                                "bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg hover:shadow-2xl",
                                                item.glow, "hover:border-emerald-200 dark:hover:border-emerald-800"
                                            )}
                                        >
                                            <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-inner", item.bg, item.color)}>
                                                <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.title}</h3>
                                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium px-2">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full opacity-[0.03] dark:opacity-[0.02] pointer-events-none z-0">
                <svg viewBox="0 0 1440 320" className="w-full h-24 text-emerald-900 dark:text-emerald-100 fill-current">
                    <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                </svg>
            </div>
        </section>
    );
}
