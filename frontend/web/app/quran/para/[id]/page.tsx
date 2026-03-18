import { quranData, Surah, Verse } from "@/data/quran";
import { juzData, Juz } from "@/data/juz";
import { notFound } from "next/navigation";
import ParaPageClient from "./client-page";

// Helper to get verses for a specific Juz
async function getJuzVerses(juzId: number): Promise<{ juz: Juz; verses: Array<{ surah: Surah; verse: Verse; verseNumber: number }> } | undefined> {
    const juz = juzData.find((j) => j.id === juzId);
    if (!juz) return undefined;

    const verses: Array<{ surah: Surah; verse: Verse; verseNumber: number }> = [];

    try {
        // 1. Fetch Words and Text for the Juz from Quran.com API v4
        const wordsRes = await fetch(`https://api.quran.com/api/v4/verses/by_juz/${juzId}?words=true&word_fields=text_uthmani,location&per_page=1000`);
        const wordsData = await wordsRes.json();
        const apiVerses = wordsData.verses;

        // 2. Map Surahs in this Juz for individual audio/segment fetching
        const surahAudioMap: { [key: number]: any } = {};
        for (let surahId = juz.startSurah; surahId <= juz.endSurah; surahId++) {
            const audioRes = await fetch(`https://api.quran.com/api/v4/audio/reciters/7/chapters/${surahId}?segments=true`);
            if (audioRes.ok) {
                const audioData = await audioRes.json();
                surahAudioMap[surahId] = audioData.audio_file;
            }
        }

        // 3. Process each Surah and build the Juz verses array
        for (let surahId = juz.startSurah; surahId <= juz.endSurah; surahId++) {
            const surah = quranData.find((s) => s.id === surahId);
            if (!surah) continue;

            const audioFile = surahAudioMap[surahId];
            const cloudRes = await fetch(`http://api.alquran.cloud/v1/surah/${surahId}/editions/ur.jalandhry,en.sahih,quran-indopak,ur.khan,en.walk`);
            const cloudData = await cloudRes.json();

            const urduData = cloudData.data[0];
            const englishData = cloudData.data[1];
            const indopakData = cloudData.data[2];
            const urduAudioData = cloudData.data[3];
            const englishAudioData = cloudData.data[4];

            const surahVersesFromApi = apiVerses.filter((v: any) => v.verse_key.split(':')[0] === surahId.toString());

            const fetchedVerses: Verse[] = surahVersesFromApi.map((v: any, index: number) => {
                const verseSegments = audioFile?.segments?.filter((s: any) => s[0] === v.verse_number) || [];
                const startTime = verseSegments.length > 0 ? verseSegments[0][2] : 0;
                const endTime = verseSegments.length > 0 ? verseSegments[verseSegments.length - 1][3] : 0;

                return {
                    id: v.verse_number,
                    text: v.text_uthmani,
                    translation: urduData.ayahs[index].text,
                    englishTranslation: englishData.ayahs[index].text,
                    audio: audioFile ? `https://download.quranicaudio.com/qdc/mishary_rashid_alafasy/delayed/mp3/${audioFile.file_name}` : undefined,
                    audioUrdu: urduAudioData.ayahs[index].audio,
                    audioEnglish: englishAudioData.ayahs[index].audio,
                    textIndopak: indopakData.ayahs[index].text,
                    startTime,
                    endTime,
                    words: v.words.map((w: any) => ({
                        id: w.id,
                        text: w.text_uthmani,
                        transliteration: w.transliteration?.text,
                        translation: w.translation?.text,
                    })),
                    segments: verseSegments.map((s: any) => [s[1], s[2], s[3]]),
                };
            });

            const surahData = { ...surah, verses: fetchedVerses };

            const startVerse = surahId === juz.startSurah ? juz.startVerse : 1;
            const endVerse = surahId === juz.endSurah ? juz.endVerse : surah.totalVerses;

            for (let verseNum = startVerse; verseNum <= endVerse; verseNum++) {
                const verse = surahData.verses.find((v) => v.id === verseNum);
                if (verse) {
                    verses.push({ surah: surahData, verse, verseNumber: verseNum });
                }
            }
        }
    } catch (error) {
        console.error("Error fetching Juz data:", error);
    }

    return { juz, verses };
}

export default async function ParaPage({ params }: { params: { id: string } }) {
    const juzId = parseInt(params.id);
    const data = await getJuzVerses(juzId);

    if (!data) {
        return notFound();
    }

    return <ParaPageClient juz={data.juz} verses={data.verses} />;
}

