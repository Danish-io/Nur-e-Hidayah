"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const AYATS = [
    { text: "Indeed, in the remembrance of Allah do hearts find rest.", ref: "Qur'an 13:28" },
    { text: "So remember Me; I will remember you.", ref: "Qur'an 2:152" },
    { text: "And He found you lost and guided [you].", ref: "Qur'an 93:7" },
    { text: "Truly, with hardship comes ease.", ref: "Qur'an 94:6" },
    { text: "Allah does not burden a soul beyond that it can bear.", ref: "Qur'an 2:286" }
];

export function DailyAyah() {
    const [ayah, setAyah] = useState(AYATS[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Daily rotation based on date
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        setAyah(AYATS[dayOfYear % AYATS.length]);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex items-center gap-3 px-6 py-2 rounded-full glass-emerald text-sm md:text-base font-serif"
            >
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <p className="text-slate-700 dark:text-emerald-100/80 italic tracking-wide">
                    “{ayah.text}”
                    <span className="ml-2 text-[10px] md:text-xs font-sans not-italic font-bold text-accent/70 uppercase tracking-widest">
                        — {ayah.ref}
                    </span>
                </p>
            </motion.div>
        </AnimatePresence>
    );
}
