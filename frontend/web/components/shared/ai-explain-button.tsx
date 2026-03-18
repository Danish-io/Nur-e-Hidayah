"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Bot, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIExplainButtonProps {
    contextId: string;
    text: string;
    type: "quran" | "hadith";
}

interface StructuredExplanation {
    bismillah: string;
    title: string;
    summary: string;
    context: {
        title: string;
        content: string;
    };
    lessons: {
        title: string;
        content: string;
    }[];
    principles: {
        title: string;
        items: string[];
    };
    dailyLife: {
        title: string;
        items: string[];
    };
    conclusion: string;
    dua: string;
}

export function AIExplainButton({ contextId, text, type }: AIExplainButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState<StructuredExplanation | null>(null);

    const [language, setLanguage] = useState<'en' | 'ur' | 'hi'>('en');

    const generateExplanation = (lang: 'en' | 'ur' | 'hi') => {
        setIsLoading(true);
        // Simulate API call with structured data
        setTimeout(() => {
            const isUrdu = lang === 'ur';
            const isHindi = lang === 'hi';

            setExplanation({
                bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
                title: isUrdu ? `وضاحت: ${type === 'quran' ? 'آیت' : 'حدیث'}` :
                    isHindi ? `Explanation: ${type === 'quran' ? 'Ayat' : 'Hadith'}` :
                        `Explanation of ${type === 'quran' ? 'Profound Verse' : 'Hadith Narration'}`,
                summary: isUrdu
                    ? `یہ متن "${text.substring(0, 50)}..." (${contextId}) اہم روحانی تصورات کو اجاگر کرتا ہے۔ یہ مومن کو اپنی باطنی حالت اور ظاہری اعمال پر گہرائی سے غور کرنے کی دعوت دیتا ہے۔`
                    : isHindi
                        ? `Yeh matn "${text.substring(0, 50)}..." (${contextId}) ahem roohani tasawwurat ko ujagar karta hai. Yeh momin ko apni batini halat aur zahiri amaal par gehrai se ghor karne ki dawat deta hai.`
                        : `The text "${text.substring(0, 50)}..." (${contextId}) highlights pivotal spiritual concepts. It calls upon the believer to reflect deeply on their inner state and outer actions, emphasizing that true righteousness stems from sincerity.`,
                context: {
                    title: isUrdu ? "پس منظر" : isHindi ? "Pas-e-Manzar" : "Historical Context",
                    content: isUrdu
                        ? `یہ ${type === 'quran' ? 'آیت' : 'حدیث'} ابتدائی مسلم کمیونٹی کی مخصوص ضروریات کو پورا کرتی ہے۔`
                        : isHindi
                            ? `Yeh ${type === 'quran' ? 'ayat' : 'hadith'} ibtidai Muslim community ki makhsoos zarooryat ko pura karti hai.`
                            : `This ${type === 'quran' ? 'verse' : 'tradition'} addresses the specific needs of the early Muslim community, guiding them through challenges by reinforcing trust in Divine Wisdom. It serves as a timeless reminder for all generations.`
                },
                lessons: [
                    {
                        title: isUrdu ? "مرکزی پیغام" : isHindi ? "Markazi Paigham" : "Core Message",
                        content: isUrdu
                            ? "یہاں بنیادی سبق یہ ہے کہ روحانی کامیابی کے لیے نیت اور عمل میں ہم آہنگی ضروری ہے۔"
                            : isHindi
                                ? "Yahan bunyadi sabaq yeh hai ke roohani kamyabi ke liye niyat aur amal mein ham-ahangi zaroori hai."
                                : `The primary lesson here is derived from the phrase "${text.substring(0, 20)}...", teaching us that spiritual success requires alignment between our intentions and deeds.`
                    },
                    {
                        title: isUrdu ? "خود احتسابی" : isHindi ? "Khud Ehtisabi" : "Self-Reflection",
                        content: isUrdu
                            ? "یہ مسلسل خود احتسابی کی ترغیب دیتا ہے۔"
                            : isHindi
                                ? "Yeh musalsal khud ehtisabi ki targheeb deta hai."
                                : "It encourages constant self-assessment to ensure one's path remains true to the guidance provided."
                    },
                    {
                        title: isUrdu ? "استقامت" : isHindi ? "Istaqamat" : "Perseverance",
                        content: isUrdu
                            ? "صبر اور ثابت قدمی کی یاد دہانی۔"
                            : isHindi
                                ? "Sabr aur sabit qadmi ki yaad dahani."
                                : "A reminder to remain patient and steadfast, knowing that every effort in the path of goodness is recognized."
                    }
                ],
                principles: {
                    title: isUrdu ? "متعلقہ اسلامی اصول" : isHindi ? "Mutalliqa Islami Usool" : "Relevant Islamic Principles",
                    items: isUrdu
                        ? ["تقویٰ (اللہ کا ڈر)", "احسان (عمدگی)"]
                        : isHindi
                            ? ["Taqwa (Allah ka dar)", "Ihsan (Umdagi)"]
                            : [
                                "Taqwa (God-Consciousness): Being mindful of Allah in all aspects.",
                                "Ihsan (Excellence): Striving for perfection in worship and conduct."
                            ]
                },
                dailyLife: {
                    title: isUrdu ? "روزمرہ کی زندگی میں اطلاق" : isHindi ? "Rozmarra Ki Zindagi Mein Itlaq" : "Application in Daily Life",
                    items: isUrdu
                        ? ["غور و فکر: روزانہ کچھ لمحات نکالیں۔", "عمل: اس ہدایت کو عمل میں لائیں۔"]
                        : isHindi
                            ? ["Ghor o Fikr: Rozana kuch lamhat nikalain.", "Amal: Is hidayat ko amal mein layain."]
                            : [
                                "Reflection: Spend a few moments daily contemplating this message.",
                                "Action: Translate this guidance into a tangible good deed today.",
                                "Sharing: Discuss this insight with family or friends to spread benefit."
                            ]
                },
                conclusion: isUrdu
                    ? "آخر میں، یہ ہدایت ایک روشنی کے مینار کے طور پر کام کرتی ہے۔"
                    : isHindi
                        ? "Aakhir mein, yeh hidayat aik roshni ke minaar ke tor par kaam karti hai."
                        : "Ultimately, this guidance serves as a beacon, illuminating the path towards spiritual cultivation and moral excellence.",
                dua: isUrdu
                    ? "اللہ تعالیٰ ہمیں سمجھنے اور عمل کرنے کی توفیق عطا فرمائے۔ آمین۔"
                    : isHindi
                        ? "Allah Ta'ala hamein samajhne aur amal karne ki taufiq ata farmaye. Ameen."
                        : "May Allah (SWT) grant us the wisdom to understand this message and the strength to implement it in our lives. Ameen."
            });
            setIsLoading(false);
        }, 1500);
    };

    const handleExplain = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
        if (!explanation) {
            generateExplanation(language);
        }
    };

    const handleLanguageChange = (lang: 'en' | 'ur' | 'hi') => {
        if (lang === language) return;
        setLanguage(lang);
        generateExplanation(lang);
    };

    return (
        <div className="w-full mt-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleExplain}
                className={cn(
                    "w-full flex items-center justify-between group border border-dashed border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all",
                    isOpen ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/30" : ""
                )}
            >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Explain with AI</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                )}
            </Button>

            {isOpen && (
                <div className="mt-4 p-6 bg-orange-50/30 dark:bg-zinc-900/50 rounded-xl border border-orange-100/50 dark:border-white/5 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shrink-0">
                            <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                                    <Sparkles className="w-3 h-3" /> AI Exploration
                                </h4>
                                <div className="flex items-center gap-1 bg-white dark:bg-black/20 p-1 rounded-lg border border-slate-200 dark:border-white/10">
                                    {(['en', 'ur', 'hi'] as const).map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => handleLanguageChange(lang)}
                                            className={cn(
                                                "px-2.5 py-1 rounded-md text-[10px] font-bold transition-all uppercase",
                                                language === lang
                                                    ? "bg-emerald-500 text-white shadow-sm"
                                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                                            )}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="space-y-4 max-w-2xl">
                                    <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
                                    <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-full animate-pulse" />
                                    <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse" />
                                    <div className="space-y-2 pt-4">
                                        <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
                                        <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
                                    </div>
                                </div>
                            ) : explanation ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    {/* Bismillah */}
                                    <div className="font-arabic text-xl text-center mb-6 text-slate-800 dark:text-slate-200" dir="rtl">
                                        {explanation.bismillah}
                                    </div>

                                    {/* Explanation */}
                                    <div className="mb-6">
                                        <h5 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">
                                            {explanation.title}
                                        </h5>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {explanation.summary}
                                        </p>
                                    </div>

                                    {/* Context */}
                                    <div className="mb-6">
                                        <h5 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">
                                            {explanation.context.title}
                                        </h5>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {explanation.context.content}
                                        </p>
                                    </div>

                                    {/* Key Lessons */}
                                    <div className="mb-6">
                                        <h5 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3 uppercase tracking-wide">
                                            Key Lessons:
                                        </h5>
                                        <ul className="list-none space-y-3 pl-0">
                                            {explanation.lessons.map((lesson, idx) => (
                                                <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-500 shrink-0">
                                                        {idx + 1}.
                                                    </span>
                                                    <span>
                                                        <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                                                            {lesson.title}
                                                        </strong>
                                                        {lesson.content}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Principles */}
                                    <div className="mb-6">
                                        <h5 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">
                                            {explanation.principles.title}
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300 custom-bullet">
                                            {explanation.principles.items.map((item, idx) => (
                                                <li key={idx} className="pl-1 marker:text-emerald-500">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Daily Life */}
                                    <div className="mb-8">
                                        <h5 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">
                                            {explanation.dailyLife.title}
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                                            {explanation.dailyLife.items.map((item, idx) => (
                                                <li key={idx} className="pl-1 marker:text-emerald-500">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Conclusion & Dua */}
                                    <div className="pt-6 border-t border-slate-200 dark:border-white/5 text-sm text-slate-600 dark:text-slate-400 italic">
                                        <p className="mb-4">{explanation.conclusion}</p>
                                        <p className="font-medium text-emerald-700 dark:text-emerald-400">
                                            {explanation.dua}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-50 dark:bg-white/5 p-2 rounded">
                                        <BookOpen className="w-3 h-3" />
                                        <span>AI generated content needs verification against authentic sources.</span>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
