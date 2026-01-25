
import { quranData, Surah, Verse } from "@/data/quran";
import { notFound } from "next/navigation";
import { SurahInteractive } from "@/components/quran/surah-interactive";
import { AIExplainButton } from "@/components/shared/ai-explain-button";

// Helper to fetch data if local is empty
async function getSurahData(id: number): Promise<Surah | undefined> {
    const localSurah = quranData.find((s) => s.id === id);

    if (!localSurah) return undefined;

    // Only return local data if it's complete
    if (localSurah.verses.length === localSurah.totalVerses) return localSurah;

    try {
        // Fetch Arabic (quran-uthmani), Urdu (ur.jalandhry), and English (en.sahih)
        const res = await fetch(`http://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,ur.jalandhry,en.sahih`);

        if (!res.ok) throw new Error("Failed to fetch surah data");

        const apiData = await res.json();
        const arabicData = apiData.data[0];
        const urduData = apiData.data[1];
        const englishData = apiData.data[2];

        const verses: Verse[] = arabicData.ayahs.map((ayah: any, index: number) => ({
            id: ayah.numberInSurah,
            text: ayah.text,
            translation: urduData.ayahs[index].text,
            englishTranslation: englishData.ayahs[index].text,
        }));

        return {
            ...localSurah,
            verses: verses,
        };
    } catch (error) {
        console.warn(`Note: API unavailable for Surah ${id} (likely rate limit). Using local data.`);
        return localSurah;
    }
}

export default async function SurahPage({ params }: { params: { id: string } }) {
    const surahId = parseInt(params.id);
    const surah = await getSurahData(surahId);

    if (!surah) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-quran-paper dark:bg-zinc-950 pb-32">


            <SurahInteractive surah={surah} />

            <div className="container mx-auto px-4 pt-8 max-w-4xl">
                {/* Bismillah - Hide for Surah 1 (part of verses) and Surah 9 (no Bismillah) */}
                {surahId !== 1 && surahId !== 9 && (
                    <div className="text-center mb-12">
                        <h2 className="font-arabic text-4xl leading-relaxed text-slate-800 dark:text-slate-100">
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm font-arabic tracking-wide" style={{ fontFamily: 'var(--font-amiri)' }}>شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</p>
                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">In the Name of Allah, the Most Gracious, the Most Merciful</p>
                    </div>
                )}

                <div className="space-y-8 animate-fade-in-up animation-delay-300">
                    {surah.verses.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">
                            <p>Unable to load verses at this time.</p>
                        </div>
                    ) : (
                        surah.verses.map((verse, index) => (
                            <div key={verse.id} className="group relative border-b border-gray-100 dark:border-zinc-800/50 py-10 last:border-0 hover:bg-white/60 dark:hover:bg-zinc-900/40 transition-all duration-500 -mx-6 px-6 rounded-2xl">
                                <div className="flex flex-col space-y-8">
                                    {/* ID Badge */}
                                    <div className="absolute left-6 top-10 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-quran-gold group-hover:border-quran-gold transition-colors shadow-sm">
                                            {verse.id}
                                        </div>
                                    </div>

                                    {/* Arabic */}
                                    <p className="font-arabic text-right text-4xl md:text-5xl leading-[2.5] text-slate-800 dark:text-slate-100 pl-16 drop-shadow-sm" style={{ fontFamily: 'var(--font-amiri)' }}>
                                        {verse.text}
                                    </p>

                                    <div className="pl-16 space-y-6">
                                        {/* Urdu Translation */}
                                        <div className="relative">
                                            <div className="absolute -left-4 top-1 w-1 h-full bg-quran-gold/20 group-hover:bg-quran-gold rounded-full transition-colors"></div>
                                            <p className="text-xs text-quran-gold font-bold uppercase tracking-widest mb-2 opacity-80">
                                                Urdu Translation
                                            </p>
                                            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-arabic text-right group-hover:text-slate-900 dark:group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-amiri)' }} dir="rtl">
                                                {verse.translation}
                                            </p>
                                        </div>

                                        {/* English Translation */}
                                        {verse.englishTranslation && (
                                            <div className="pt-2">
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                                                    English Translation
                                                </p>
                                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                                                    {verse.englishTranslation}
                                                </p>
                                            </div>
                                        )}
                                        {/* AI Explanation Button */}
                                        <div className="pt-2">
                                            <AIExplainButton
                                                contextId={`surah:${surahId}:${verse.id}`}
                                                text={verse.englishTranslation || verse.translation}
                                                type="quran"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    return quranData.map((s) => ({
        id: s.id.toString(),
    }));
}
