"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";

const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "ur", name: "Urdu", native: "اردو" },
    { code: "ar", name: "Arabic", native: "العربية" },
];

export function HadithLanguageSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentLang = searchParams.get("lang") || "en";

    const handleLanguageChange = (langCode: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", langCode);
        // Reset page to 1 when changing language to avoid out of bounds if counts differ
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800/50 p-1 rounded-lg border border-slate-200 dark:border-white/10">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                        px-3 py-1.5 rounded-md text-sm font-medium transition-all
                        ${currentLang === lang.code
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"}
                    `}
                >
                    <span className="hidden sm:inline">{lang.name}</span>
                    <span className="sm:hidden">{lang.code.toUpperCase()}</span>
                </button>
            ))}
        </div>
    );
}
