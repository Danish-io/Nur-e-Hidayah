export interface ShabEQadrDua {
    id: string;
    title: string;
    arabic: string;
    transliteration: string;
    translation: string;
    source: string;
}

export interface NamazStep {
    text: string;
    surahId?: number;
    surahId2?: number;
    verseId?: number;
    verseId2?: number;
}

export interface ShabEQadrNamaz {
    id: string;
    title: string;
    rakats: string;
    method: (string | NamazStep)[];
    benefit: string;
}

export const SHAB_E_QADR_DUAS: ShabEQadrDua[] = [
    {
        id: "dua_1",
        title: "The Most Recommended Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        translation: "O Allah, You are forgiving and one who loves forgiving, so forgive me.",
        source: "Tirmidhi 3513"
    },
    {
        id: "dua_2",
        title: "Seeking Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        transliteration: "Allahumma ajirni minan-naar",
        translation: "O Allah, save me from the fire (of Hell).",
        source: "Common Dua"
    },
    {
        id: "dua_3",
        title: "Dua for the Entire Ummah",
        arabic: "اللَّهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        transliteration: "Allahumma-ghfir lil-mu'mineena wal-mu'minaat",
        translation: "O Allah, forgive the believing men and the believing women.",
        source: "Common Supplication"
    },
    {
        id: "dua_4",
        title: "Dua for Guidance and Steadfastness",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        transliteration: "Allahumma ihdini wa saddidni",
        translation: "O Allah, guide me and make me steadfast.",
        source: "Muslim 2725"
    },
    {
        id: "dua_5",
        title: "Comprehensive Dua for Goodness",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'azaaban-nar",
        translation: "Our Lord! Grant us good in this world and good in the life to come and keep us safe from the punishment of Hellfire.",
        source: "Quran 2:201 / Bukhari 6389"
    },
    {
        id: "dua_6",
        title: "Asking for Paradise",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
        transliteration: "Allahumma inni as'aluka al-Jannah",
        translation: "O Allah, I ask You for Paradise.",
        source: "Abu Dawud 792"
    },
    {
        id: "dua_7",
        title: "Seeking Protection from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        translation: "O Allah, I seek refuge in You from anxiety and sorrow.",
        source: "Bukhari 2893"
    },
    {
        id: "dua_8",
        title: "The Ultimate Comprehensive Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ بِكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ",
        transliteration: "Allahumma inni as'aluka min khairi ma sa'alaka minhu nabiyyuka Muhammad, wa a'udhu bika min sharri mast'adha minhu nabiyyuka Muhammad",
        translation: "O Allah, I beg to You the good which Your Prophet Muhammad begged of You; and I seek refuge in You from the evil where from Your Prophet Muhammad sought refuge.",
        source: "Tirmidhi 3521"
    },
    {
        id: "dua_9",
        title: "For Firmness in Faith",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        transliteration: "Ya Muqallibal qulub, thabbit qalbi 'ala dinik",
        translation: "O Turner of the hearts, keep my heart firm upon Your religion.",
        source: "Tirmidhi 2140"
    },
    {
        id: "dua_10",
        title: "Asking for a Good End",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ",
        transliteration: "Allahumma inni as'aluka husnal khatimah",
        translation: "O Allah, I ask You for a good end to my life.",
        source: "Common Supplication"
    },
    {
        id: "dua_11",
        title: "Dua for Relief of the Ummah",
        arabic: "اللَّهُمَّ أَصْلِحْ أُمَّةَ مُحَمَّدٍ، اللَّهُمَّ فَرِّجْ عَنْ أُمَّةِ مُحَمَّدٍ، اللَّهُمَّ ارْحَمْ أُمَّةَ مُحَمَّدٍ",
        transliteration: "Allahumma aslih ummata Muhammad, Allahumma farrij 'an ummati Muhammad, Allahumma irham ummata Muhammad",
        translation: "O Allah, improve the state of the Ummah of Muhammad. O Allah, grant relief to the Ummah of Muhammad. O Allah, have mercy on the Ummah of Muhammad.",
        source: "Common Supplication"
    },
    {
        id: "dua_12",
        title: "For Well-being in this World and the Next",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        transliteration: "Allahumma inni as'alukal 'afwa wal 'afiyah fid dunya wal akhirah",
        translation: "O Allah, I ask You for forgiveness and well-being in this world and in the Hereafter.",
        source: "Ibn Majah 3851"
    },
    {
        id: "dua_13",
        title: "General Dua for Forgiveness and Mercy",
        arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
        transliteration: "Rabbighfir li warhamni",
        translation: "My Lord, forgive me and have mercy on me.",
        source: "Quran 23:118"
    },
    {
        id: "dua_14",
        title: "A Variation of the Most Recommended Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka Afuwwun Karimun tuhibbul 'afwa fa'fu 'annee",
        translation: "O Allah, indeed You are Pardoning, Generous, You love to pardon, so pardon me.",
        source: "Tirmidhi"
    },
    {
        id: "dua_15",
        title: "Dua for Acceptance of Repentance",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbi ighfir li wa tub 'alayya innaka anta At-Tawwab Ar-Raheem",
        translation: "My Lord, forgive me and accept my repentance. Indeed You are the Most Accepting of repentance, the Most Merciful.",
        source: "Abu Dawud 1516"
    },
    {
        id: "dua_16",
        title: "Dua for Beneficial Knowledge and Provision",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
        translation: "O Allah! I ask You for beneficial knowledge, pure provision, and accepted deeds.",
        source: "Ibn Majah 925"
    },
    {
        id: "dua_17",
        title: "Prophet Adam's Dua for Forgiveness",
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration: "Allahumma inni zalamtu nafsi zulman katheeran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min 'indika warhamni innaka antal-Ghafoorur-Raheem",
        translation: "O Allah, I have greatly wronged myself and no one forgives sins but You. So grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Forgiving, the Merciful.",
        source: "Bukhari 834"
    },
    {
        id: "dua_18",
        title: "Dua of Prophet Yunus",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        transliteration: "Laa ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        source: "Tirmidhi 3505"
    },
    {
        id: "dua_19",
        title: "Part of Qunoot for Guidance",
        arabic: "اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ وَعَافِنَا فِيمَنْ عَافَيْتَ وَتَوَلَّنَا فِيمَنْ تَوَلَّيْتَ",
        transliteration: "Allahumma ahdina fiman hadayt, wa 'afina fiman 'afayt, wa tawallana fiman tawallayt",
        translation: "O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your care among those You have taken into Your care.",
        source: "Abu Dawud 1425"
    },
    {
        id: "dua_20",
        title: "Dua for Health and Protection",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allaahumma 'aafinee fee badanee, Allaahumma 'aafinee fee sam'ee, Allaahumma 'aafinee fee basaree, laa 'ilaaha 'illaa 'Anta",
        translation: "O Allah, make me healthy in my body. O Allah, preserve for me my hearing. O Allah, preserve for me my sight. There is none worthy of worship but You.",
        source: "Abu Dawud 5090"
    },
    {
        id: "dua_21",
        title: "Dua for Piety and Contentment",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
        translation: "O Allah, I ask You for guidance and piety, and abstinence (from the unlawful) and modesty, and contentment and sufficiency.",
        source: "Muslim 2721"
    },
    {
        id: "dua_22",
        title: "Dua for Acceptance of Deeds",
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Rabbana taqabbal minna innaka Antas-Sami'ul-'Alim",
        translation: "Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.",
        source: "Quran 2:127"
    },
    {
        id: "dua_23",
        title: "Dua for Parents",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbi ighfir li wa liwalidayya wa arhamhuma kama rabbayani sagheeran",
        translation: "My Lord, forgive me and my parents and have mercy upon them as they brought me up [when I was] small.",
        source: "Quran 17:24"
    },
    {
        id: "dua_24",
        title: "Dua to Keep Away Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allaahumma 'innee 'a'oothu bika minal-kufri, walfaqri, wa 'a'oothu bika min 'adhaabil-qabri, laa 'ilaaha 'illaa 'Anta",
        translation: "O Allah, I seek refuge in You from disbelief and poverty and I seek refuge in You from the punishment of the grave. There is none worthy of worship but You.",
        source: "Abu Dawud 5090"
    },
    {
        id: "dua_25",
        title: "Dua to Die Upon Islam",
        arabic: "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        transliteration: "Tawaffani musliman wa alhiqni bissaliheen",
        translation: "Cause me to die a Muslim and join me with the righteous.",
        source: "Quran 12:101"
    },
    {
        id: "dua_26",
        title: "Sayyid al-Istighfar (The Master of Discarding Sins)",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa anta",
        translation: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave. I keep Your covenant, and my pledge to You so far as I am able. I seek refuge in You from the evil of what I have done. I admit to Your blessings upon me, and I admit to my misdeeds. Forgive me, for there is none who may forgive sins but You.",
        source: "Bukhari 6306"
    },
    {
        id: "dua_27",
        title: "Dua for Contentment",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        transliteration: "Allahummak-fini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwaka",
        translation: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
        source: "Tirmidhi 3563"
    },
    {
        id: "dua_28",
        title: "Dua for True Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilman",
        translation: "My Lord, increase me in knowledge.",
        source: "Quran 20:114"
    },
    {
        id: "dua_29",
        title: "Dua When Distressed",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Ya Hayyu ya Qayyum! Bi rahmatika astagheeth",
        translation: "O Living, O Self-Sustaining Sustainer! In Your Mercy do I seek relief.",
        source: "Tirmidhi 3524"
    },
    {
        id: "dua_30",
        title: "Dua for Family",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yunin waj'alna lil-muttaqeena imama",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        source: "Quran 25:74"
    },
    {
        id: "dua_31",
        title: "Dua for Ease in Affairs",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ سَهْلًا إِذَا شِئْتَ",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahlan, wa anta taj'alul-hazna ifa shi'ta sahlan",
        translation: "O Allah, there is no ease other than what You make easy. If You please You ease sorrow.",
        source: "Ibn Hibban 974"
    },
    {
        id: "dua_32",
        title: "Dua Against Ignorance",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
        transliteration: "Allahumma inni a'udhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala 'alayya",
        translation: "O Allah, I seek refuge in You lest I misguide others, or I am misguided by others, lest I cause others to err or I am caused to err, lest I abuse others or be abused, and lest I behave foolishly or meet with the foolishness of others.",
        source: "Abu Dawud 5094"
    }
];

