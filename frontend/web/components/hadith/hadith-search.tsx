"use client";

import { useState, useCallback, useRef } from "react";
import { Search, Loader2, BookOpen, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { HadithSearchResult } from "@/app/api/hadith-search/route";

function highlightText(text: string, query: string) {
    if (!query) return text;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
            ? <mark key={i} className="bg-emerald-200 dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-100 rounded px-0.5">{part}</mark>
            : part
    );
}

export function HadithSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<HadithSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const doSearch = useCallback(async (q: string) => {
        if (q.trim().length < 2) {
            setResults([]);
            setSearched(false);
            return;
        }
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`/api/hadith-search?q=${encodeURIComponent(q)}&limit=15`);
            const data = await res.json();
            setResults(data.results || []);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => doSearch(val), 400);
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setSearched(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 mb-10">
            {/* Search Input */}
            <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    placeholder="Search hadiths... (e.g. namaz, prayer, fasting)"
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-sm text-base transition-all"
                />
                {loading && (
                    <Loader2 className="absolute right-4 w-5 h-5 text-emerald-500 animate-spin" />
                )}
                {!loading && query && (
                    <button onClick={clearSearch} className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Search Results */}
            {searched && (
                <div className="mt-3 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 shadow-lg">
                    {results.length === 0 && !loading ? (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                            <p className="font-medium">No hadiths found for &quot;{query}&quot;</p>
                            <p className="text-sm mt-1 opacity-70">Try a different keyword like &apos;prayer&apos;, &apos;charity&apos;, or &apos;fasting&apos;</p>
                        </div>
                    ) : (
                        <>
                            <div className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {loading ? "Searching…" : `${results.length} results found`}
                                </span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[500px] overflow-y-auto">
                                {results.map((result) => (
                                    <Link
                                        key={`${result.slug}-${result.id}`}
                                        href={`/hadith/${result.slug}/${result.bookNumber}`}
                                        className="block p-4 hover:bg-emerald-50 dark:hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                                                        {result.source}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {result.book}
                                                    </span>
                                                    {result.grade && (
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded">
                                                            {result.grade}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                                                    &quot;{highlightText(result.text, query)}&quot;
                                                </p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-1 shrink-0 transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
