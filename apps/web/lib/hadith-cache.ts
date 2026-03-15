import fs from "fs";
import path from "path";

/**
 * Global singleton for Hadith data caching.
 * This prevents re-parsing multi-megabyte JSON files on every request.
 */

interface HadithCache {
    [key: string]: {
        data: any;
        timestamp: number;
    }
}

// Global variable to persist cache across serverless function reuses (on supported platforms like Netlify/Vercel)
const globalCache: HadithCache = {};

const CACHE_TTL = 3600000; // 1 hour in ms

export function getCachedHadithData(slug: string, lang = "en") {
    const cacheKey = `${slug}-${lang}`;
    const now = Date.now();

    if (globalCache[cacheKey] && (now - globalCache[cacheKey].timestamp < CACHE_TTL)) {
        return globalCache[cacheKey].data;
    }

    // Cache miss or expired - Load from disk
    const suffix = lang === "en" ? "" : `-${lang}`;
    const filename = `${slug}${suffix}.json`;
    
    const possiblePaths = [
        path.join(process.cwd(), "apps/web/lib/data", filename),
        path.join(process.cwd(), "lib/data", filename),
        path.join(process.cwd(), "../web/lib/data", filename),
    ];

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            try {
                const raw = fs.readFileSync(p, "utf-8");
                const parsed = JSON.parse(raw);
                
                // Store in cache
                globalCache[cacheKey] = {
                    data: parsed,
                    timestamp: now
                };
                
                return parsed;
            } catch (e) {
                console.error(`Failed to parse hadith cache for ${p}:`, e);
            }
        }
    }

    return null;
}

export function clearHadithCache() {
    Object.keys(globalCache).forEach(key => delete globalCache[key]);
}
