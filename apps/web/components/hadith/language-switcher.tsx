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
        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800/50 p-1 rounded-xl border border-slate-200 dark:border-white/10">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                        flex flex-col items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all leading-tight
                        ${currentLang === lang.code
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"}
                    `}
                >
                    <span className="text-[11px] font-bold tracking-widest uppercase">{lang.code}</span>
                    <span className={`text-[10px] mt-0.5 opacity-80 ${lang.code === "ar" || lang.code === "ur" ? "font-arabic" : ""}`}>
                        {lang.native}
                    </span>
                </button>
            ))}
        </div>
    );
}
