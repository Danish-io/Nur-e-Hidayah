"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    GraduationCap,
    Moon,
    Radio,
    BookText,
    FileText,
    Sparkles,
    Clock,
    Compass,
    HandHeart,
    Bookmark,
    Settings,
    HelpCircle,
    Heart,
    Sun,
    ChevronLeft,
    MoonStar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function SidebarContent({ onItemClick, isCollapsed = false, onToggle }: { onItemClick?: () => void; isCollapsed?: boolean; onToggle?: () => void }) {
    const pathname = usePathname();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { t } = useI18n();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Navigation items with categories
    const groups = [
        {
            label: "Sacred",
            items: [
                { name: t.nav.quran, href: "/quran", icon: BookOpen, animate: "animate-breathe" },
                { name: t.nav.scholars, href: "/scholars", icon: GraduationCap },
                { name: t.nav.ramadan, href: "/ramadan", icon: Moon },
                { name: t.nav.radio, href: "/radio", icon: Radio },
                { name: t.nav.hadith, href: "/hadith", icon: BookText },
                { name: "Shab-e-Qadr", href: "/shab-e-qadr", icon: MoonStar },
            ]
        },
        {
            label: "Exploration",
            items: [
                { name: t.nav.search, href: "/search", icon: Sparkles },
                { name: t.nav.prayer, href: "/prayer", icon: Clock },
                { name: t.nav.qibla, href: "/qibla", icon: Compass },
                { name: "Dua Builder", href: "/dua-builder", icon: HandHeart },
            ]
        },
        {
            label: "Personal",
            items: [
                { name: t.nav.duas, href: "/duas", icon: HandHeart },
                { name: t.nav.bookmarks, href: "/bookmarks", icon: Bookmark },
            ]
        },
        {
            label: "System",
            items: [
                { name: t.nav.settings, href: "/settings", icon: Settings },
                { name: t.nav.help, href: "/help", icon: HelpCircle },
                { name: "Contact Us", href: "/contact", icon: Heart },
            ]
        }
    ];

    return (
        <div className="flex flex-col h-full text-slate-300">
            {/* Sidebar Branding & Toggle */}
            <div className={cn("flex items-center justify-between px-4 py-8 border-b border-white/5", isCollapsed && "justify-center px-2")}>
                {!isCollapsed && (
                    <Link href="/" className="block group" onClick={onItemClick}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/90 to-teal-700/90 flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-all duration-700 relative overflow-hidden">
                                <Heart className="w-6 h-6 text-white relative z-10" fill="currentColor" />
                                <div className="absolute inset-0 bg-white/20 animate-breathe" />
                            </div>
                            <div>
                                <h2 className="font-serif font-bold text-xl text-white tracking-wide leading-none drop-shadow-sm">Nur</h2>
                                <p className="text-[9px] text-emerald-400/80 uppercase tracking-[0.2em] font-bold mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{t.home.tagline}</p>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Collapse Toggle */}
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all duration-500",
                            isCollapsed && "mx-auto"
                        )}
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className={cn("flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide", isCollapsed ? "px-2" : "px-4")}>
                {groups.map((group, gIdx) => (
                    <div key={group.label} className="space-y-2">
                        {!isCollapsed && (
                            <h3 className="px-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500/60 mb-4 flex items-center gap-2">
                                <span>{group.label}</span>
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </h3>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onItemClick}
                                        title={isCollapsed ? item.name : undefined}
                                        className={cn(
                                            "group relative flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-500",
                                            isCollapsed && "justify-center px-2",
                                            isActive
                                                ? "bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
                                                : "text-slate-400 hover:text-emerald-100 hover:bg-white/5"
                                        )}
                                    >
                                        {/* Active Indicator Pillar */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                            />
                                        )}

                                        <Icon className={cn(
                                            "w-5 h-5 shrink-0 transition-all duration-700",
                                            isActive ? "scale-110 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "group-hover:scale-110 group-hover:text-emerald-300",
                                            item.animate
                                        )} />

                                        {!isCollapsed && (
                                            <span className={cn("truncate tracking-wide transition-colors", isActive && "font-bold font-serif text-base")}>
                                                {item.name}
                                            </span>
                                        )}

                                        {isActive && !isCollapsed && (
                                            <div className="ml-auto w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Theme Toggle */}
            {mounted && (
                <div className={cn("px-4 py-3 border-t border-white/5", isCollapsed && "px-2")}>
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        {resolvedTheme === "dark" ? (
                            <Sun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-indigo-400" />
                        )}
                        {!isCollapsed && (
                            <span>{resolvedTheme === "dark" ? t.settings.light : t.settings.dark}</span>
                        )}
                    </button>
                </div>
            )}

        </div>
    );
}
