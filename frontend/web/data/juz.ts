// Juz (Para) data structure
export interface Juz {
    id: number;
    name: string;
    nameArabic: string;
    startSurah: number;
    startVerse: number;
    endSurah: number;
    endVerse: number;
}

export const juzData: Juz[] = [
    { id: 1, name: "Juz 1", nameArabic: "الجزء ١", startSurah: 1, startVerse: 1, endSurah: 2, endVerse: 141 },
    { id: 2, name: "Juz 2", nameArabic: "الجزء ٢", startSurah: 2, startVerse: 142, endSurah: 2, endVerse: 252 },
    { id: 3, name: "Juz 3", nameArabic: "الجزء ٣", startSurah: 2, startVerse: 253, endSurah: 3, endVerse: 92 },
    { id: 4, name: "Juz 4", nameArabic: "الجزء ٤", startSurah: 3, startVerse: 93, endSurah: 4, endVerse: 23 },
    { id: 5, name: "Juz 5", nameArabic: "الجزء ٥", startSurah: 4, startVerse: 24, endSurah: 4, endVerse: 147 },
    { id: 6, name: "Juz 6", nameArabic: "الجزء ٦", startSurah: 4, startVerse: 148, endSurah: 5, endVerse: 81 },
    { id: 7, name: "Juz 7", nameArabic: "الجزء ٧", startSurah: 5, startVerse: 82, endSurah: 6, endVerse: 110 },
    { id: 8, name: "Juz 8", nameArabic: "الجزء ٨", startSurah: 6, startVerse: 111, endSurah: 7, endVerse: 87 },
    { id: 9, name: "Juz 9", nameArabic: "الجزء ٩", startSurah: 7, startVerse: 88, endSurah: 8, endVerse: 40 },
    { id: 10, name: "Juz 10", nameArabic: "الجزء ١٠", startSurah: 8, startVerse: 41, endSurah: 9, endVerse: 92 },
    { id: 11, name: "Juz 11", nameArabic: "الجزء ١١", startSurah: 9, startVerse: 93, endSurah: 11, endVerse: 5 },
    { id: 12, name: "Juz 12", nameArabic: "الجزء ١٢", startSurah: 11, startVerse: 6, endSurah: 12, endVerse: 52 },
    { id: 13, name: "Juz 13", nameArabic: "الجزء ١٣", startSurah: 12, startVerse: 53, endSurah: 15, endVerse: 1 },
    { id: 14, name: "Juz 14", nameArabic: "الجزء ١٤", startSurah: 15, startVerse: 2, endSurah: 16, endVerse: 128 },
    { id: 15, name: "Juz 15", nameArabic: "الجزء ١٥", startSurah: 17, startVerse: 1, endSurah: 18, endVerse: 74 },
    { id: 16, name: "Juz 16", nameArabic: "الجزء ١٦", startSurah: 18, startVerse: 75, endSurah: 20, endVerse: 135 },
    { id: 17, name: "Juz 17", nameArabic: "الجزء ١٧", startSurah: 21, startVerse: 1, endSurah: 22, endVerse: 78 },
    { id: 18, name: "Juz 18", nameArabic: "الجزء ١٨", startSurah: 23, startVerse: 1, endSurah: 25, endVerse: 20 },
    { id: 19, name: "Juz 19", nameArabic: "الجزء ١٩", startSurah: 25, startVerse: 21, endSurah: 27, endVerse: 55 },
    { id: 20, name: "Juz 20", nameArabic: "الجزء ٢٠", startSurah: 27, startVerse: 56, endSurah: 29, endVerse: 45 },
    { id: 21, name: "Juz 21", nameArabic: "الجزء ٢١", startSurah: 29, startVerse: 46, endSurah: 33, endVerse: 30 },
    { id: 22, name: "Juz 22", nameArabic: "الجزء ٢٢", startSurah: 33, startVerse: 31, endSurah: 36, endVerse: 27 },
    { id: 23, name: "Juz 23", nameArabic: "الجزء ٢٣", startSurah: 36, startVerse: 28, endSurah: 39, endVerse: 31 },
    { id: 24, name: "Juz 24", nameArabic: "الجزء ٢٤", startSurah: 39, startVerse: 32, endSurah: 41, endVerse: 46 },
    { id: 25, name: "Juz 25", nameArabic: "الجزء ٢٥", startSurah: 41, startVerse: 47, endSurah: 45, endVerse: 37 },
    { id: 26, name: "Juz 26", nameArabic: "الجزء ٢٦", startSurah: 46, startVerse: 1, endSurah: 51, endVerse: 30 },
    { id: 27, name: "Juz 27", nameArabic: "الجزء ٢٧", startSurah: 51, startVerse: 31, endSurah: 57, endVerse: 29 },
    { id: 28, name: "Juz 28", nameArabic: "الجزء ٢٨", startSurah: 58, startVerse: 1, endSurah: 66, endVerse: 12 },
    { id: 29, name: "Juz 29", nameArabic: "الجزء ٢٩", startSurah: 67, startVerse: 1, endSurah: 77, endVerse: 50 },
    { id: 30, name: "Juz 30", nameArabic: "الجزء ٣٠", startSurah: 78, startVerse: 1, endSurah: 114, endVerse: 6 }
];
