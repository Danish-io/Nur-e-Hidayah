import { getCachedHadithData } from "./hadith-cache";
import { hadithCollections } from "./hadith-data";
import { HADITH_ARABIC_SECTIONS } from "./hadith-arabic-sections";

export interface FullHadith {
    hadithnumber: number | string;
    text: string;
    grades: { grade: string; source: string }[];
    reference: { book: number; hadith: number };
}

export interface HadithChapter {
    id: string;
    title: string;
    arabicTitle?: string;
    hadithRanges?: {
        first: number;
        last: number;
    };
}

export async function getHadiths(slug: string, page = 1, limit = 20, lang = "en", chapterId?: string) {
    const fileData = getCachedHadithData(slug, lang);
    let fallbackData = null;

    // Load fallback English file if we are in non-En mode
    if (lang !== "en" && fileData) {
        fallbackData = getCachedHadithData(slug, "en");
    }

    if (fileData && fileData.hadiths) {
        let allHadiths = fileData.hadiths;

        if (chapterId) {
            allHadiths = allHadiths.filter((h: any) => String(h.reference?.book) === String(chapterId));
        }

        const total = allHadiths.length;
        const start = (page - 1) * limit;
        const end = start + limit;

        // Create a map for fast fallback lookup if needed
        const fallbackMap = new Map<string | number, string>();
        if (fallbackData?.hadiths) {
            // Optimize: only map the slice we need if indices align, 
            // but hadithnumbers might not be sequential indices.
            // For safety, map all or just find on demand. 
            // Mapping all might be slow for 7000 items every request? 
            // Actually 7000 items is cheap for V8.
            fallbackData.hadiths.forEach((h: FullHadith) => fallbackMap.set(h.hadithnumber, h.text));
        }

        const items = allHadiths.slice(start, end).map((h: FullHadith) => {
            let text = h.text;
            if (!text || text.trim() === "") {
                // Try fallback
                text = fallbackMap.get(h.hadithnumber) || "Translation not available.";
            }

            return {
                id: h.hadithnumber,
                source: `${slug.charAt(0).toUpperCase() + slug.slice(1)} ${h.hadithnumber}`,
                chapter: `Book ${h.reference?.book || "?"}`,
                narrator: "Narrated",
                text: text,
                grade: h.grades?.[0]?.grade || "Authentic"
            };
        });

        return {
            hadiths: items,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    // 2. Fallback to manual dictionary (English Mock)
    const manualData = hadithCollections[slug] || [];
    return {
        hadiths: manualData,
        total: manualData.length,
        page: 1,
        totalPages: 1
    };
}

export async function getHadithChapters(slug: string): Promise<HadithChapter[]> {
    const fileData: any = getCachedHadithData(slug, "en");
    const arabicSections = HADITH_ARABIC_SECTIONS[slug] || {};

    if (fileData && fileData.metadata && fileData.metadata.sections) {
        const sections = fileData.metadata.sections;
        const details = fileData.metadata.section_details || {};

        const chapters: HadithChapter[] = [];
        
        for (const [key, title] of Object.entries<string>(sections)) {
            if (!title && key === "0") continue; // Skip empty chapter 0
            
            const chapterDetails = details[key] || {};
            
            chapters.push({
                id: key,
                title: title || `Chapter ${key}`,
                arabicTitle: arabicSections[key] || undefined,
                hadithRanges: chapterDetails.hadithnumber_first ? {
                    first: chapterDetails.hadithnumber_first,
                    last: chapterDetails.hadithnumber_last
                } : undefined
            });
        }
        
        return chapters;
    }

    return [];
}
