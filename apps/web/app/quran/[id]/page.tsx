import { quranData, Surah, Verse } from "@/data/quran";
import { notFound } from "next/navigation";
import SurahPageClient from "./client-page";
import { ReadingSettingsProvider } from "@/context/reading-settings-context";

// Helper to fetch data if local is empty
async function getSurahData(id: number): Promise<Surah | undefined> {
    const localSurah = quranData.find((s) => s.id === id);
    if (!localSurah) return undefined;

    let wordsData: any = null;
    let audioData: any = null;
    let cloudData: any = null;

    // Helper for fetch with timeout
    const fetchWithTimeout = async (url: string, options: any = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            return res;
        } catch (e) {
            clearTimeout(timeoutId);
            throw e;
        }
    };

    // 1. Try fetching Word Data from Quran.com
    try {
        const wordsRes = await fetchWithTimeout(`https://api.quran.com/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani,location&per_page=286`, { next: { revalidate: 3600 } });
        if (wordsRes.ok) wordsData = await wordsRes.json();
    } catch (e) {
        console.warn(`Quran.com words fetch failed for Surah ${id}: ${e instanceof Error ? e.message : 'timeout'}`);
    }

    // 2. Try fetching Audio Data from Quran.com
    try {
        const audioRes = await fetchWithTimeout(`https://api.quran.com/api/v4/audio/reciters/7/chapters/${id}?segments=true`, { next: { revalidate: 3600 } });
        if (audioRes.ok) audioData = await audioRes.json();
    } catch (e) {
        console.warn(`Quran.com audio fetch failed for Surah ${id}: ${e instanceof Error ? e.message : 'timeout'}`);
    }

    // 3. Try fetching Translation Data from Alquran.cloud
    try {
        const cloudRes = await fetchWithTimeout(`https://api.alquran.cloud/v1/surah/${id}/editions/ur.jalandhry,en.sahih,quran-indopak,ur.khan,en.walk`, { next: { revalidate: 3600 } });
        if (cloudRes.ok) cloudData = await cloudRes.json();
    } catch (e) {
        console.warn(`Alquran.cloud fetch failed for Surah ${id}: ${e instanceof Error ? e.message : 'timeout'}`);
    }

    // If we have at least words or cloud data, we can try to assemble the verses
    if (wordsData || cloudData) {
        try {
            const audioFile = audioData?.audio_file;
            const urduData = cloudData?.data[0];
            const englishData = cloudData?.data[1];
            const indopakData = cloudData?.data[2];
            const urduAudioData = cloudData?.data[3];
            const englishAudioData = cloudData?.data[4];

            // Use either Quran.com verses or Alquran.cloud ayahs as the base
            const baseVerses = wordsData?.verses || cloudData?.data[0]?.ayahs;

            if (baseVerses) {
                const verses: Verse[] = baseVerses.map((v: any, index: number) => {
                    const verseNumber = v.verse_number || v.numberInSurah;
                    const verseSegments = audioFile?.segments?.filter((s: any) => s[0] === verseNumber) || [];
                    const startTime = verseSegments.length > 0 ? verseSegments[0][2] : 0;
                    const endTime = verseSegments.length > 0 ? verseSegments[verseSegments.length - 1][3] : 0;

                    return {
                        id: verseNumber,
                        text: v.text_uthmani || v.text,
                        translation: urduData?.ayahs[index]?.text || "",
                        englishTranslation: englishData?.ayahs[index]?.text || "",
                        audio: audioFile ? `https://download.quranicaudio.com/qdc/mishary_rashid_alafasy/delayed/mp3/${audioFile.file_name}` : "",
                        audioUrdu: urduAudioData?.ayahs[index]?.audio || "",
                        audioEnglish: englishAudioData?.ayahs[index]?.audio || "",
                        textIndopak: indopakData?.ayahs[index]?.text || "",
                        startTime,
                        endTime,
                        words: v.words?.map((w: any) => ({
                            id: w.id,
                            text: w.text_uthmani,
                            transliteration: w.transliteration?.text,
                            translation: w.translation?.text,
                        })) || [],
                        segments: verseSegments.map((s: any) => [s[1], s[2], s[3]]),
                    };
                });

                if (verses.length > 0) {
                    return {
                        ...localSurah,
                        verses: verses,
                    };
                }
            }
        } catch (assemblyError) {
            console.error(`Error assembling verses for Surah ${id}:`, assemblyError);
        }
    }

    return localSurah;
}

export default async function SurahPage({ params }: { params: { id: string } }) {
    const surahId = parseInt(params.id);
    const surah = await getSurahData(surahId);

    if (!surah) {
        return notFound();
    }

    return <SurahPageClient surah={surah} />;
}

