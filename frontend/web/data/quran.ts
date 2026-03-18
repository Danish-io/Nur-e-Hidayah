export interface Surah {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: 'Meccan' | 'Medinan';
    totalVerses: number;
    revelationOrder: number;
    verses: Verse[];
}

export interface VerseWord {
    id: number;
    text: string;
    transliteration?: string;
    translation?: string;
    startTime?: number;
    endTime?: number;
}

export interface Verse {
    id: number;
    text: string;
    translation: string; // Urdu
    englishTranslation?: string; // English
    audio?: string; // Audio URL
    audioUrdu?: string;
    audioEnglish?: string;
    textIndopak?: string;
    words?: VerseWord[];
    segments?: number[][]; // [word_index, start_ms, end_ms]
    startTime?: number; // In milliseconds
    endTime?: number;   // In milliseconds
}

export const quranData: Surah[] = [
    {
        id: 1, revelationOrder: 5,
        name: "الفاتحة",
        transliteration: "Al-Fatiha",
        translation: "The Opener",
        type: "Meccan",
        totalVerses: 7,
        verses: [
            { id: 1, text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", translation: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے", englishTranslation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
            { id: 2, text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", translation: "سب طرح کی تعریف خدا ہی کو (سزاوار) ہے جو تمام مخلوقات کا پروردگار ہے", englishTranslation: "[All] praise is [due] to Allah, Lord of the worlds -" },
            { id: 3, text: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", translation: "بڑا مہربان نہایت رحم والا", englishTranslation: "The Entirely Merciful, the Especially Merciful," },
            { id: 4, text: "مَـٰلِكِ يَوْمِ ٱلدِّينِ", translation: "انصاف کے دن کا حاکم", englishTranslation: "Sovereign of the Day of Recompense." },
            { id: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں", englishTranslation: "It is You we worship and You we ask for help." },
            { id: 6, text: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", translation: "ہم کو سیدھے راستے چلا", englishTranslation: "Guide us to the straight path -" },
            { id: 7, text: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", translation: "ان لوگوں کے راستے جن پر تو اپنا فضل و کرم کرتا رہا نہ ان کے جن پر غصے ہوتا رہا اور نہ گمراہوں کے", englishTranslation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
        ]
    },
    {
        id: 2, revelationOrder: 87,
        name: "البقرة",
        transliteration: "Al-Baqarah",
        translation: "The Cow",
        type: "Medinan",
        totalVerses: 286,
        verses: [
            { id: 1, text: "الم", translation: "الم", englishTranslation: "Alif, Lam, Meem." },
            { id: 2, text: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ", translation: "یہ (خدا کی) کتاب ہے اس میں کوئی شک نہیں پرہیزگاروں کو راہ دکھاتی ہے", englishTranslation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah -" },
            { id: 3, text: "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ", translation: "جو بن دیکھے ایمان لاتے ہیں اور نماز پڑھتے ہیں اور جو ہم نے ان کو دیا ہے اس میں سے (اللہ کی راہ میں) خرچ کرتے ہیں", englishTranslation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them," }
        ]
    },
    { id: 3, revelationOrder: 89, name: "آل عمران", transliteration: "Al-Imran", translation: "Family of Imran", type: "Medinan", totalVerses: 200, verses: [] },
    { id: 4, revelationOrder: 92, name: "النساء", transliteration: "An-Nisa", translation: "The Women", type: "Medinan", totalVerses: 176, verses: [] },
    { id: 5, revelationOrder: 112, name: "المائدة", transliteration: "Al-Ma'idah", translation: "The Table Spread", type: "Medinan", totalVerses: 120, verses: [] },
    { id: 6, revelationOrder: 55, name: "الأنعام", transliteration: "Al-An'am", translation: "The Cattle", type: "Meccan", totalVerses: 165, verses: [] },
    { id: 7, revelationOrder: 39, name: "الأعراف", transliteration: "Al-A'raf", translation: "The Heights", type: "Meccan", totalVerses: 206, verses: [] },
    { id: 8, revelationOrder: 88, name: "الأنفال", transliteration: "Al-Anfal", translation: "The Spoils of War", type: "Medinan", totalVerses: 75, verses: [] },
    { id: 9, revelationOrder: 113, name: "التوبة", transliteration: "At-Tawbah", translation: "The Repentance", type: "Medinan", totalVerses: 129, verses: [] },
    { id: 10, revelationOrder: 51, name: "يونس", transliteration: "Yunus", translation: "Jonah", type: "Meccan", totalVerses: 109, verses: [] },
    { id: 11, revelationOrder: 52, name: "هود", transliteration: "Hud", translation: "Hud", type: "Meccan", totalVerses: 123, verses: [] },
    { id: 12, revelationOrder: 53, name: "يوسف", transliteration: "Yusuf", translation: "Joseph", type: "Meccan", totalVerses: 111, verses: [] },
    { id: 13, revelationOrder: 96, name: "الرعد", transliteration: "Ar-Ra'd", translation: "The Thunder", type: "Medinan", totalVerses: 43, verses: [] },
    { id: 14, revelationOrder: 72, name: "إبراهيم", transliteration: "Ibrahim", translation: "Abraham", type: "Meccan", totalVerses: 52, verses: [] },
    { id: 15, revelationOrder: 54, name: "الحجر", transliteration: "Al-Hijr", translation: "The Rocky Tract", type: "Meccan", totalVerses: 99, verses: [] },
    { id: 16, revelationOrder: 70, name: "النحل", transliteration: "An-Nahl", translation: "The Bee", type: "Meccan", totalVerses: 128, verses: [] },
    { id: 17, revelationOrder: 50, name: "الإسراء", transliteration: "Al-Isra", translation: "The Night Journey", type: "Meccan", totalVerses: 111, verses: [] },
    { id: 18, revelationOrder: 69, name: "الكهف", transliteration: "Al-Kahf", translation: "The Cave", type: "Meccan", totalVerses: 110, verses: [] },
    { id: 19, revelationOrder: 44, name: "مريم", transliteration: "Maryam", translation: "Mary", type: "Meccan", totalVerses: 98, verses: [] },
    { id: 20, revelationOrder: 45, name: "طه", transliteration: "Taha", translation: "Ta-Ha", type: "Meccan", totalVerses: 135, verses: [] },
    { id: 21, revelationOrder: 73, name: "الأنبياء", transliteration: "Al-Anbya", translation: "The Prophets", type: "Meccan", totalVerses: 112, verses: [] },
    { id: 22, revelationOrder: 103, name: "الحج", transliteration: "Al-Hajj", translation: "The Pilgrimage", type: "Medinan", totalVerses: 78, verses: [] },
    { id: 23, revelationOrder: 74, name: "المؤمنون", transliteration: "Al-Mu'minun", translation: "The Believers", type: "Meccan", totalVerses: 118, verses: [] },
    { id: 24, revelationOrder: 102, name: "النور", transliteration: "An-Nur", translation: "The Light", type: "Medinan", totalVerses: 64, verses: [] },
    { id: 25, revelationOrder: 42, name: "الفرقان", transliteration: "Al-Furqan", translation: "The Criterion", type: "Meccan", totalVerses: 77, verses: [] },
    { id: 26, revelationOrder: 47, name: "الشعراء", transliteration: "Ash-Shu'ara", translation: "The Poets", type: "Meccan", totalVerses: 227, verses: [] },
    { id: 27, revelationOrder: 48, name: "النمل", transliteration: "An-Naml", translation: "The Ant", type: "Meccan", totalVerses: 93, verses: [] },
    { id: 28, revelationOrder: 49, name: "القصص", transliteration: "Al-Qasas", translation: "The Stories", type: "Meccan", totalVerses: 88, verses: [] },
    { id: 29, revelationOrder: 85, name: "العنكبوت", transliteration: "Al-Ankabut", translation: "The Spider", type: "Meccan", totalVerses: 69, verses: [] },
    { id: 30, revelationOrder: 84, name: "الروم", transliteration: "Ar-Rum", translation: "The Romans", type: "Meccan", totalVerses: 60, verses: [] },
    { id: 31, revelationOrder: 57, name: "لقمان", transliteration: "Luqman", translation: "Luqman", type: "Meccan", totalVerses: 34, verses: [] },
    { id: 32, revelationOrder: 75, name: "السجدة", transliteration: "As-Sajdah", translation: "The Prostration", type: "Meccan", totalVerses: 30, verses: [] },
    { id: 33, revelationOrder: 90, name: "الأحزاب", transliteration: "Al-Ahzab", translation: "The Combined Forces", type: "Medinan", totalVerses: 73, verses: [] },
    { id: 34, revelationOrder: 58, name: "سبأ", transliteration: "Saba", translation: "Sheba", type: "Meccan", totalVerses: 54, verses: [] },
    { id: 35, revelationOrder: 43, name: "فاطر", transliteration: "Fatir", translation: "Originator", type: "Meccan", totalVerses: 45, verses: [] },
    { id: 36, revelationOrder: 41, name: "يس", transliteration: "Ya-Sin", translation: "Ya Sin", type: "Meccan", totalVerses: 83, verses: [] },
    { id: 37, revelationOrder: 56, name: "الصافات", transliteration: "As-Saffat", translation: "Those who set the Ranks", type: "Meccan", totalVerses: 182, verses: [] },
    { id: 38, revelationOrder: 38, name: "ص", transliteration: "Sad", translation: "The Letter \"Saad\"", type: "Meccan", totalVerses: 88, verses: [] },
    { id: 39, revelationOrder: 59, name: "الزمر", transliteration: "Az-Zumar", translation: "The Troops", type: "Meccan", totalVerses: 75, verses: [] },
    { id: 40, revelationOrder: 60, name: "غافر", transliteration: "Ghafir", translation: "The Forgiver", type: "Meccan", totalVerses: 85, verses: [] },
    { id: 41, revelationOrder: 61, name: "فصلت", transliteration: "Fussilat", translation: "Explained in Detail", type: "Meccan", totalVerses: 54, verses: [] },
    { id: 42, revelationOrder: 62, name: "الشورى", transliteration: "Ash-Shura", translation: "The Consultation", type: "Meccan", totalVerses: 53, verses: [] },
    { id: 43, revelationOrder: 63, name: "الزخرف", transliteration: "Az-Zukhruf", translation: "The Ornaments of Gold", type: "Meccan", totalVerses: 89, verses: [] },
    { id: 44, revelationOrder: 64, name: "الدخان", transliteration: "Ad-Dukhan", translation: "The Smoke", type: "Meccan", totalVerses: 59, verses: [] },
    { id: 45, revelationOrder: 65, name: "الجاثية", transliteration: "Al-Jathiyah", translation: "The Crouching", type: "Meccan", totalVerses: 37, verses: [] },
    { id: 46, revelationOrder: 66, name: "الأحقاف", transliteration: "Al-Ahqaf", translation: "The Wind-Curved Sandhills", type: "Meccan", totalVerses: 35, verses: [] },
    { id: 47, revelationOrder: 95, name: "محمد", transliteration: "Muhammad", translation: "Muhammad", type: "Medinan", totalVerses: 38, verses: [] },
    { id: 48, revelationOrder: 111, name: "الفتح", transliteration: "Al-Fath", translation: "The Victory", type: "Medinan", totalVerses: 29, verses: [] },
    { id: 49, revelationOrder: 106, name: "الحجرات", transliteration: "Al-Hujurat", translation: "The Rooms", type: "Medinan", totalVerses: 18, verses: [] },
    { id: 50, revelationOrder: 34, name: "ق", transliteration: "Qaf", translation: "The Letter \"Qaf\"", type: "Meccan", totalVerses: 45, verses: [] },
    { id: 51, revelationOrder: 67, name: "الذاريات", transliteration: "Adh-Dhariyat", translation: "The Winnowing Winds", type: "Meccan", totalVerses: 60, verses: [] },
    { id: 52, revelationOrder: 76, name: "الطور", transliteration: "At-Tur", translation: "The Mount", type: "Meccan", totalVerses: 49, verses: [] },
    { id: 53, revelationOrder: 23, name: "النجم", transliteration: "An-Najm", translation: "The Star", type: "Meccan", totalVerses: 62, verses: [] },
    { id: 54, revelationOrder: 37, name: "القمر", transliteration: "Al-Qamar", translation: "The Moon", type: "Meccan", totalVerses: 55, verses: [] },
    { id: 55, revelationOrder: 97, name: "الرحمن", transliteration: "Ar-Rahman", translation: "The Beneficent", type: "Medinan", totalVerses: 78, verses: [] },
    { id: 56, revelationOrder: 46, name: "الواقعة", transliteration: "Al-Waqi'ah", translation: "The Inevitable", type: "Meccan", totalVerses: 96, verses: [] },
    { id: 57, revelationOrder: 94, name: "الحديد", transliteration: "Al-Hadid", translation: "The Iron", type: "Medinan", totalVerses: 29, verses: [] },
    { id: 58, revelationOrder: 105, name: "المجادلة", transliteration: "Al-Mujadila", translation: "The Pleading Woman", type: "Medinan", totalVerses: 22, verses: [] },
    { id: 59, revelationOrder: 101, name: "الحشر", transliteration: "Al-Hashr", translation: "The Exile", type: "Medinan", totalVerses: 24, verses: [] },
    { id: 60, revelationOrder: 91, name: "الممتحنة", transliteration: "Al-Mumtahanah", translation: "She that is to be examined", type: "Medinan", totalVerses: 13, verses: [] },
    { id: 61, revelationOrder: 109, name: "الصف", transliteration: "As-Saff", translation: "The Ranks", type: "Medinan", totalVerses: 14, verses: [] },
    { id: 62, revelationOrder: 110, name: "الجمعة", transliteration: "Al-Jumu'ah", translation: "The Congregation, Friday", type: "Medinan", totalVerses: 11, verses: [] },
    { id: 63, revelationOrder: 104, name: "المنافقون", transliteration: "Al-Munafiqun", translation: "The Hypocrites", type: "Medinan", totalVerses: 11, verses: [] },
    { id: 64, revelationOrder: 108, name: "التغابن", transliteration: "At-Taghabun", translation: "The Mutual Disillusion", type: "Medinan", totalVerses: 18, verses: [] },
    { id: 65, revelationOrder: 99, name: "الطلاق", transliteration: "At-Talaq", translation: "The Divorce", type: "Medinan", totalVerses: 12, verses: [] },
    { id: 66, revelationOrder: 107, name: "التحريم", transliteration: "At-Tahrim", translation: "The Prohibition", type: "Medinan", totalVerses: 12, verses: [] },
    { id: 67, revelationOrder: 77, name: "الملك", transliteration: "Al-Mulk", translation: "The Sovereignty", type: "Meccan", totalVerses: 30, verses: [] },
    { id: 68, revelationOrder: 2, name: "القلم", transliteration: "Al-Qalam", translation: "The Pen", type: "Meccan", totalVerses: 52, verses: [] },
    { id: 69, revelationOrder: 78, name: "الحاقة", transliteration: "Al-Haqqah", translation: "The Reality", type: "Meccan", totalVerses: 52, verses: [] },
    { id: 70, revelationOrder: 79, name: "المعارج", transliteration: "Al-Ma'arij", translation: "The Ascending Stairways", type: "Meccan", totalVerses: 44, verses: [] },
    { id: 71, revelationOrder: 71, name: "نوح", transliteration: "Nuh", translation: "Noah", type: "Meccan", totalVerses: 28, verses: [] },
    { id: 72, revelationOrder: 40, name: "الجن", transliteration: "Al-Jinn", translation: "The Jinn", type: "Meccan", totalVerses: 28, verses: [] },
    { id: 73, revelationOrder: 3, name: "المزمل", transliteration: "Al-Muzzammil", translation: "The Enshrouded One", type: "Meccan", totalVerses: 20, verses: [] },
    { id: 74, revelationOrder: 4, name: "المدثر", transliteration: "Al-Muddaththir", translation: "The Cloaked One", type: "Meccan", totalVerses: 56, verses: [] },
    { id: 75, revelationOrder: 31, name: "القيامة", transliteration: "Al-Qiyamah", translation: "The Resurrection", type: "Meccan", totalVerses: 40, verses: [] },
    { id: 76, revelationOrder: 98, name: "الإنسان", transliteration: "Al-Insan", translation: "The Man", type: "Medinan", totalVerses: 31, verses: [] },
    { id: 77, revelationOrder: 33, name: "المرسلات", transliteration: "Al-Mursalat", translation: "The Emissaries", type: "Meccan", totalVerses: 50, verses: [] },
    { id: 78, revelationOrder: 80, name: "النبأ", transliteration: "An-Naba", translation: "The Tidings", type: "Meccan", totalVerses: 40, verses: [] },
    { id: 79, revelationOrder: 81, name: "النازعات", transliteration: "An-Nazi'at", translation: "Those who drag forth", type: "Meccan", totalVerses: 46, verses: [] },
    { id: 80, revelationOrder: 24, name: "عبس", transliteration: "Abasa", translation: "He Frowned", type: "Meccan", totalVerses: 42, verses: [] },
    { id: 81, revelationOrder: 7, name: "التكوير", transliteration: "At-Takwir", translation: "The Overthrowing", type: "Meccan", totalVerses: 29, verses: [] },
    { id: 82, revelationOrder: 82, name: "الإنفطار", transliteration: "Al-Infitar", translation: "The Cleaving", type: "Meccan", totalVerses: 19, verses: [] },
    { id: 83, revelationOrder: 86, name: "المطففين", transliteration: "Al-Mutaffifin", translation: "The Defrauding", type: "Meccan", totalVerses: 36, verses: [] },
    { id: 84, revelationOrder: 83, name: "الإنشقاق", transliteration: "Al-Inshiqaq", translation: "The Sundering", type: "Meccan", totalVerses: 25, verses: [] },
    { id: 85, revelationOrder: 27, name: "البروج", transliteration: "Al-Buruj", translation: "The Mansions of the Stars", type: "Meccan", totalVerses: 22, verses: [] },
    { id: 86, revelationOrder: 36, name: "الطارق", transliteration: "At-Tariq", translation: "The Nightcommer", type: "Meccan", totalVerses: 17, verses: [] },
    { id: 87, revelationOrder: 8, name: "الأعلى", transliteration: "Al-A'la", translation: "The Most High", type: "Meccan", totalVerses: 19, verses: [] },
    { id: 88, revelationOrder: 68, name: "الغاشية", transliteration: "Al-Ghashiyah", translation: "The Overwhelming", type: "Meccan", totalVerses: 26, verses: [] },
    { id: 89, revelationOrder: 10, name: "الفجر", transliteration: "Al-Fajr", translation: "The Dawn", type: "Meccan", totalVerses: 30, verses: [] },
    { id: 90, revelationOrder: 35, name: "البلد", transliteration: "Al-Balad", translation: "The City", type: "Meccan", totalVerses: 20, verses: [] },
    { id: 91, revelationOrder: 26, name: "الشمس", transliteration: "Ash-Shams", translation: "The Sun", type: "Meccan", totalVerses: 15, verses: [] },
    { id: 92, revelationOrder: 9, name: "الليل", transliteration: "Al-Layl", translation: "The Night", type: "Meccan", totalVerses: 21, verses: [] },
    { id: 93, revelationOrder: 11, name: "الضحى", transliteration: "Ad-Duhaa", translation: "The Morning Hours", type: "Meccan", totalVerses: 11, verses: [] },
    { id: 94, revelationOrder: 12, name: "الشرح", transliteration: "Ash-Sharh", translation: "The Relief", type: "Meccan", totalVerses: 8, verses: [] },
    { id: 95, revelationOrder: 28, name: "التين", transliteration: "At-Tin", translation: "The Fig", type: "Meccan", totalVerses: 8, verses: [] },
    { id: 96, revelationOrder: 1, name: "العلق", transliteration: "Al-Alaq", translation: "The Clot", type: "Meccan", totalVerses: 19, verses: [] },
    { id: 97, revelationOrder: 25, name: "القدر", transliteration: "Al-Qadr", translation: "The Power", type: "Meccan", totalVerses: 5, verses: [] },
    { id: 98, revelationOrder: 100, name: "البينة", transliteration: "Al-Bayyinah", translation: "The Clear Proof", type: "Medinan", totalVerses: 8, verses: [] },
    { id: 99, revelationOrder: 93, name: "الزلزلة", transliteration: "Az-Zalzalah", translation: "The Earthquake", type: "Medinan", totalVerses: 8, verses: [] },
    { id: 100, revelationOrder: 14, name: "العاديات", transliteration: "Al-Adiyat", translation: "The Courser", type: "Meccan", totalVerses: 11, verses: [] },
    { id: 101, revelationOrder: 30, name: "القارعة", transliteration: "Al-Qari'ah", translation: "The Calamity", type: "Meccan", totalVerses: 11, verses: [] },
    { id: 102, revelationOrder: 16, name: "التكاثر", transliteration: "At-Takathur", translation: "The Rivalry in world increase", type: "Meccan", totalVerses: 8, verses: [] },
    { id: 103, revelationOrder: 13, name: "العصر", transliteration: "Al-Asr", translation: "The Declining Day", type: "Meccan", totalVerses: 3, verses: [] },
    { id: 104, revelationOrder: 32, name: "الهمزة", transliteration: "Al-Humazah", translation: "The Traducer", type: "Meccan", totalVerses: 9, verses: [] },
    { id: 105, revelationOrder: 19, name: "الفيل", transliteration: "Al-Fil", translation: "The Elephant", type: "Meccan", totalVerses: 5, verses: [] },
    { id: 106, revelationOrder: 29, name: "قريش", transliteration: "Quraysh", translation: "Quraysh", type: "Meccan", totalVerses: 4, verses: [] },
    { id: 107, revelationOrder: 17, name: "الماعون", transliteration: "Al-Ma'un", translation: "The Small Kindnesses", type: "Meccan", totalVerses: 7, verses: [] },
    { id: 108, revelationOrder: 15, name: "الكوثر", transliteration: "Al-Kawthar", translation: "The Abundance", type: "Meccan", totalVerses: 3, verses: [] },
    { id: 109, revelationOrder: 18, name: "الكافرون", transliteration: "Al-Kafirun", translation: "The Disbelievers", type: "Meccan", totalVerses: 6, verses: [] },
    { id: 110, revelationOrder: 114, name: "النصر", transliteration: "An-Nasr", translation: "The Divine Support", type: "Medinan", totalVerses: 3, verses: [] },
    { id: 111, revelationOrder: 6, name: "المسد", transliteration: "Al-Masad", translation: "The Palm Fiber", type: "Meccan", totalVerses: 5, verses: [] },
    { id: 112, revelationOrder: 22, name: "الإخلاص", transliteration: "Al-Ikhlas", translation: "The Sincerity", type: "Meccan", totalVerses: 4, verses: [] },
    { id: 113, revelationOrder: 20, name: "الفلق", transliteration: "Al-Falaq", translation: "The Daybreak", type: "Meccan", totalVerses: 5, verses: [] },
    { id: 114, revelationOrder: 21, name: "الناس", transliteration: "An-Nas", translation: "Mankind", type: "Meccan", totalVerses: 6, verses: [] }
];
