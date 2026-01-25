"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Moon, Sun, ChevronLeft } from "lucide-react";
import { SidebarContent } from "@/components/layout/sidebar-content";

export function Navbar() {
    const { scrollY } = useScroll();
    const { theme, setTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <motion.nav
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5",
                    isScrolled ? "shadow-sm py-3" : "py-4"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 grid grid-cols-3 items-center">

                    {/* Left: Menu Trigger */}
                    <div className="flex justify-start">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden text-slate-800 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-zinc-800"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Center: Usage Logo */}
                    <div className="flex flex-col items-center justify-center">
                        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-emerald-700 dark:text-emerald-500 tracking-wide">
                            Nur-e-Hidayah
                        </Link>
                        <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase font-medium mt-0.5">
                            A gentle guide back to Allah
                        </span>
                    </div>

                    {/* Right: Actions (User & Theme) */}
                    <div className="flex justify-end items-center space-x-2">
                        <Link href="/profile">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-800 dark:text-gray-200 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-zinc-800"
                            >
                                <User className="w-6 h-6" />
                            </Button>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-slate-800 dark:text-gray-200 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-zinc-800"
                        >
                            {mounted && theme === "dark" ? (
                                <Sun className="w-6 h-6" />
                            ) : (
                                <Moon className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[70] w-72 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 shadow-2xl flex flex-col lg:hidden"
                        >
                            <div className="flex-1 overflow-hidden overflow-y-auto">
                                <SidebarContent
                                    onItemClick={() => setIsMobileMenuOpen(false)}
                                    onToggle={() => setIsMobileMenuOpen(false)} // Pass close action as toggle
                                />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
