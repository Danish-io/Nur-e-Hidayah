import { Book, AlertCircle, Share2, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getHadiths } from "@/lib/get-hadith";
import { HadithLanguageSwitcher } from "@/components/hadith/language-switcher";
import { AIExplainButton } from "@/components/shared/ai-explain-button";

const hadithBooks: Record<string, { title: string; description: string }> = {
    bukhari: { title: "Sahih al-Bukhari", description: "Considered the most authentic collection." },
    muslim: { title: "Sahih Muslim", description: "Also highly authentic and widely respected." },
    abudawud: { title: "Sunan Abu Dawud", description: "Focuses on practical rulings." },
    tirmidhi: { title: "Jami' al-Tirmidhi", description: "Known for its classifications and commentary." },
    nasai: { title: "Sunan al-Nasa'i", description: "Emphasizes legal rulings and practices." },
    ibnmajah: { title: "Sunan Ibn Majah", description: "Completes the six canonical works." }
};

export default async function HadithChapterPage({
    params,
    searchParams
}: {
    params: { slug: string, chapterId: string },
    searchParams: { page?: string, lang?: string }
}) {
    const bookInfo = hadithBooks[params.slug];
    if (!bookInfo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Book Not Found</h1>
                <Link href="/hadith">
                    <Button variant="outline">Return to Collection</Button>
                </Link>
            </div>
        );
    }

    const page = Number(searchParams.page) || 1;
    const lang = searchParams.lang || "en";
    const isRtl = lang === "ur" || lang === "ar";
    // Increase font size for Arabic/Urdu scripts for better readability
    const fontClass = isRtl ? "font-arabic text-2xl leading-loose text-right" : "font-serif text-lg leading-relaxed text-left";

    const { hadiths, total, totalPages } = await getHadiths(params.slug, page, 20, lang, params.chapterId);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <Link href={`/hadith/${params.slug}`} className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Chapters
                </Link>
                <HadithLanguageSwitcher />
            </div>

            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Book className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{bookInfo.title}</h1>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">
                    Chapter {params.chapterId}
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                    Showing {hadiths.length} of {total} Narrations
                </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
                {hadiths.length > 0 ? (
                    hadiths.map((hadith) => (
                        <div key={hadith.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full shrink-0">
                                        {hadith.source}
                                    </span>
                                    <span className="text-sm text-slate-500 font-medium mt-0.5">
                                        {hadith.chapter}
                                    </span>
                                </div>
                                {hadith.grade && (
                                    <span className="px-2 py-0.5 border border-slate-200 dark:border-white/10 text-slate-500 text-xs rounded uppercase tracking-wider shrink-0">
                                        {hadith.grade}
                                    </span>
                                )}
                            </div>

                            <p
                                className={`${fontClass} text-slate-800 dark:text-slate-200 mb-6`}
                                dir={isRtl ? "rtl" : "ltr"}
                            >
                                &quot;{hadith.text}&quot;
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-300">
                                    {hadith.narrator}
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600">
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <AIExplainButton
                                contextId={`hadith:${params.slug}:${hadith.id}`}
                                text={hadith.text}
                                type="hadith"
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No hadiths found for this collection in the selected language ({lang}).</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 py-8">
                        <Link href={`/hadith/${params.slug}/${params.chapterId}?page=${Math.max(1, page - 1)}&lang=${lang}`}>
                            <Button variant="outline" disabled={page <= 1}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                        </Link>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Page {page} of {totalPages}
                        </span>
                        <Link href={`/hadith/${params.slug}/${params.chapterId}?page=${Math.min(totalPages, page + 1)}&lang=${lang}`}>
                            <Button variant="outline" disabled={page >= totalPages}>
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
