"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Bookmark, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks-context";

interface SurahInteractiveProps {
    surah: {
        id: number;
        transliteration: string;
        translation: string;
        type: string;
    };
}

export function SurahInteractive({ surah }: SurahInteractiveProps) {
    const { addBookmark, isBookmarked, removeBookmark } = useBookmarks();

    // Create a pseudo-id for the Surah bookmark (bookmarking verse 1 by default for now)
    const bookmarkId = `${surah.id}:1`;
    const bookmarked = isBookmarked(bookmarkId);

    const toggleBookmark = () => {
        if (bookmarked) {
            removeBookmark(bookmarkId);
        } else {
            addBookmark({
                id: bookmarkId,
                surahId: surah.id,
                surahName: surah.transliteration,
                verseId: 1
            });
        }
    };

    return (
        <div className="sticky top-[72px] z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-gray-200 dark:border-zinc-800 shadow-sm transition-all">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/quran">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
                    </Link>
                    <div>
                        <h1 className="font-bold text-slate-900 dark:text-white">{surah.transliteration}</h1>
                        <p className="text-xs text-slate-500">{surah.translation} • {surah.type}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleBookmark}
                        className={bookmarked ? "text-quran-gold fill-current" : ""}
                    >
                        <Bookmark className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon"><Share2 className="w-5 h-5" /></Button>
                </div>
            </div>
        </div>
    );
}
