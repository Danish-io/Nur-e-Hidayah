"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, ChevronLeft } from "lucide-react";
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
                    "sticky top-0 z-50 w-full transition-all duration-500 glass border-b border-white/5",
                    isScrolled ? "py-2 shadow-2xl" : "py-4"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="container mx-auto px-4 grid grid-cols-3 items-center">

                    {/* Left: Menu Trigger */}
                    <div className="flex justify-start">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden text-slate-800 dark:text-emerald-100 hover:bg-emerald-500/10"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Center: Usage Logo (Glowing & Ornamented) */}
                    <div className="flex flex-col items-center justify-center relative group">
                        <Link href="/" className="relative z-10">
                            <h1 className="text-2xl md:text-4xl font-serif font-medium text-emerald-800 dark:text-emerald-400 tracking-[0.05em] whitespace-nowrap drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                Nur-e-Hidayah
                            </h1>
                        </Link>
                        {/* Ornament: Thin gold line */}
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent mt-1 group-hover:w-32 transition-all duration-700" />
                        <div className="absolute -inset-x-8 -inset-y-4 bg-emerald-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                    </div>

                    {/* Right: Actions (User & Theme) */}
                    <div className="flex justify-end items-center space-x-2">

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
                            className="fixed inset-y-0 left-0 z-[70] w-72 bg-[#1C1C1C] border-r border-white/5 shadow-2xl flex flex-col lg:hidden"
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
