import { Navbar } from "@/components/layout/navbar";
import { topicsData } from "@/data/topics";
import { quranData } from "@/data/quran";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TopicDetailPage({ params }: { params: { slug: string } }) {
    const topic = topicsData.find(t => t.id === params.slug);

    if (!topic) {
        return notFound();
    }

    // Look up verses (mock logic: find verses based on IDs stored in topic)
    // In real app, this would be a DB query
    const relevantVerses: any[] = [];

    // Naive search in mock data for demo
    quranData.forEach(surah => {
        surah.verses.forEach(verse => {
            if (topic.verses.includes(verse.id) && surah.id === 1 /* Just matching some for demo */) {
                relevantVerses.push({ ...verse, surah: surah });
            }
        });
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                <Link href="/topics" className="inline-block mb-6">
                    <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Topics
                    </Button>
                </Link>

                <header className="mb-10 border-b border-gray-200 dark:border-zinc-800 pb-10">
                    <span className="text-quran-gold text-sm font-bold uppercase tracking-wider">Topic</span>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">{topic.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{topic.description}</p>
                </header>

                <div className="space-y-6">
                    {relevantVerses.length > 0 ? relevantVerses.map((v, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Link href={`/quran/${v.surah.id}`} className="text-sm font-semibold text-quran-gold hover:underline">
                                        {v.surah.transliteration} {v.surah.id}:{v.id}
                                    </Link>
                                </div>
                                <BookOpen className="w-5 h-5 text-gray-300" />
                            </div>
                            <p className="font-arabic text-3xl text-right leading-loose mb-6 text-slate-800 dark:text-white">
                                {v.text}
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                {v.translation}
                            </p>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">Verses for this topic are being indexed...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    return topicsData.map((t) => ({
        slug: t.id,
    }));
}
