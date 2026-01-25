import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { topicsData } from "@/data/topics";
import { Hash, ChevronRight } from "lucide-react";

export default function TopicsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Explore by Topic</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Discover the Quran's guidance on specific themes and subjects efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topicsData.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/topics/${topic.id}`}
                            className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-quran-gold hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-full bg-quran-gold/10 flex items-center justify-center text-quran-gold">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-500 dark:text-gray-400 group-hover:bg-quran-gold group-hover:text-white transition-colors">
                                    {topic.count} Verses
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-quran-gold transition-colors">
                                {topic.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                                {topic.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-quran-gold">
                                Browse Verses <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
