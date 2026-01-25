export interface Dua {
    id: number;
    category: "Morning" | "Evening" | "Daily" | "Selected" | "After Salah" | "Ramadan";
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
    }
];