export const SHAB_E_QADR_NAMAZ: ShabEQadrNamaz[] = [
    {
        id: "namaz_1",
        title: "2 Rakat Nafl (Recommended)",
        rakats: "2 Rakat Nafl",
        method: [
            { text: "In every Rakat after Surah Fatiha read Surah Ikhlas 7 times.", surahId: 112 },
            "After completing the prayer, recite 'Astaghfirullah' 70 times."
        ],
        benefit: "Allah will forgive the sins of the person and their parents."
    },
    {
        id: "namaz_2",
        title: "4 Rakat Nafl",
        rakats: "4 Rakat Nafl (2 salams of 2 rakats)",
        method: [
            { text: "In every Rakat after Surah Fatiha read Surah Takathur 1 time.", surahId: 102 },
            { text: "Then read Surah Ikhlas 3 times.", surahId: 112 }
        ],
        benefit: "Protection from the punishment of the grave and ease during questioning."
    },
    {
        id: "namaz_3",
        title: "4 Rakat Nafl",
        rakats: "4 Rakat Nafl (2 salams of 2 rakats)",
        method: [
            { text: "In every Rakat after Surah Fatiha read Surah Qadr 3 times.", surahId: 97 },
            { text: "Then read Surah Ikhlas 50 times.", surahId: 112 }
        ],
        benefit: "Immense reward equivalent to worshipping for many nights."
    }
];
