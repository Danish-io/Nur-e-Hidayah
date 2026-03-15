export interface Dua {
    id: number;
    category: "Morning" | "Evening" | "Daily" | "Selected" | "After Salah" | "Ramadan" | "Shab-e-Qadr";
    title: string;
    arabic: string;
    translation: string;
    transliteration: string;
    source: string;
}

export const duas: Dua[] = [
    // Morning
    {
        id: 1,
        category: "Morning",
        title: "Morning Remembrance",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        translation: "We have entered the morning and at this very time the whole kingdom belongs to Allah, and all praise is due to Allah. There is no god but Allah, the One, having no partner with Him.",
        transliteration: "Asbahna wa-asbahal-mulku lillah, walhamdu lillah, la ilaha illallah wahdaho la sharika lah...",
        source: "Muslim 4:2088"
    },
    {
        id: 2,
        category: "Morning",
        title: "Provision Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلاً",
        translation: "O Allah, I ask You for beneficial knowledge, goodly provision and acceptable deeds.",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
        source: "Ibn Majah 925"
    },
    // Evening
    {
        id: 3,
        category: "Evening",
        title: "Evening Protection",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
        translation: "We have entered the evening and at this very time the whole kingdom belongs to Allah, and all praise is due to Allah.",
        transliteration: "Amsayna wa-amsal-mulku lillah, walhamdu lillah...",
        source: "Muslim 4:2088"
    },
    {
        id: 4,
        category: "Evening",
        title: "Seek Refuge from Harm",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        translation: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
        transliteration: "A'udhu bikalimatillahi-tammati min sharri ma khalaq",
        source: "Muslim 2708"
    },
    // Daily
    {
        id: 5,
        category: "Daily",
        title: "Entering Home",
        arabic: "بِسْـمِ اللهِ وَلَجْنـَا، وَبِسْـمِ اللهِ خَـرَجْنـَا، وَعَلَـى رَبِّنـَا تَوَكَّلْنـَا",
        translation: "In the Name of Allah we enter, in the Name of Allah we leave, and upon our Lord we depend.",
        transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna",
        source: "Abu Dawud 4:325"
    },
    {
        id: 6,
        category: "Daily",
        title: "Leaving Home",
        arabic: "بِسْمِ اللهِ ، تَوَكَّلْتُ عَلَى اللهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        translation: "In the Name of Allah, I have placed my trust in Allah, there is no might and no power except by Allah.",
        transliteration: "Bismillahi, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
        source: "Abu Dawud 4:325"
    },
    {
        id: 7,
        category: "Daily",
        title: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        translation: "In the Name of Allah.",
        transliteration: "Bismillah",
        source: "Bukhari 7:88"
    },
    {
        id: 14,
        category: "Daily",
        title: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        translation: "All praise belongs to Allah, who fed us and quenched our thirst and made us Muslims.",
        transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana Muslimeen",
        source: "Abu Dawud 3850"
    },
    {
        id: 15,
        category: "Daily",
        title: "Entering Bathroom",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        translation: "O Allah, I seek refuge with You from all evil and evil-doers.",
        transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith",
        source: "Bukhari 1:45"
    },
    {
        id: 16,
        category: "Daily",
        title: "Leaving Bathroom",
        arabic: "غُفْرَانَكَ",
        translation: "(O Allah) I seek Your forgiveness.",
        transliteration: "Ghufranaka",
        source: "Abu Dawud 30"
    },
    {
        id: 17,
        category: "Daily",
        title: "Before Sleeping",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        translation: "In Your Name, O Allah, I die and I live.",
        transliteration: "Bismika Allahumma amutu wa ahya",
        source: "Bukhari 6312"
    },
    {
        id: 18,
        category: "Daily",
        title: "Waking Up",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        translation: "All praise is due to Allah, Who has given us life after He had caused us to die (sleep), and to Him is the return.",
        transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilaihin-nushur",
        source: "Bukhari 6312"
    },
    {
        id: 19,
        category: "Daily",
        title: "Wearing Clothes",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        translation: "Praise be to Allah Who has clothed me with this and provided it for me, with no power or might from myself.",
        transliteration: "Alhamdu lillahil-ladhi kasani hadha wa razaqanihi min ghairi hawlin minni wa la quwwah",
        source: "Abu Dawud 4023"
    },
    {
        id: 20,
        category: "Daily",
        title: "Sneezing (One who sneezes)",
        arabic: "الْحَمْدُ لِلَّهِ",
        translation: "All praise is for Allah.",
        transliteration: "Alhamdu lillah",
        source: "Bukhari 6224"
    },
    {
        id: 21,
        category: "Daily",
        title: "Traveling",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        translation: "Glory to Him who has subjected this to us, and we could not have otherwise subdued it. And indeed we, to our Lord, will [surely] return.",
        transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrineen. Wa inna ila Rabbina lamunqaliboon",
        source: "Muslim 1342"
    },
    // Selected
    {
        id: 8,
        category: "Selected",
        title: "Dua for Parents",
        arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        translation: "My Lord, have mercy upon them [parents] as they brought me up [when I was] small.",
        transliteration: "Rabbi irhamhuma kama rabbayani saghira",
        source: "Quran 17:24"
    },
    {
        id: 9,
        category: "Selected",
        title: "Dua for Knowledge",
        arabic: "رَّبِّ زِدْنِي عِلْمًا",
        translation: "My Lord, increase me in knowledge.",
        transliteration: "Rabbi zidni 'ilman",
        source: "Quran 20:114"
    },
    // After Salah
    {
        id: 10,
        category: "After Salah",
        title: "Forgiveness",
        arabic: "أَسْتَغْفِرُ اللَّهَ (3x)",
        translation: "I seek forgiveness from Allah.",
        transliteration: "Astaghfirullah (3 times)",
        source: "Muslim 591"
    },
    {
        id: 11,
        category: "After Salah",
        title: "Peace",
        arabic: "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
        translation: "O Allah, You are Peace and from You is peace. Blessed are You, O Owner of Majesty and Honor.",
        transliteration: "Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram",
        source: "Muslim 591"
    },
    // Ramadan
    {
        id: 12,
        category: "Ramadan",
        title: "Intention for Fasting (Sehri)",
        arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
        translation: "I intend to keep the fast for tomorrow in the month of Ramadan.",
        transliteration: "Wa bisawmi ghadinn nawaiytu min shahri ramadan",
        source: "Common Dua"
    },
    {
        id: 13,
        category: "Ramadan",
        title: "Breaking Fast (Iftar)",
        arabic: "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ aman تُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ",
        translation: "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance.",
        transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu",
        source: "Abu Dawud 2358"
    },
    {
        id: 22,
        category: "Ramadan",
        title: "Moon Sighting (Hilal)",
        arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ، رَبِّي وَرَبُّكَ اللَّهُ",
        translation: "O Allah, let this moon appear on us with security and faith; with safety and Islam. (O Moon!) My Lord and your Lord is Allah.",
        transliteration: "Allahumma ahillahu 'alayna bil-amni wal-imani was-salamati wal-islami, Rabbi wa Rabbuk-Allah",
        source: "Tirmidhi 3451"
    },
    {
        id: 23,
        category: "Ramadan",
        title: "1st Ashra (Mercy)",
        arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        translation: "My Lord! Forgive and have mercy, for You are the Best of those who show mercy.",
        transliteration: "Rabbi-ghfir warham wa Anta Khair-ur-Raahimeen",
        source: "Quran 23:118"
    },
    {
        id: 24,
        category: "Ramadan",
        title: "2nd Ashra (Forgiveness)",
        arabic: "أَسْتَغْفِرُ اللهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
        translation: "I seek forgiveness from Allah, my Lord, from every sin I committed and I turn to Him in repentance.",
        transliteration: "Astaghfirullah Rabbi min kulli zambin wa atubu ilaih",
        source: "Common Dua"
    },
    {
        id: 25,
        category: "Ramadan",
        title: "3rd Ashra (Freedom from Fire)",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        translation: "O Allah, save me from the fire (of Hell).",
        transliteration: "Allahumma ajirni minan-naar",
        source: "Common Dua"
    },
    {
        id: 26,
        category: "Ramadan",
        title: "Laylatul Qadr",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        translation: "O Allah, You are forgiving and one who loves forgiving, so forgive me.",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        source: "Tirmidhi 3513"
    },
    {
        id: 27,
        category: "Ramadan",
        title: "Breaking Fast (Authentic)",
        arabic: "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        translation: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
        transliteration: "Zahabaz-zama'u, wabtallatil-'urooqu, wa thabatal-ajru, in sha' Allah",
        source: "Abu Dawud 2357"
    },
    {
        id: 28,
        category: "Ramadan",
        title: "For the Host of Iftar",
        arabic: "أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ",
        translation: "May the fasting people break their fast with you, may the righteous eat your food, and may the angels send blessings upon you.",
        transliteration: "Aftara 'indakumus-sa'imun, wa akala ta'amakumul-abrar, wa sallat 'alaikumul-mala'ikah",
        source: "Abu Dawud 3854"
    },
    {
        id: 29,
        category: "Ramadan",
        title: "When Insulted while Fasting",
        arabic: "إِنِّي صَائِمٌ، إِنِّي صَائِمٌ",
        translation: "I am fasting, I am fasting.",
        transliteration: "Inni sa'imun, inni sa'im",
        source: "Bukhari 1894"
    },
    {
        id: 30,
        category: "Ramadan",
        title: "Seeking Protection from Hellfire",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
        translation: "O Allah, I ask You for Your pleasure and Paradise, and I seek refuge in You from Your anger and the Hellfire.",
        transliteration: "Allahumma inni as'aluka ridhaka wal-jannah, wa a'udhu bika min sakhatika wan-nar",
        source: "Common Dua"
    },
    // Shab-e-Qadr
    {
        id: 31,
        category: "Shab-e-Qadr",
        title: "The Most Recommended Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        translation: "O Allah, You are forgiving and one who loves forgiving, so forgive me.",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        source: "Tirmidhi 3513"
    },
    {
        id: 32,
        category: "Shab-e-Qadr",
        title: "Seeking Protection from Hellfire",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        translation: "O Allah, save me from the fire (of Hell).",
        transliteration: "Allahumma ajirni minan-naar",
        source: "Common Dua"
    },
    {
        id: 33,
        category: "Shab-e-Qadr",
        title: "Dua for the Entire Ummah",
        arabic: "اللَّهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        translation: "O Allah, forgive the believing men and the believing women.",
        transliteration: "Allahumma-ghfir lil-mu'mineena wal-mu'minaat",
        source: "Common Supplication"
    },
    {
        id: 34,
        category: "Shab-e-Qadr",
        title: "Dua for Guidance and Steadfastness",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        translation: "O Allah, guide me and make me steadfast.",
        transliteration: "Allahumma ihdini wa saddidni",
        source: "Muslim 2725"
    },
    {
        id: 35,
        category: "Shab-e-Qadr",
        title: "Comprehensive Dua for Goodness",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        translation: "Our Lord! Grant us good in this world and good in the life to come and keep us safe from the punishment of Hellfire.",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'azaaban-nar",
        source: "Quran 2:201 / Bukhari 6389"
    },
    {
        id: 36,
        category: "Shab-e-Qadr",
        title: "Asking for Paradise",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
        translation: "O Allah, I ask You for Paradise.",
        transliteration: "Allahumma inni as'aluka al-Jannah",
        source: "Abu Dawud 792"
    },
    {
        id: 37,
        category: "Shab-e-Qadr",
        title: "Seeking Protection from Anxiety",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        translation: "O Allah, I seek refuge in You from anxiety and sorrow.",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        source: "Bukhari 2893"
    },
    {
        id: 38,
        category: "Shab-e-Qadr",
        title: "The Ultimate Comprehensive Dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ بِكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ",
        translation: "O Allah, I beg to You the good which Your Prophet Muhammad begged of You; and I seek refuge in You from the evil where from Your Prophet Muhammad sought refuge.",
        transliteration: "Allahumma inni as'aluka min khairi ma sa'alaka minhu nabiyyuka Muhammad, wa a'udhu bika min sharri mast'adha minhu nabiyyuka Muhammad",
        source: "Tirmidhi 3521"
    },
    {
        id: 39,
        category: "Shab-e-Qadr",
        title: "For Firmness in Faith",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        translation: "O Turner of the hearts, keep my heart firm upon Your religion.",
        transliteration: "Ya Muqallibal qulub, thabbit qalbi 'ala dinik",
        source: "Tirmidhi 2140"
    },
    {
        id: 40,
        category: "Shab-e-Qadr",
        title: "Asking for a Good End",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ",
        translation: "O Allah, I ask You for a good end to my life.",
        transliteration: "Allahumma inni as'aluka husnal khatimah",
        source: "Common Supplication"
    },
    {
        id: 41,
        category: "Shab-e-Qadr",
        title: "Dua for Relief of the Ummah",
        arabic: "اللَّهُمَّ أَصْلِحْ أُمَّةَ مُحَمَّدٍ، اللَّهُمَّ فَرِّجْ عَنْ أُمَّةِ مُحَمَّدٍ، اللَّهُمَّ ارْحَمْ أُمَّةَ مُحَمَّدٍ",
        translation: "O Allah, improve the state of the Ummah of Muhammad. O Allah, grant relief to the Ummah of Muhammad. O Allah, have mercy on the Ummah of Muhammad.",
        transliteration: "Allahumma aslih ummata Muhammad, Allahumma farrij 'an ummati Muhammad, Allahumma irham ummata Muhammad",
        source: "Common Supplication"
    },
    {
        id: 42,
        category: "Shab-e-Qadr",
        title: "For Well-being in this World and the Next",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
        translation: "O Allah, I ask You for forgiveness and well-being in this world and in the Hereafter.",
        transliteration: "Allahumma inni as'alukal 'afwa wal 'afiyah fid dunya wal akhirah",
        source: "Ibn Majah 3851"
    },
    {
        id: 43,
        category: "Shab-e-Qadr",
        title: "General Dua for Forgiveness and Mercy",
        arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
        translation: "My Lord, forgive me and have mercy on me.",
        transliteration: "Rabbighfir li warhamni",
        source: "Quran 23:118"
    },
    {
        id: 44,
        category: "Shab-e-Qadr",
        title: "A Variation of the Most Recommended Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        translation: "O Allah, indeed You are Pardoning, Generous, You love to pardon, so pardon me.",
        transliteration: "Allahumma innaka Afuwwun Karimun tuhibbul 'afwa fa'fu 'annee",
        source: "Tirmidhi"
    },
    {
        id: 45,
        category: "Shab-e-Qadr",
        title: "Dua for Acceptance of Repentance",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        translation: "My Lord, forgive me and accept my repentance. Indeed You are the Most Accepting of repentance, the Most Merciful.",
        transliteration: "Rabbi ighfir li wa tub 'alayya innaka anta At-Tawwab Ar-Raheem",
        source: "Abu Dawud 1516"
    },
    {
        id: 46,
        category: "Shab-e-Qadr",
        title: "Dua for Beneficial Knowledge and Provision",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً",
        translation: "O Allah! I ask You for beneficial knowledge, pure provision, and accepted deeds.",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
        source: "Ibn Majah 925"
    },
    {
        id: 47,
        category: "Shab-e-Qadr",
        title: "Prophet Adam's Dua for Forgiveness",
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        translation: "O Allah, I have greatly wronged myself and no one forgives sins but You. So grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Forgiving, the Merciful.",
        transliteration: "Allahumma inni zalamtu nafsi zulman katheeran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min 'indika warhamni innaka antal-Ghafoorur-Raheem",
        source: "Bukhari 834"
    },
    {
        id: 48,
        category: "Shab-e-Qadr",
        title: "Dua of Prophet Yunus",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        transliteration: "Laa ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        source: "Tirmidhi 3505"
    },
    {
        id: 49,
        category: "Shab-e-Qadr",
        title: "Part of Qunoot for Guidance",
        arabic: "اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ وَعَافِنَا فِيمَنْ عَافَيْتَ وَتَوَلَّنَا فِيمَنْ تَوَلَّيْتَ",
        translation: "O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your care among those You have taken into Your care.",
        transliteration: "Allahumma ahdina fiman hadayt, wa 'afina fiman 'afayt, wa tawallana fiman tawallayt",
        source: "Abu Dawud 1425"
    },
    {
        id: 50,
        category: "Shab-e-Qadr",
        title: "Dua for Health and Protection",
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
        translation: "O Allah, make me healthy in my body. O Allah, preserve for me my hearing. O Allah, preserve for me my sight. There is none worthy of worship but You.",
        transliteration: "Allaahumma 'aafinee fee badanee, Allaahumma 'aafinee fee sam'ee, Allaahumma 'aafinee fee basaree, laa 'ilaaha 'illaa 'Anta",
        source: "Abu Dawud 5090"
    },
    {
        id: 51,
        category: "Shab-e-Qadr",
        title: "Dua for Piety and Contentment",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        translation: "O Allah, I ask You for guidance and piety, and abstinence (from the unlawful) and modesty, and contentment and sufficiency.",
        transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
        source: "Muslim 2721"
    },
    {
        id: 52,
        category: "Shab-e-Qadr",
        title: "Dua for Acceptance of Deeds",
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        translation: "Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.",
        transliteration: "Rabbana taqabbal minna innaka Antas-Sami'ul-'Alim",
        source: "Quran 2:127"
    },
    {
        id: 53,
        category: "Shab-e-Qadr",
        title: "Dua for Parents",
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        translation: "My Lord, forgive me and my parents and have mercy upon them as they brought me up [when I was] small.",
        transliteration: "Rabbi ighfir li wa liwalidayya wa arhamhuma kama rabbayani sagheeran",
        source: "Quran 17:24"
    },
    {
        id: 54,
        category: "Shab-e-Qadr",
        title: "Dua to Keep Away Poverty",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        translation: "O Allah, I seek refuge in You from disbelief and poverty and I seek refuge in You from the punishment of the grave. There is none worthy of worship but You.",
        transliteration: "Allaahumma 'innee 'a'oothu bika minal-kufri, walfaqri, wa 'a'oothu bika min 'adhaabil-qabri, laa 'ilaaha 'illaa 'Anta",
        source: "Abu Dawud 5090"
    },
    {
        id: 55,
        category: "Shab-e-Qadr",
        title: "Dua to Die Upon Islam",
        arabic: "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        translation: "Cause me to die a Muslim and join me with the righteous.",
        transliteration: "Tawaffani musliman wa alhiqni bissaliheen",
        source: "Quran 12:101"
    },
    {
        id: 56,
        category: "Shab-e-Qadr",
        title: "Sayyid al-Istighfar",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        translation: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave... Forgive me, for there is none who may forgive sins but You.",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu...",
        source: "Bukhari 6306"
    },
    {
        id: 57,
        category: "Shab-e-Qadr",
        title: "Dua for Contentment",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        translation: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
        transliteration: "Allahummak-fini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwaka",
        source: "Tirmidhi 3563"
    },
    {
        id: 58,
        category: "Shab-e-Qadr",
        title: "Dua for True Knowledge",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        translation: "My Lord, increase me in knowledge.",
        transliteration: "Rabbi zidni 'ilman",
        source: "Quran 20:114"
    },
    {
        id: 59,
        category: "Shab-e-Qadr",
        title: "Dua When Distressed",
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        translation: "O Living, O Self-Sustaining Sustainer! In Your Mercy do I seek relief.",
        transliteration: "Ya Hayyu ya Qayyum! Bi rahmatika astagheeth",
        source: "Tirmidhi 3524"
    },
    {
        id: 60,
        category: "Shab-e-Qadr",
        title: "Dua for Family",
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yunin waj'alna lil-muttaqeena imama",
        source: "Quran 25:74"
    },
    {
        id: 61,
        category: "Shab-e-Qadr",
        title: "Dua for Ease in Affairs",
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ سَهْلًا إِذَا شِئْتَ",
        translation: "O Allah, there is no ease other than what You make easy. If You please You ease sorrow.",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahlan, wa anta taj'alul-hazna ifa shi'ta sahlan",
        source: "Ibn Hibban 974"
    },
    {
        id: 62,
        category: "Shab-e-Qadr",
        title: "Dua Against Ignorance",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
        translation: "O Allah, I seek refuge in You lest I misguide others, or I am misguided by others, and lest I behave foolishly.",
        transliteration: "Allahumma inni a'udhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala 'alayya",
        source: "Abu Dawud 5094"
    }
];
