export type Language = 'en' | 'ar';
export type ScholarLevel = 'kids' | 'madrasah' | 'university';

export interface LocalizedContent {
    en: string;
    ar: string;
}

export interface ScholarBio {
    kids: LocalizedContent;
    madrasah: LocalizedContent;
    university: LocalizedContent;
}

export interface Scholar {
    id: string;
    name: LocalizedContent;
    school: string; // e.g., Hanafi, Maliki, etc.
    era: string;    // e.g., 8th century
    region: string; // e.g., Kufa (Iraq)
    bio: ScholarBio;
    image?: string; // Optional image URL
}
