"use client";

import { Surah } from "@/data/quran";
import { SurahInteractive } from "@/components/quran/surah-interactive";
import { AudioPlayer, AudioPlayerHandle } from "@/components/quran/audio-player";
import { ReadingToolbar } from "@/components/quran/reading-toolbar";
import { VerseCard } from "@/components/quran/verse-card";
import { SurahHeaderPlayButton } from "@/components/quran/surah-header-play-button";
import { MushafView } from "@/components/quran/mushaf-view";
import { useReadingSettings } from "@/context/reading-settings-context";
import { useState, useRef, useCallback } from "react";

export default function SurahPageClient({ surah }: { surah: Surah }) {
    const [activeVerse, setActiveVerse] = useState<number | null>(null);
    const [activeWordKey, setActiveWordKey] = useState<string | null>(null); // "verseId-wordIndex"
    const [isPlaying, setIsPlaying] = useState(false);
    const audioPlayerRef = useRef<AudioPlayerHandle>(null);
    const verseRefs = useRef<{ [key: number]: HTMLDivElement | HTMLSpanElement | null }>({});
    const { displayMode } = useReadingSettings();

    const handleVerseChange = useCallback((verseNumber: number, surahId?: number) => {
        setActiveVerse(verseNumber);

        // Auto-scroll to active verse
        const verseElement = verseRefs.current[verseNumber];
        if (verseElement) {
            verseElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, []);

    const handleWordChange = useCallback((wordIndex: number | null, verseNumber?: number, surahId?: number) => {
        if (wordIndex !== null && verseNumber) {
            setActiveWordKey(`${verseNumber}-${wordIndex}`);
        } else {
            setActiveWordKey(null);
        }
    }, []);

    const handlePlayPause = useCallback(() => {
        audioPlayerRef.current?.togglePlay();
    }, []);

    const handleMushafVerseClick = useCallback((v: number) => audioPlayerRef.current?.playVerse(v - 1), []);
    const handleMushafVerseRef = useCallback((v: number, el: HTMLSpanElement | null) => { verseRefs.current[v] = el; }, []);
    const handleVersePlay = useCallback((verseId: number) => { audioPlayerRef.current?.playVerse(verseId - 1); }, []);
    const handleVerseRef = useCallback((verseId: number, el: HTMLDivElement | null) => { verseRefs.current[verseId] = el; }, []);

    return (
        <>
            <div className="min-h-screen bg-zinc-950 pb-32">
                <SurahInteractive surah={surah} />
                <ReadingToolbar className="top-[136px]" />

                <div className="container mx-auto px-4 pt-8 max-w-4xl">
                    <div className="mb-8 flex flex-col items-center">
                        <SurahHeaderPlayButton
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                        />
                    </div>

                    {/* Bismillah */}
                    {surah.id !== 1 && surah.id !== 9 && (
                        <div className="text-center mb-12">
                            <h2 className="font-arabic text-4xl leading-relaxed text-slate-100">
                                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                            </h2>
                            <p className="text-slate-500 mt-2 text-sm font-arabic tracking-wide" style={{ fontFamily: 'var(--font-amiri)' }}>شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</p>
                            <p className="text-slate-600 text-xs uppercase tracking-widest mt-1">In the Name of Allah, the Most Gracious, the Most Merciful</p>
                        </div>
                    )}

                    <div className="animate-fade-in-up">
                        {surah.verses.length === 0 ? (
                            <div className="text-center py-20 text-slate-500 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800">
                                <p className="text-lg">No verses found.</p>
                                <p className="text-sm opacity-60">We couldn&apos;t retrieve the verses for this Surah.</p>
                            </div>
                        ) : displayMode === 'mushaf' ? (
                            <MushafView
                                surah={surah}
                                activeVerse={activeVerse}
                                onVerseClick={handleMushafVerseClick}
                                verseRef={handleMushafVerseRef}
                            />
                        ) : (
                            <div className="space-y-4">
                                {surah.verses.map((verse) => {
                                    const isVerseActive = activeVerse === verse.id;

                                    // Parse active word key: "verseNumber-wordIndex"
                                    const parts = activeWordKey?.split('-');
                                    const wordVerseId = parts ? parseInt(parts[0]) : null;
                                    const activeWordIndex = wordVerseId === verse.id ? parseInt(parts![1]) : null;

                                    return (
                                        <VerseCard
                                            key={verse.id}
                                            verse={verse}
                                            surahId={surah.id}
                                            isActive={isVerseActive}
                                            activeWordIndex={activeWordIndex}
                                            onPlay={handleVersePlay}
                                            verseRef={handleVerseRef}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Closing Dua */}
                    {surah.verses.length > 0 && (
                        <p className="text-center text-sm text-slate-600 mt-12 italic tracking-wide">
                            May Allah accept your recitation on this blessed night.
                        </p>
                    )}
                </div>
            </div>

            {/* Audio Player */}
            <AudioPlayer
                ref={audioPlayerRef}
                surahName={surah.transliteration}
                surahNumber={surah.id}
                verses={surah.verses}
                onVerseChange={handleVerseChange}
                onWordChange={handleWordChange}
                onPlayStateChange={setIsPlaying}
            />
        </>
    );
}
