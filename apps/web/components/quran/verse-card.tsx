"use client";

import { Verse } from "@/data/quran";
import { useReadingSettings } from "@/context/reading-settings-context";
import { memo } from "react";
import { Play, Copy, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIExplainButton } from "@/components/shared/ai-explain-button";
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

    // Use a specific font class. 'font-mushaf' is often nicer for reading, 
    // but 'font-arabic' (Amiri) is good for Indopak.
    // Let's stick to 'font-arabic' for general reading, or use settings to decide if we had that granularity.
    const fontClass = "font-arabic";

    const handleCopy = () => {
        navigator.clipboard.writeText(`${arabicText}\n\n${verse.englishTranslation}`);
        // Optionally show toast
    };

    return (
        <div
            ref={(el) => verseRef?.(verse.id, el)}
            className={cn(
                "group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out border",
                isActive
                    ? "bg-gradient-to-br from-white to-[#FDFBF7] dark:from-zinc-900 dark:to-zinc-900/80 border-emerald-500/30 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20 transform scale-[1.01]"
                    : "bg-white dark:bg-zinc-950/40 border-slate-100 dark:border-white/5 hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-black/40"
            )}
        >
            {/* Contextual Background Decoration (Optional subtle pattern) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-10 -mt-10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative p-6 md:p-8 flex flex-col gap-8">

                {/* Top Section: Verse Actions & Identification */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Verse Number Pill */}
                        <div className={cn(
                            "flex items-center justify-center min-w-[3rem] h-8 px-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-300",
                            isActive
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                        )}>
                            Ayah {verse.id}
                        </div>
                    </div>

                    {/* Action Buttons (Fades in on hover for desktop, always visible on active) */}
                    <div className={cn(
                        "flex items-center gap-1 transition-all duration-300",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}>
                        <ActionButton icon={<Play className="w-4 h-4 fill-current" />} onClick={() => onPlay?.(verse.id)} label="Play" />
                        <ActionButton icon={<Copy className="w-4 h-4" />} onClick={handleCopy} label="Copy" />
                        <ActionButton icon={<AIExplainButton contextId={`surah:${surahId}:${verse.id}`} text={verse.englishTranslation} type="icon" />} />
                        <ActionButton icon={<Share2 className="w-4 h-4" />} label="Share" />
                    </div>
                </div>

                {/* Middle Section: Content */}
                <div className="flex flex-col gap-8">

                    {/* Arabic Text Area */}
                    <div className="w-full text-right" dir="rtl">
                        <div
                            className={cn(
                                "leading-[2.5] text-slate-800 dark:text-slate-100 transition-all flex flex-wrap justify-start items-center gap-x-1.5",
                                fontClass
                            )}
                            style={{
                                fontSize: `${settings.fontSize}px`,
                                fontFamily: 'var(--font-amiri)',
                                // Use a slightly darker/richer color for text
                            }}
                        >
                            {verse.words && verse.words.length > 0 ? (
                                verse.words.map((word, idx) => {
                                    const isHighlighted = activeWordIndex === idx + 1;
                                    return (
                                        <span
                                            key={`${verse.id}-${word.id}-${idx}`}
                                            className={cn(
                                                "relative cursor-pointer transition-all duration-200 px-1 rounded-md",
                                                isHighlighted
                                                    ? "text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-500/10"
                                                    : "hover:text-emerald-600 dark:hover:text-emerald-400"
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

                    {/* Translation Area */}
                    {settings.translationMode !== 'none' && (
                        <div className="flex flex-col gap-6 pt-6 border-t border-slate-100 dark:border-white/5">

                            {/* English Translation */}
                            {(settings.translationMode === 'en' || settings.translationMode === 'both') && verse.englishTranslation && (
                                <div className="space-y-2">
                                    <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-sans font-light tracking-wide">
                                        {verse.englishTranslation}
                                    </p>
                                </div>
                            )}

                            {/* Urdu Translation */}
                            {(settings.translationMode === 'ur' || settings.translationMode === 'both') && (
                                <div className="text-right space-y-2" dir="rtl">
                                    <p className="text-xl md:text-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-arabic text-right">
                                        {verse.translation}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

function ActionButton({ icon, onClick, label }: { icon: React.ReactNode, onClick?: () => void, label?: string }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="h-9 w-9 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full transition-colors"
            title={label}
        >
            {icon}
        </Button>
    )
}

