"use client";

import { Verse } from "@/data/quran";
import { useReadingSettings } from "@/context/reading-settings-context";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface VerseCardProps {
    verse: Verse;
    surahId: number;
    isActive: boolean;
    activeWordIndex?: number | null;
    onPlay?: (verseId: number) => void;
    verseRef?: (verseId: number, el: HTMLDivElement | null) => void;
}

export const VerseCard = memo(function VerseCard({ verse, surahId, isActive, activeWordIndex, onPlay, verseRef }: VerseCardProps) {
    const settings = useReadingSettings();

    // Determine Arabic text source based on script setting
    const arabicText = settings.script === 'indopak' && verse.textIndopak
        ? verse.textIndopak
        : verse.text;

    return (
        <div
            ref={(el) => verseRef?.(verse.id, el)}
            className={cn(
                "relative rounded-2xl transition-all duration-300 border",
                isActive
                    ? "bg-zinc-800/90 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                    : "bg-zinc-900/70 border-zinc-800/60 hover:border-zinc-700/80"
            )}
        >
            <div className="p-5 md:p-7 flex flex-col gap-5">

                {/* Ayah Badge */}
                <div>
                    <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors",
                        isActive
                            ? "bg-emerald-500 text-white"
                            : "bg-emerald-500/15 text-emerald-400"
                    )}>
                        Ayah {verse.id}
                    </span>
                </div>

                {/* Arabic Text */}
                <div className="w-full text-right" dir="rtl">
                    <div
                        className="leading-[2.8] text-slate-100 font-arabic"
                        style={{
                            fontSize: `${settings.fontSize}px`,
                            fontFamily: 'var(--font-amiri)',
                        }}
                    >
                        {verse.words && verse.words.length > 0 ? (
                            verse.words.map((word, idx) => {
                                const isHighlighted = activeWordIndex === idx + 1;
                                return (
                                    <span
                                        key={`${verse.id}-${word.id}-${idx}`}
                                        className={cn(
                                            "relative transition-colors duration-200 px-0.5",
                                            isHighlighted
                                                ? "text-emerald-400"
                                                : ""
                                        )}
                                    >
                                        {word.text}
                                    </span>
                                );
                            })
                        ) : (
                            <span>{arabicText}</span>
                        )}
                    </div>
                </div>

                {/* Translation */}
                {settings.translationMode !== 'none' && (
                    <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800/80">

                        {/* English Translation */}
                        {(settings.translationMode === 'en' || settings.translationMode === 'both') && verse.englishTranslation && (
                            <p className="text-[15px] md:text-base leading-relaxed text-slate-400 font-sans">
                                {verse.englishTranslation}
                            </p>
                        )}

                        {/* Urdu Translation */}
                        {(settings.translationMode === 'ur' || settings.translationMode === 'both') && (
                            <div className="text-right" dir="rtl">
                                <p className="text-lg md:text-xl leading-relaxed text-slate-400 font-arabic">
                                    {verse.translation}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});
