export interface EmotionalDua {
    id: string;
    emotion: string; // "Anxious" | "Sad" | "Tired" | "Lost" | "Grateful"
    arabic: string;
    transliteration: string;
    translation: string;
    source: string;
}

export const EMOTIONAL_DUAS: EmotionalDua[] = [
    {
        id: "anxiety_1",
        emotion: "Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        translation: "O Allah, I seek refuge in You from anxiety and sorrow.",
        source: "Bukhari"
    },
    {
        id: "distress_1",
        emotion: "Overwhelmed",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Ya Hayyu Ya Qayyum! Bi rahmatika astagheeth!",
        translation: "O Living, O Self-Subsisting Sustainer! In Your Mercy do I seek relief!",
        source: "Tirmidhi"
    },
    {
        id: "forgiveness_1",
        emotion: "Guilt",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        translation: "O Allah, You are Forgiving and love forgiveness, so forgive me.",
        source: "Tirmidhi (Ramadan Special)"
    },
    {
        id: "strength_1",
        emotion: "Tired",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "La hawla wa la quwwata illa billah",
        translation: "There is no might and no power except with Allah.",
        source: "Bukhari"
    },
    {
        id: "heart_1",
        emotion: "Lonely",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Rabbi inni lima anzalta ilayya min khairin faqir",
        translation: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
        source: "Quran 28:24"
    },
    {
        id: "guidance_1",
        emotion: "Lost",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaitana",
        translation: "Our Lord, let not our hearts deviate after You have guided us.",
        source: "Quran 3:8"
    }
];
