import fs from "fs";
import path from "path";
import { hadithCollections } from "./hadith-data";

export interface FullHadith {
    hadithnumber: number | string;
    text: string;
    grades: { grade: string; source: string }[];
    reference: { book: number; hadith: number };
}

export async function getHadiths(slug: string, page = 1, limit = 20, lang = "en") {
    // Determine filename based on language
    // en -> bukhari.json
    // ur -> bukhari-ur.json
    // ar -> bukhari-ar.json
    // For other books, if we don't have ur/ar downloaded, we might want fallback? 
    // Currently assuming I only downloaded bukhari-ur/ar.
    // If future books are added, we need them too.

    let filename = `${slug}.json`;
    if (lang === "ur") filename = `${slug}-ur.json`;
    if (lang === "ar") filename = `${slug}-ar.json`;

    // Flexible path checking
    const possiblePaths = [
        path.join(process.cwd(), "apps/web/lib/data", filename),
        path.join(process.cwd(), "lib/data", filename),
        path.join(process.cwd(), "../web/lib/data", filename),
    ];



    let fileData: { hadiths: FullHadith[] } | null = null;
    let fallbackData: { hadiths: FullHadith[] } | null = null;

    // Load target language file
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            try {
                const raw = fs.readFileSync(p, "utf-8");
                fileData = JSON.parse(raw);
                break;
            } catch (e) {
                console.error("Failed to read hadith json", e);
            }
        }
    }

    // Load fallback English file if we are in non-En mode
    if (lang !== "en" && fileData) {
        const enFilename = `${slug}.json`;
        const enPaths = [
            path.join(process.cwd(), "apps/web/lib/data", enFilename),
            path.join(process.cwd(), "lib/data", enFilename),
            path.join(process.cwd(), "../web/lib/data", enFilename),
        ];

        for (const p of enPaths) {
            if (fs.existsSync(p)) {
                try {
                    const raw = fs.readFileSync(p, "utf-8");
                    fallbackData = JSON.parse(raw);
                    break;
                } catch { /* ignore */ }
            }
        }
    }

    if (fileData && fileData.hadiths) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const total = fileData.hadiths.length;

        // Create a map for fast fallback lookup if needed
        const fallbackMap = new Map<string | number, string>();
        if (fallbackData?.hadiths) {
            // Optimize: only map the slice we need if indices align, 
            // but hadithnumbers might not be sequential indices.
            // For safety, map all or just find on demand. 
            // Mapping all might be slow for 7000 items every request? 
            // Actually 7000 items is cheap for V8.
            fallbackData.hadiths.forEach(h => fallbackMap.set(h.hadithnumber, h.text));
        }

        const items = fileData.hadiths.slice(start, end).map(h => {
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
