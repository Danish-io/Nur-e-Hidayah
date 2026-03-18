import { Verse } from "@/data/quran";

export interface SurahData {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
    verses: Verse[];
}

export async function fetchSurah(id: number): Promise<SurahData | null> {
    const fetchWithTimeout = async (url: string, options: any = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            return res;
        } catch (e) {
            clearTimeout(timeoutId);
            throw e;
        }
    };

    try {
        let wordsData: any = null;
        let cloudData: any = null;

        // Fetch Words
        try {
            const wordsRes = await fetchWithTimeout(`https://api.quran.com/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani,location&per_page=286`);
            if (wordsRes.ok) wordsData = await wordsRes.json();
        } catch (e) {
            console.error("Quran.com fetch failed", e);
        }

        // Fetch Translations
        try {
            const cloudRes = await fetchWithTimeout(`https://api.alquran.cloud/v1/surah/${id}/editions/ur.jalandhry,en.sahih,quran-indopak`);
            if (cloudRes.ok) cloudData = await cloudRes.json();
        } catch (e) {
            console.error("Alquran.cloud fetch failed", e);
        }

        if (!wordsData && !cloudData) return null;

        const urduData = cloudData?.data[0];
        const englishData = cloudData?.data[1];
        const indopakData = cloudData?.data[2];

        const baseVerses = wordsData?.verses || cloudData?.data[0]?.ayahs;

        const verses: Verse[] = baseVerses.map((v: any, index: number) => {
            const verseNumber = v.verse_number || v.numberInSurah;
            return {
                id: verseNumber,
                text: v.text_uthmani || v.text,
                translation: urduData?.ayahs[index]?.text || "",
                englishTranslation: englishData?.ayahs[index]?.text || "",
                textIndopak: indopakData?.ayahs[index]?.text || "",
                words: v.words?.map((w: any) => ({
                    id: w.id,
                    text: w.text_uthmani,
                    transliteration: w.transliteration?.text,
                    translation: w.translation?.text,
                })) || [],
            };
        });

        // Get Metadata from first verse if needed or use static
        const metaRes = await fetch(`https://api.quran.com/api/v4/chapters/${id}`);
        const meta = await metaRes.json();

        return {
            id: id,
            name: meta.chapter.name_arabic,
            transliteration: meta.chapter.name_simple,
            translation: meta.chapter.translated_name.name,
            type: meta.chapter.revelation_place,
            total_verses: meta.chapter.verses_count,
            verses: verses,
        };
    } catch (error) {
        console.error("Error fetching surah:", error);
        return null;
    }
}

export async function fetchJuz(id: number): Promise<SurahData | null> {
    const fetchWithTimeout = async (url: string, options: any = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            return res;
        } catch (e) {
            clearTimeout(timeoutId);
            throw e;
        }
    };

    try {
        let wordsData: any = null;
        let cloudData: any = null;

        // Fetch Words for Juz
        try {
            const wordsRes = await fetchWithTimeout(`https://api.quran.com/api/v4/verses/by_juz/${id}?words=true&word_fields=text_uthmani,location&per_page=300`);
            if (wordsRes.ok) wordsData = await wordsRes.json();
        } catch (e) {
            console.error("Quran.com Juz fetch failed", e);
        }

        // Fetch Translations for Juz
        try {
            const cloudRes = await fetchWithTimeout(`https://api.alquran.cloud/v1/juz/${id}/editions/ur.jalandhry,en.sahih,quran-indopak`);
            if (cloudRes.ok) cloudData = await cloudRes.json();
        } catch (e) {
            console.error("Alquran.cloud Juz fetch failed", e);
        }

        if (!wordsData && !cloudData) return null;

        const urduData = cloudData?.data?.editions?.[0];
        const englishData = cloudData?.data?.editions?.[1];
        const indopakData = cloudData?.data?.editions?.[2];

        const baseVerses = wordsData?.verses || cloudData?.data?.ayahs;

        const verses: Verse[] = baseVerses.map((v: any, index: number) => {
            const verseNumber = v.verse_number || v.numberInSurah;
            return {
                id: verseNumber,
                text: v.text_uthmani || v.text,
                translation: urduData?.ayahs?.[index]?.text || v.translation || "",
                englishTranslation: englishData?.ayahs?.[index]?.text || "",
                textIndopak: indopakData?.ayahs?.[index]?.text || "",
                words: v.words?.map((w: any) => ({
                    id: w.id,
                    text: w.text_uthmani,
                    transliteration: w.transliteration?.text,
                    translation: w.translation?.text,
                })) || [],
            };
        });

        return {
            id: id,
            name: `Juz ${id}`,
            transliteration: `Juz ${id}`,
            translation: `Juz ${id}`,
            type: "Various",
            total_verses: verses.length,
            verses: verses,
        };
    } catch (error) {
        console.error("Error fetching juz:", error);
        return null;
    }
}
