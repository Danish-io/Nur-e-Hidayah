"use client";

import { useBookmarks } from "@/lib/bookmarks-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Bookmark as BookmarkIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
    const { bookmarks, removeBookmark } = useBookmarks();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">

            <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
                    <BookmarkIcon className="w-8 h-8 mr-3 text-quran-gold" /> My Bookmarks
                </h1>

                {bookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {bookmarks.map((b) => (
                            <div key={b.id} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 flex justify-between items-center shadow-sm">
                                <div>
                                    <Link href={`/quran/${b.surahId}`} className="text-xl font-bold text-slate-900 dark:text-white hover:text-quran-gold">
                                        Surah {b.surahName}
                                    </Link>
                                    <p className="text-sm text-slate-500">Verse {b.verseId}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Bookmarked on {new Date(b.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeBookmark(b.id)}
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">You haven't bookmarked any verses yet.</p>
                        <Link href="/quran">
                            <Button variant="premium">Start Reading</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
