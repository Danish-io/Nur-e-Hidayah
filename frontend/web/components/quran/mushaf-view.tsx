"use client";

import { Surah } from "@/data/quran";
import { useReadingSettings } from "@/context/reading-settings-context";
import { juzData } from "@/data/juz";
import { useMemo } from "react";

interface MushafViewProps {
    surah: Surah;
    activeVerse?: number | null;
    onVerseClick?: (verseNumber: number) => void;
    verseRef?: (verseId: number, el: HTMLSpanElement | null) => void;
}

/**
 * Mushaf Sharif View
 *
 * Renders Quran text in an authentic, printed-Mushaf style:
 * - Plain white page, black text
 * - Noto Naskh Arabic (Mushaf-grade) font
 * - Proper Bismillah placement
 * - Standard Unicode ayah markers ﴿ ۝ ﴾
 * - No decorations, no colors, no animations
 * - Optimized for focused recitation
 */
export function MushafView({
    surah,
    activeVerse,
    onVerseClick,
    verseRef,
}: MushafViewProps) {
    const settings = useReadingSettings();

    // Find the Juz for this Surah
    const juz = useMemo(() => {
        return juzData.find(
            (j) =>
                (j.startSurah < surah.id && j.endSurah > surah.id) ||
                j.startSurah === surah.id ||
                j.endSurah === surah.id
        );
    }, [surah.id]);

    // Show Bismillah for all surahs except Al-Fatiha (1, it's part of verses) and At-Tawbah (9)
    const showBismillah = surah.id !== 1 && surah.id !== 9;

    // Safety check
    if (!surah.verses || surah.verses.length === 0) {
        return (
            <div className="text-center py-20 text-slate-500 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800">
                <p className="text-lg">No verses available for this Surah.</p>
            </div>
        );
    }

    const fontSize = settings.fontSize || 28;

    return (
        <div className="max-w-4xl mx-auto">
            {/* ═══ Mushaf Page ═══ */}
            <div
                className="bg-white dark:bg-zinc-950 shadow-sm border border-gray-100 dark:border-zinc-800"
                style={{ padding: "2.5rem 1.5rem" }}
            >
                {/* ─── Surah Header Panel ─── */}
                <div className="border border-gray-300 dark:border-zinc-600 rounded-sm mb-8">
                    <div className="flex items-center justify-between px-6 py-3">
                        {/* Right: Surah info */}
                        <div className="text-right flex-1">
                            <span
                                className="font-mushaf text-sm text-gray-500 dark:text-zinc-400"
                            >
                                {surah.transliteration} &bull; {surah.totalVerses} آيات
                            </span>
                        </div>

                        {/* Center: Surah Name */}
                        <div className="text-center px-8">
                            <h1
                                className="font-mushaf text-3xl md:text-4xl text-black dark:text-white leading-relaxed"
                            >
                                سُورَةُ {surah.name}
                            </h1>
                        </div>

                        {/* Left: Juz info */}
                        <div className="text-left flex-1">
                            <span className="font-mushaf text-sm text-gray-500 dark:text-zinc-400">
                                {juz?.nameArabic || "الجزء"} &bull; {surah.type === "Meccan" ? "مكية" : "مدنية"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── Bismillah ─── */}
                {showBismillah && (
                    <div className="text-center mb-10">
                        <p
                            className="font-mushaf text-black dark:text-white leading-relaxed"
                            style={{ fontSize: `${Math.max(fontSize, 30)}px` }}
                            dir="rtl"
                        >
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                        </p>
                    </div>
                )}

                {/* ─── Separator Line ─── */}
                <div className="border-t border-gray-200 dark:border-zinc-800 mb-8" />

                {/* ─── Quran Text Body ─── */}
                <div
                    className="font-mushaf text-black dark:text-white text-justify leading-[3] tracking-normal select-text"
                    style={{
                        fontSize: `${fontSize}px`,
                        direction: "rtl",
                        wordSpacing: "0.05em",
                        lineHeight: "3.2",
                    }}
                >
                    {surah.verses.map((verse) => {
                        const isActive = activeVerse === verse.id;
                        // Robust text resolution:
                        // 1. Try Indopak if setting enabled
                        // 2. Try Standard Text (Uthmani)
                        // 3. Fallback to constructing from words
                        const arabicText =
                            (settings.script === "indopak" && verse.textIndopak)
                                ? verse.textIndopak
                                : (verse.text || verse.words?.map(w => w.text).join(' '));

                        if (!arabicText) return null;

                        return (
                            <span
                                key={verse.id}
                                ref={(el) => verseRef?.(verse.id, el)}
                                className={`
                                    inline cursor-pointer transition-colors duration-200
                                    ${isActive
                                        ? "bg-gray-100 dark:bg-zinc-800/60 rounded-sm"
                                        : "hover:bg-gray-50 dark:hover:bg-zinc-900/40"
                                    }
                                `}
                                onClick={() => onVerseClick?.(verse.id)}
                            >
                                {/* Verse Text */}
                                <span>{arabicText}</span>

                                {/* Ayah End Marker — Standard Mushaf Style */}
                                <span
                                    className="inline-flex items-center justify-center mx-1 select-none align-middle"
                                    style={{
                                        fontSize: `${Math.round(fontSize * 0.85)}px`,
                                        fontFamily: "serif",
                                    }}
                                >
                                    <span className="text-gray-700 dark:text-zinc-300">
                                        ﴿
                                    </span>
                                    <span
                                        className="font-sans text-gray-600 dark:text-zinc-400 mx-0.5 tabular-nums"
                                        style={{ fontSize: `${Math.round(fontSize * 0.5)}px` }}
                                    >
                                        {verse.id}
                                    </span>
                                    <span className="text-gray-700 dark:text-zinc-300">
                                        ﴾
                                    </span>
                                </span>
                            </span>
                        );
                    })}
                </div>

                {/* ─── Bottom Separator ─── */}
                <div className="border-t border-gray-200 dark:border-zinc-800 mt-10 mb-4" />

                {/* ─── Page Footer ─── */}
                <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-400 dark:text-zinc-500 font-sans tracking-wider">
                        {surah.transliteration} &mdash; {surah.translation}
                    </span>
                </div>
            </div>
        </div>
    );
}
