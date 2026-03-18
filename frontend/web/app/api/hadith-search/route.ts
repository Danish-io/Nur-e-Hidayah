import { NextRequest, NextResponse } from "next/server";
import { getCachedHadithData } from "@/lib/hadith-cache";

const HADITH_SLUGS = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"];
const HADITH_TITLES: Record<string, string> = {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    tirmidhi: "Jami' al-Tirmidhi",
    nasai: "Sunan al-Nasa'i",
    ibnmajah: "Sunan Ibn Majah",
};

export interface HadithSearchResult {
    id: string | number;
    source: string;
    book: string;
    slug: string;
    text: string;
    grade: string;
    bookNumber: number;
    hadithNumber: number;
}

const KEYWORD_MAP: Record<string, string[]> = {
    "namaz": ["prayer", "salat", "salah"],
    "roza": ["fast", "fasting", "sawm", "siyam"],
    "zakat": ["charity", "alms", "zakah"],
    "hajj": ["pilgrimage"],
    "wudu": ["ablution", "wudhu"],
    "ghusl": ["bath", "purification"],
    "nikah": ["marriage", "wedding"],
    "talaq": ["divorce"],
    "jannat": ["paradise", "heaven"],
    "jahannam": ["hell", "fire"],
    "deen": ["religion", "faith"],
    "dunya": ["world"],
    "akhirat": ["hereafter"],
    "shaitan": ["satan", "devil"],
    "malak": ["angel"],
};

function isArabicUrduScript(text: string): boolean {
    const arabicRange = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRange.test(text);
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("q")?.trim() || "";
    const query = rawQuery.toLowerCase();
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [], total: 0 });
    }

    const isScript = isArabicUrduScript(query);
    const searchTerms = [query];
    
    // Add mapped English terms for Roman Urdu keywords
    if (!isScript) {
        for (const [key, values] of Object.entries(KEYWORD_MAP)) {
            if (query.includes(key)) {
                searchTerms.push(...values);
            }
        }
    }

    const results: HadithSearchResult[] = [];
    const seenIds = new Set<string>();

    const langsToSearch = isScript ? ["ar", "ur"] : ["en"];
    // If it's English, we also check Urdu/Arabic in case the term exists there (unlikely but safe)
    if (!isScript) langsToSearch.push("ur");

    for (const lang of langsToSearch) {
        for (const slug of HADITH_SLUGS) {
            if (results.length >= limit) break;

            const data = getCachedHadithData(slug, lang);
            if (!data) continue;

            try {
                const hadiths: any[] = data.hadiths || [];
                const sections: Record<string, string> = data.metadata?.sections || {};

                for (const h of hadiths) {
                    if (results.length >= limit) break;

                    const text: string = h.text || "";
                    const normalizedText = text.toLowerCase();
                    
                    const matches = searchTerms.some(term => normalizedText.includes(term));
                    
                    if (matches) {
                        const resultId = `${slug}-${h.hadithnumber}`;
                        if (seenIds.has(resultId)) continue;

                        const bookTitle = sections[String(h.reference?.book)] || `Book ${h.reference?.book}`;
                        results.push({
                            id: h.hadithnumber,
                            source: `${HADITH_TITLES[slug]} ${h.hadithnumber}`,
                            book: bookTitle,
                            slug,
                            text: text.slice(0, 400) + (text.length > 400 ? "…" : ""),
                            grade: h.grades?.[0]?.grade || "Authentic",
                            bookNumber: h.reference?.book || 0,
                            hadithNumber: h.hadithnumber,
                        });
                        seenIds.add(resultId);
                    }
                }
            } catch (e) {
                console.error(`Search error for ${slug} ${lang}:`, e);
            }
        }
    }

    return NextResponse.json({ results, total: results.length });
}
