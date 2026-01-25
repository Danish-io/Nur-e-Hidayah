"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
    BookOpen,
    GraduationCap,
    Moon,
    Radio,
    BookText,
    Sparkles,
    Clock,
    Compass,
    HandHeart,
    Bookmark,
    Settings,
    HelpCircle,
    LogOut,
    LogIn,
    Heart,
    Sun,
    ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function SidebarContent({ onItemClick, isCollapsed = false, onToggle }: { onItemClick?: () => void; isCollapsed?: boolean; onToggle?: () => void }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { t } = useI18n();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Navigation items with translations
    const navItems = [
        { name: t.nav.quran, href: "/quran", icon: BookOpen },
        { name: t.nav.scholars, href: "/scholars", icon: GraduationCap },
        { name: t.nav.ramadan, href: "/ramadan", icon: Moon },
        { name: t.nav.radio, href: "/radio", icon: Radio },
        { name: t.nav.hadith, href: "/hadith", icon: BookText },
        { name: t.nav.search, href: "/search", icon: Sparkles },
        { name: t.nav.prayer, href: "/prayer", icon: Clock },
        { name: t.nav.qibla, href: "/qibla", icon: Compass },
        { name: t.nav.duas, href: "/duas", icon: HandHeart },
        { name: t.nav.bookmarks, href: "/bookmarks", icon: Bookmark },
        { name: t.nav.settings, href: "/settings", icon: Settings },
        { name: t.nav.help, href: "/help", icon: HelpCircle },
    ];

    return (
        <div className="flex flex-col h-full text-slate-300">
            {/* Sidebar Branding & Toggle */}
            <div className={cn("flex items-center justify-between px-4 py-5 border-b border-white/5", isCollapsed && "justify-center px-2")}>
                {!isCollapsed && (
                    <Link href="/" className="block group" onClick={onItemClick}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/90 to-teal-600/90 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                <Heart className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-white tracking-tight leading-none">{t.home.welcome}</h2>
                                <p className="text-[10px] text-emerald-400 tracking-wide mt-0.5">{t.home.tagline}</p>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Collapse Toggle */}
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors",
                            isCollapsed && "mx-auto"
                        )}
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft className={cn("w-4 h-4 text-slate-400 transition-transform", isCollapsed && "rotate-180")} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className={cn("flex-1 overflow-y-auto py-4 space-y-1", isCollapsed ? "px-2" : "px-3")}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onItemClick}
                            title={isCollapsed ? item.name : undefined}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isCollapsed && "justify-center px-2",
                                isActive
                                    ? "bg-gradient-to-r from-emerald-500/20 to-transparent text-emerald-400 shadow-sm shadow-emerald-500/10"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 shrink-0 transition-all duration-200",
                                isActive ? "scale-110" : "group-hover:scale-105"
                            )} />
                            {!isCollapsed && (
                                <span className="truncate">{item.name}</span>
                            )}
                            {isActive && !isCollapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/30" />
                            )}
                        </Link>
                    );
                })}
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

            {/* Auth Section */}
            <div className={cn("px-4 py-4 border-t border-white/5", isCollapsed && "px-2")}>
                {status === "loading" ? (
                    <div className={cn("flex items-center gap-3 px-3 py-2.5", isCollapsed && "justify-center")}>
                        <div className="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        {!isCollapsed && <span className="text-sm text-slate-400">{t.common.loading}</span>}
                    </div>
                ) : session ? (
                    <div className="space-y-3">
                        {!isCollapsed && (
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium shadow-md">
                                    {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                                </div>
                            </div>
                        )}
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            size="sm"
                            title={isCollapsed ? "Sign Out" : undefined}
                            className={cn(
                                "w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10",
                                isCollapsed && "justify-center px-2"
                            )}
                        >
                            <LogOut className="w-4 h-4" />
                            {!isCollapsed && "Sign Out"}
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => signIn("google")}
                        variant="ghost"
                        size="sm"
                        title={isCollapsed ? "Sign In" : undefined}
                        className={cn(
                            "w-full justify-start gap-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <LogIn className="w-4 h-4" />
                        {!isCollapsed && "Sign In with Google"}
                    </Button>
                )}
            </div>
        </div>
    );
}
