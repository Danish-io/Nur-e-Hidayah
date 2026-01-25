"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
    surahId: number;
    surahName: string;
}

export function AudioPlayer({ surahId, surahName }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Example audio source (Al-Afasy)
    // Audio source: Urdu Translation (Shamshad Ali Khan)
    const audioSrc = `https://archive.org/download/Holy-Quran-Urdu-Translation/Qari-Wahid-Zafar-Qasmi/${surahId.toString().padStart(3, '0')}.mp3`;

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 p-4 shadow-lg z-50">
            <div className="container mx-auto max-w-4xl flex items-center justify-between">
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />

                <div className="flex items-center space-x-4">
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Now Playing</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Surah {surahName}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center flex-1 mx-8">
                    <div className="flex items-center space-x-6 mb-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-quran-gold">
                            <SkipBack className="w-5 h-5" />
                        </Button>
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-quran-gold text-white flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-quran-gold">
                            <SkipForward className="w-5 h-5" />
                        </Button>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-200 dark:bg-zinc-700 rounded-full cursor-pointer relative">
                        <div
                            className="absolute left-0 top-0 h-full bg-quran-gold rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="hidden sm:flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-slate-400" />
                    <div className="w-20 h-1 bg-gray-200 dark:bg-zinc-700 rounded-full">
                        <div className="w-2/3 h-full bg-slate-400 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
