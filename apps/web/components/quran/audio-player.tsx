"use client";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useReadingSettings } from "@/context/reading-settings-context";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Repeat1 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AudioPlayerHandle {
    togglePlay: () => void;
    playVerse: (index: number) => void;
    isPlaying: boolean;
}

interface AudioPlayerProps {
    surahName: string;
    surahNumber: number;
    verses: Array<{
        id: number;
        audio?: string;
        audioUrdu?: string;
        audioEnglish?: string;
        translation?: string;
        englishTranslation?: string;
        surahName?: string;
        surahId?: number;
        words?: Array<{ id: number; text: string; transliteration?: string; translation?: string }>;
        segments?: number[][];
        startTime?: number;
        endTime?: number;
    }>;
    onVerseChange?: (verseNumber: number, surahId?: number) => void;
    onWordChange?: (wordIndex: number | null, verseNumber?: number, surahId?: number) => void;
    onPlayStateChange?: (isPlaying: boolean) => void;
}

const getFallbackUrl = (surahId: number, verseId: number) => {
    const s = surahId.toString().padStart(3, '0');
    const v = verseId.toString().padStart(3, '0');
    return `https://everyayah.com/data/Alafasy_128kbps/${s}${v}.mp3`;
};

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(({ surahName, surahNumber, verses, onVerseChange, onWordChange, onPlayStateChange }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
    const [isTranslationPlaying, setIsTranslationPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastWordKeyRef = useRef<string | null>(null);
    const { audioTranslation } = useReadingSettings();

    // Expose controls to parent
    useImperativeHandle(ref, () => ({
        togglePlay: () => {
            if (!audioRef.current) return;
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
            }
        },
        playVerse: (index: number) => {
            if (index >= 0 && index < verses.length) {
                setIsTranslationPlaying(false);
                setCurrentVerseIndex(index);
                setIsPlaying(true);
            }
        },
        isPlaying
    }));

    // Current active verse
    const currentVerse = verses[currentVerseIndex];
    const displaySurahName = currentVerse?.surahName || surahName;
    const displaySurahNumber = currentVerse?.surahId || surahNumber;

    // Determine which audio source to use
    const getAudioSrc = () => {
        if (isTranslationPlaying) {
            if (audioTranslation === 'ur' && currentVerse?.audioUrdu) return currentVerse.audioUrdu;
            if (audioTranslation === 'en' && currentVerse?.audioEnglish) return currentVerse.audioEnglish;
        }
        return currentVerse?.audio || (currentVerse ? getFallbackUrl(displaySurahNumber, currentVerse.id) : undefined);
    };

    const audioSrc = getAudioSrc();

    useEffect(() => {
        // Notify parent of verse change
        if (currentVerse) {
            onVerseChange?.(currentVerse.id, currentVerse.surahId);
        }
    }, [currentVerseIndex, currentVerse, onVerseChange]);

    useEffect(() => {
        onPlayStateChange?.(isPlaying);
    }, [isPlaying, onPlayStateChange]);

    useEffect(() => {
        if (!audioRef.current) return;

        // Force load new source
        audioRef.current.load();

        // If it's the Arabic recitation (not translation), seek to startTime
        if (!isTranslationPlaying && currentVerse?.startTime !== undefined) {
            audioRef.current.currentTime = currentVerse.startTime / 1000;
        }

        // Handle auto-play when track changes if we are already playing
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Playback error:", e);
                });
            }
        }
    }, [currentVerseIndex, isTranslationPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const currentMs = current * 1000;
            const dur = audioRef.current.duration;
            setCurrentTime(current);
            if (dur > 0) {
                setProgress((current / dur) * 100);
            }

            // Word highlighting logic — only emit when the word actually changes
            if (!isTranslationPlaying && currentVerse?.segments) {
                const currentSegment = currentVerse.segments.find(
                    s => currentMs >= s[1] && currentMs <= s[2]
                );
                const newWordKey = currentSegment
                    ? `${currentVerse.id}-${currentSegment[0]}`
                    : `${currentVerse.id}-null`;

                if (newWordKey !== lastWordKeyRef.current) {
                    lastWordKeyRef.current = newWordKey;
                    if (currentSegment) {
                        onWordChange?.(currentSegment[0], currentVerse.id, currentVerse.surahId);
                    } else {
                        onWordChange?.(null, currentVerse.id, currentVerse.surahId);
                    }
                }

                // Smooth transitions for chapter-level audio
                if (currentVerse.endTime && currentMs >= currentVerse.endTime + 100) {
                    handleEnded();
                }
            } else {
                if (lastWordKeyRef.current !== 'none') {
                    lastWordKeyRef.current = 'none';
                    onWordChange?.(null);
                }
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            if (isPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const skipForward = () => {
        if (currentVerseIndex < verses.length - 1) {
            setIsTranslationPlaying(false);
            setCurrentVerseIndex(prev => prev + 1);
        }
    };

    const skipBackward = () => {
        if (currentVerseIndex > 0) {
            setIsTranslationPlaying(false);
            setCurrentVerseIndex(prev => prev - 1);
        }
    };

    const handleEnded = () => {
        if (!isTranslationPlaying && audioTranslation !== 'none') {
            const hasTranslation = (audioTranslation === 'ur' && currentVerse?.audioUrdu) ||
                (audioTranslation === 'en' && currentVerse?.audioEnglish);
            if (hasTranslation) {
                setIsTranslationPlaying(true);
                return;
            }
        }

        setIsTranslationPlaying(false);
        if (repeatMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else if (currentVerseIndex < verses.length - 1) {
            setCurrentVerseIndex(prev => prev + 1);
        } else if (repeatMode === 'all') {
            setCurrentVerseIndex(0);
        } else {
            setIsPlaying(false);
        }
    };

    const togglePlayInternal = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume;
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const toggleRepeat = () => {
        const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(repeatMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        setRepeatMode(nextMode);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!verses.length) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 p-4 shadow-2xl z-50">
            <div className="container mx-auto max-w-4xl">
                <audio
                    ref={audioRef}
                    src={audioSrc || ""}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onError={(e) => console.error("Audio Error:", e.currentTarget.error)}
                />

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-quran-gold to-amber-600 flex items-center justify-center shadow-lg shrink-0">
                            <span className="text-white font-bold text-sm">{currentVerse?.id}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{displaySurahName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                                {isTranslationPlaying
                                    ? (audioTranslation === 'ur' ? currentVerse?.translation : currentVerse?.englishTranslation)
                                    : `Verse ${currentVerse?.id}`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleRepeat}
                            className={`text-slate-400 hover:text-quran-gold ${repeatMode !== 'none' ? 'text-quran-gold' : ''}`}
                        >
                            {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={skipBackward}
                            className="text-slate-400 hover:text-quran-gold"
                            disabled={currentVerseIndex === 0}
                        >
                            <SkipBack className="w-5 h-5" />
                        </Button>
                        <button
                            onClick={togglePlayInternal}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-quran-gold to-amber-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={skipForward}
                            className="text-slate-400 hover:text-quran-gold"
                            disabled={currentVerseIndex === verses.length - 1}
                        >
                            <SkipForward className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex-1 flex flex-col space-y-1">
                        <div
                            className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full cursor-pointer relative group"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-quran-gold to-amber-500 rounded-full transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-100 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMute}
                            className="text-slate-400 hover:text-quran-gold"
                        >
                            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-gray-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-quran-gold"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

AudioPlayer.displayName = "AudioPlayer";
