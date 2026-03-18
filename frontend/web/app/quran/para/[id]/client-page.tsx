"use client";

import { Surah, Verse } from "@/data/quran";
import { Juz } from "@/data/juz";
import { useState, useRef, useMemo } from "react";
import { ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { VerseCard } from "@/components/quran/verse-card";
import { AudioPlayer, AudioPlayerHandle } from "@/components/quran/audio-player";
import { ReadingSettingsProvider } from "@/context/reading-settings-context";
import { ReadingToolbar } from "@/components/quran/reading-toolbar";

const surahData = [
    { id: 1, name: "الفاتحة", transliteration: "Al-Fatiha", translation: "The Opener" },
    { id: 2, name: "البقرة", transliteration: "Al-Baqarah", translation: "The Cow" },
    { id: 3, name: "آل عمران", transliteration: "Al-Imran", translation: "Family of Imran" },
    { id: 4, name: "النساء", transliteration: "An-Nisa", translation: "The Women" },
    // Simplified list for title mapping, the full surah objects come via props
];

export default function ParaPageClient({ juz, verses }: { juz: Juz; verses: Array<{ surah: Surah; verse: Verse; verseNumber: number }> }) {
    const [activeVerse, setActiveVerse] = useState<number | null>(null);
    const [activeWordKey, setActiveWordKey] = useState<string | null>(null); // "verseId-wordIndex"
    const [currentSurahId, setCurrentSurahId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioPlayerRef = useRef<AudioPlayerHandle>(null);
    const verseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const router = useRouter();

    // Group verses by Surah for display
    const versesGroupedBySurah = useMemo(() => {
        const groups: { [key: number]: { surah: Surah; verses: Array<{ verse: Verse; verseNumber: number; index: number }> } } = {};
        verses.forEach((v, index) => {
            if (!groups[v.surah.id]) {
                groups[v.surah.id] = { surah: v.surah, verses: [] };
            }
            groups[v.surah.id].verses.push({ verse: v.verse, verseNumber: v.verseNumber, index });
        });
        return groups;
    }, [verses]);

    const handleVerseChange = (verseNumber: number, surahId?: number) => {
        setActiveVerse(verseNumber);
        if (surahId) {
            setCurrentSurahId(surahId);
        }

        // Scroll into view
        const key = surahId ? `${surahId}-${verseNumber}` : `verse-${verseNumber}`;
        const element = verseRefs.current[key];
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleWordChange = (wordIndex: number | null, verseNumber?: number, surahId?: number) => {
        if (wordIndex !== null && verseNumber && surahId) {
            setActiveWordKey(`${surahId}-${verseNumber}-${wordIndex}`);
        } else {
            setActiveWordKey(null);
        }
    };

    const handlePlayVerse = (surahId: number, verseNumber: number, index: number) => {
        setCurrentSurahId(surahId);
        setActiveVerse(verseNumber);
        audioPlayerRef.current?.playVerse(index);
    };

    // Transform verses for the player
    const playerVerses = verses.map(v => ({
        ...v.verse,
        surahName: v.surah.transliteration,
        surahId: v.surah.id
    }));

    return (
        <ReadingSettingsProvider>
            <div className="min-h-screen bg-quran-paper dark:bg-zinc-950 pb-32">
                {/* Fixed Title Header */}
                <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
                    <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-slate-500">
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Para {juz.id}</h1>
                                <p className="text-sm text-slate-500 font-arabic">{juz.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-medium text-quran-gold uppercase tracking-wider">Now Reading</p>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Surah {surahData.find(s => s.id === (currentSurahId || juz.startSurah))?.transliteration || '...'}</p>
                        </div>
                    </div>
                </div>

                <ReadingToolbar className="top-[73px]" />

                <div className="container mx-auto px-4 pt-8 max-w-4xl space-y-12">
                    {/* Render verses grouped by Surah */}
                    {Object.values(versesGroupedBySurah).map(({ surah, verses }) => (
                        <div key={surah.id} className="space-y-6">
                            {/* Surah Divider/Header */}
                            <div className="relative py-8">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-100 dark:border-zinc-800"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <div className="bg-quran-paper dark:bg-zinc-950 px-6 flex items-center gap-4">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{surah.id}. {surah.transliteration}</h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-arabic">{surah.name} • {surah.translation}</p>
                                        </div>
                                        <button
                                            className="w-10 h-10 rounded-full bg-quran-gold/10 text-quran-gold flex items-center justify-center hover:bg-quran-gold hover:text-white transition-all shadow-sm"
                                            onClick={() => handlePlayVerse(surah.id, verses[0].verseNumber, verses[0].index)}
                                            title="Click to play from this Surah"
                                        >
                                            <Play className="w-4 h-4 fill-current ml-0.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Bismillah */}
                                {surah.id !== 1 && surah.id !== 9 && (
                                    <div className="text-center mt-8 mb-12">
                                        <h3 className="font-arabic text-4xl leading-relaxed text-slate-800 dark:text-slate-100">
                                            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                                        </h3>
                                        <p className="text-slate-500 mt-2 text-sm font-arabic tracking-wide" style={{ fontFamily: 'var(--font-amiri)' }}>شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</p>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">In the Name of Allah, the Most Gracious, the Most Merciful</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {verses.map(({ verse, verseNumber, index }) => {
                                    const isActive = activeVerse === verseNumber && currentSurahId === surah.id;

                                    // Parse active word key: "surahId-verseNumber-wordIndex"
                                    const parts = activeWordKey?.split('-');
                                    const wordSurahId = parts ? parseInt(parts[0]) : null;
                                    const wordVerseId = parts ? parseInt(parts[1]) : null;
                                    const activeWordIndex = (wordSurahId === surah.id && wordVerseId === verseNumber)
                                        ? parseInt(parts![2])
                                        : null;

                                    return (
                                        <div key={`${surah.id}-${verseNumber}`} ref={(el) => { verseRefs.current[`${surah.id}-${verseNumber}`] = el; }}>
                                            <VerseCard
                                                verse={verse}
                                                surahId={surah.id}
                                                isActive={isActive}
                                                activeWordIndex={activeWordIndex}
                                                onPlay={() => handlePlayVerse(surah.id, verseNumber, index)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 z-50">
                <AudioPlayer
                    ref={audioPlayerRef}
                    key={`juz-${juz.id}`}
                    surahName={juz.name}
                    surahNumber={juz.id}
                    verses={playerVerses}
                    onVerseChange={handleVerseChange}
                    onWordChange={handleWordChange}
                    onPlayStateChange={setIsPlaying}
                />
            </div>
        </ReadingSettingsProvider>
    );
}
