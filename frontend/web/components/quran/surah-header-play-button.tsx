"use client";

import { Play, Pause, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SurahHeaderPlayButtonProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    currentReciter?: string;
}

export function SurahHeaderPlayButton({ isPlaying, onPlayPause, currentReciter = "Mishary Rashid Alafasy" }: SurahHeaderPlayButtonProps) {
    return (
        <div className="hidden md:flex items-center gap-4 py-6">
            <button
                onClick={onPlayPause}
                className="w-16 h-16 rounded-full border-2 border-[#10B981] flex items-center justify-center bg-[#E6F7F2] text-[#10B981] hover:scale-105 transition-all shadow-sm group"
            >
                {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                ) : (
                    <Play className="w-8 h-8 fill-current translate-x-1" />
                )}
            </button>

            <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Play Surah</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto font-normal text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                            {currentReciter}
                            <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Mishary Rashid Alafasy</DropdownMenuItem>
                        <DropdownMenuItem disabled>More reciters coming soon...</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
