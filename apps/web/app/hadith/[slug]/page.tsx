import { Book, ChevronLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getHadithChapters } from "@/lib/get-hadith";

const hadithBooks: Record<string, { title: string; description: string }> = {
    bukhari: { title: "Sahih al-Bukhari", description: "Considered the most authentic collection." },
    muslim: { title: "Sahih Muslim", description: "Also highly authentic and widely respected." },
    abudawud: { title: "Sunan Abu Dawud", description: "Focuses on practical rulings." },
    tirmidhi: { title: "Jami' al-Tirmidhi", description: "Known for its classifications and commentary." },
    nasai: { title: "Sunan al-Nasa'i", description: "Emphasizes legal rulings and practices." },
    ibnmajah: { title: "Sunan Ibn Majah", description: "Completes the six canonical works." }
};

export default async function HadithCollectionChapters({
    params
}: {
    params: { slug: string }
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

    const chapters = await getHadithChapters(params.slug, "en"); // Get En chapters, getHadithChapters handles Arabic titles automatically

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 gap-4">
                <Link href="/hadith" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Collections
                </Link>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Book className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{bookInfo.title}</h1>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">
                    {bookInfo.description}
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                    {chapters.length} Chapters
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {chapters.length > 0 ? (
                    <div className="flex flex-col rounded-xl overflow-hidden shadow-sm dark:shadow-none bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5">
                        {chapters.map((chapter, index) => (
                            <Link
                                key={chapter.id}
                                href={`/hadith/${params.slug}/${chapter.id}`}
                                className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-200 dark:border-[#223049]/50 last:border-0 hover:bg-emerald-50 dark:hover:bg-[#1e2a40] transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-[#0f172a]' : 'bg-slate-50 dark:bg-[#151f32]'}`}
                            >
                                <div className="flex-1 pr-4">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-[#f8fafc] mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {chapter.id}. {chapter.title}
                                    </h2>
                                    {chapter.hadithRanges && (
                                        <p className="text-sm text-slate-500 dark:text-slate-300">
                                            Hadiths {chapter.hadithRanges.first} to {chapter.hadithRanges.last}
                                        </p>
                                    )}
                                </div>
                                {chapter.arabicTitle && (
                                    <div className="mt-3 sm:mt-0 text-right shrink-0">
                                        <h3 className="text-2xl font-arabic font-normal text-red-600/90 dark:text-red-400/90 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors md:mr-4">
                                            {chapter.arabicTitle}
                                        </h3>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-white/5">
                        <p className="text-slate-500">No chapters found for this collection.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
