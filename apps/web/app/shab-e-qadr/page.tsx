"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, BookOpen, Copy, Share2, MoonStar, Sparkles, Star } from "lucide-react";
import { SHAB_E_QADR_DUAS, SHAB_E_QADR_NAMAZ, ShabEQadrDua, ShabEQadrNamaz } from "@/lib/data/shab-e-qadr";

// ─── Salah Guide Data ───────────────────────────────────────────────
const SALAH_GUIDE = [
    {
        id: 1,
        category: "Qiyam ul-Layl",
        title: "How to Pray Qiyam on Shab-e-Qadr",
        icon: "🌙",
        steps: [
            "Make a sincere Niyyah (intention) for Qiyam ul-Layl specifically for Laylat al-Qadr.",
            "Start with 2 Rakat Tahajjud as an opener.",
            "Recite long portions of the Quran slowly and with reflection.",
            "Pray 8–12 Rakat (2 at a time) throughout the night.",
            "End with 3 Rakat Witr before Fajr.",
        ],
        note: "The Prophet ﷺ used to pray all night on the last 10 nights of Ramadan. (Bukhari 2024)",
    },
    {
        id: 2,
        category: "Surahs to Recite",
        title: "Best Surahs for Shab-e-Qadr Prayer",
        icon: "📖",
        steps: [
            "Surah Al-Qadr (97) — Recite at least 7 times. Its reward is immense on this night.",
            "Surah Al-Ikhlas (112) — Recite 3 times in every Rakat (equals reciting the full Quran).",
            "Surah Al-Falaq (113) & Surah An-Nas (114) — Read for protection from evil.",
            "Surah Al-Mulk (67) — Protects from the punishment of the grave.",
            "Surah Al-Baqarah (2:255) — Ayat-ul-Kursi after every prayer.",
        ],
        note: "Whoever reads Surah Al-Ikhlas 3 times has read the equivalent of the entire Quran. (Bukhari 5015)",
    },
    {
        id: 3,
        category: "Tasbeeh in Salah",
        title: "Dhikr & Tasbeeh During Prayer",
        icon: "📿",
        steps: [
            "In Ruku: Say 'Subhana Rabbiyal Adheem' at least 3–7 times.",
            "In Sujood: Say 'Subhana Rabbiyal A'la' at least 3–7 times.",
            "Between two Sajdahs: Say 'Rabbighfir li' — 'O my Lord, forgive me'.",
            "After Salah: Say SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x), then the full Tahleel once.",
            "Recite Ayat-ul-Kursi (2:255) immediately after every Fardh Salah.",
        ],
        note: "Extended Sujood is one of the best forms of night worship. Increase it as much as possible.",
    },
    {
        id: 4,
        category: "Qunoot e Nazilah",
        title: "Dua Qunoot (Witr Prayer)",
        icon: "🤲",
        arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، إِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
        transliteration: "Allahumma ihdini fiman hadayt, wa 'afini fiman 'afayt, wa tawallani fiman tawallayt, wa barik li fima a'tayt, wa qini sharra ma qadayt, innaka taqdi wa la yuqda 'alayk, wa innahu la yadhillu man walayt, tabarakta Rabbana wa ta'alayt",
        translation: "O Allah, guide me along with those whom You have guided, grant me well-being along with those whom You have granted well-being, take me into Your care along with those whom You have taken into Your care, bless for me what You have given me, and protect me from the evil You have decreed. For indeed You decree, and none can decree over You. Surely, no one whom You have befriended is ever disgraced. You are blessed, our Lord, and Most High.",
        source: "Tirmidhi 464 — Recited in final Rakat (Witr) of night prayer",
        steps: [],
        note: "",
    },
    {
        id: 5,
        category: "Between Prayers",
        title: "What to Do Between Each Salah",
        icon: "⭐",
        steps: [
            "Make Istighfar: 'Astaghfirullah' 100 times — seeking forgiveness continuously.",
            "Recite the key Dua: 'Allahumma innaka afuwwun tuhibbul afwa fa'fu anni' repeatedly.",
            "Engage in Tilawah (Quranic recitation) between prayers.",
            "Perform Sajdah al-Shukr (prostration of gratitude) whenever you feel moved.",
            "Make personal Du'a in your own language — list your needs and desires from Allah.",
            "Avoid idle talk, social media, or food-related distractions.",
        ],
        note: "The best remembrance is La ilaha illallah. Fill every moment between prayers with it.",
    },
    {
        id: 6,
        category: "Khatam al-Quran",
        title: "Quran Recitation Schedule for the Night",
        icon: "📕",
        steps: [
            "After Isha: Recite Juz 28 (Surah Al-Mujadeela to Al-Tahrim).",
            "After Tarawih: Recite Juz 29 (Al-Mulk to Al-Mursalat).",
            "Tahajjud (midnight): Recite Juz 30 (Al-Naba to An-Nas) — the final Juz.",
            "Pre-Sehri (before Fajr): Complete with Surah Al-Qadr and Al-Baqarah's last 2 verses.",
            "Listen to Quran recitation if you become tired — the reward continues.",
        ],
        note: "Every letter recited carries 10 rewards — imagine the night of a thousand months!",
    },
];

type ActiveTab = "duas" | "namaz" | "salah";

export default function ShabEQadrPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("duas");

    const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; count: number }[] = [
        { id: "duas", label: "Recommended Duas", icon: <MoonStar className="w-4 h-4" />, count: SHAB_E_QADR_DUAS.length },
        { id: "namaz", label: "Nawafil Prayers", icon: <Sparkles className="w-4 h-4" />, count: SHAB_E_QADR_NAMAZ.length },
        { id: "salah", label: "Salah Guide", icon: <Star className="w-4 h-4" />, count: SALAH_GUIDE.length },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4 font-sans text-slate-800 dark:text-slate-100">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <header className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <MoonStar className="w-7 h-7 text-indigo-500" />
                        <h1 className="text-4xl font-bold text-slate-800 dark:text-gray-100 tracking-tight">Shab-e-Qadr</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 italic mb-4">
                        &ldquo;The Night of Decree is better than a thousand months.&rdquo; — Quran 97:3
                    </p>
                    <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full opacity-50"></div>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-10 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${activeTab === tab.id
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 -translate-y-0.5"
                                : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-zinc-800 hover:border-indigo-400"}`}
                        >
                            {tab.icon} {tab.label}
                            <span className={`ml-1 text-xs py-0.5 px-2 rounded-full font-bold ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-zinc-800 text-slate-500"}`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "duas" && (
                        <motion.div key="duas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-12">
                            {SHAB_E_QADR_DUAS.map((dua) => <DuaCard key={dua.id} dua={dua} />)}
                        </motion.div>
                    )}

                    {activeTab === "namaz" && (
                        <motion.div key="namaz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-12">
                            {SHAB_E_QADR_NAMAZ.map((namaz) => <NamazCard key={namaz.id} namaz={namaz} />)}
                        </motion.div>
                    )}

                    {activeTab === "salah" && (
                        <motion.div key="salah" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-12">
                            {SALAH_GUIDE.map((item) => <SalahCard key={item.id} item={item} />)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Dua Card ────────────────────────────────────────────────────────
function DuaCard({ dua }: { dua: ShabEQadrDua }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const copyToClipboard = () => navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`);

    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-50 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow pt-10 pb-6 px-6 md:px-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-50 dark:bg-zinc-900 border-2 border-amber-100 dark:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 font-bold shadow-sm z-10">
                {dua.id.replace(/\D/g, "")}
            </div>
            <div className="mb-8">
                <span className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-3">Shab-e-Qadr</span>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-gray-100">{dua.title}</h3>
                    <div className="flex space-x-2">
                        <button onClick={copyToClipboard} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-gray-50 dark:bg-zinc-800 rounded-lg" title="Copy"><Copy className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-gray-50 dark:bg-zinc-800 rounded-lg" title="Share"><Share2 className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
            <div className="relative bg-[#FFFCF7] dark:bg-black/20 rounded-xl p-8 md:p-12 mb-6 border border-amber-50/50 dark:border-white/5">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-br-lg"></div>
                <p className="text-center font-arabic text-3xl md:text-4xl leading-loose text-slate-800 dark:text-slate-100" dir="rtl">{dua.arabic}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => setShowTranslation(!showTranslation)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${showTranslation ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" : "bg-gray-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400"}`}>
                        <span>Translation</span>
                        {showTranslation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md">
                        <BookOpen className="w-4 h-4" /><span>Read Full</span>
                    </button>
                </div>
                <AnimatePresence>
                    {showTranslation && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden w-full text-center">
                            <div className="pt-2 pb-4 space-y-4 max-w-2xl mx-auto border-t border-gray-100 dark:border-zinc-800 mt-2">
                                <div><h4 className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wide mb-1">Transliteration</h4>
                                    <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">&ldquo;{dua.transliteration}&rdquo;</p></div>
                                <div><h4 className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wide mb-1">Meaning</h4>
                                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{dua.translation}</p></div>
                                <div className="pt-2"><span className="text-xs text-slate-400 bg-slate-50 dark:bg-zinc-800 px-3 py-1 rounded-full">Reference: {dua.source}</span></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ─── Nawafil Card ────────────────────────────────────────────────────
function NamazCard({ namaz }: { namaz: ShabEQadrNamaz }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-50 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow pt-10 pb-6 px-6 md:px-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-50 dark:bg-zinc-900 border-2 border-amber-100 dark:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 font-bold shadow-sm z-10">
                {namaz.id.replace(/\D/g, "")}
            </div>
            <div className="mb-6">
                <span className="inline-block bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-3">Nawafil</span>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-gray-100">{namaz.title}</h3>
                    <span className="text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full whitespace-nowrap">{namaz.rakats}</span>
                </div>
            </div>
            <div className="relative bg-[#FFFCF7] dark:bg-black/20 rounded-xl p-6 mb-6 border border-amber-50/50 dark:border-white/5">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-br-lg"></div>
                <div className="flex gap-3 items-start">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div><h4 className="text-amber-600 dark:text-amber-400 text-sm font-bold uppercase tracking-wide mb-1">Benefit</h4>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{namaz.benefit}</p></div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => setShowDetails(!showDetails)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${showDetails ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-gray-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400"}`}>
                        <span>Method Steps</span>{showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
                <AnimatePresence>
                    {showDetails && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden w-full">
                            <div className="pt-2 pb-4 max-w-2xl mx-auto border-t border-gray-100 dark:border-zinc-800 mt-2">
                                <h4 className="text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wide mb-3">Method</h4>
                                <ul className="space-y-3">
                                    {namaz.method.map((step, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-0.5">{idx + 1}</span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ─── Salah Guide Card ─────────────────────────────────────────────────
function SalahCard({ item }: { item: typeof SALAH_GUIDE[0] }) {
    const [showDetails, setShowDetails] = useState(false);
    const hasArabic = !!item.arabic;

    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-50 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow pt-10 pb-6 px-6 md:px-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-50 dark:bg-zinc-900 border-2 border-amber-100 dark:border-zinc-700 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm z-10">
                {item.icon}
            </div>
            <div className="mb-6">
                <span className="inline-block bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-3">{item.category}</span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-gray-100">{item.title}</h3>
            </div>

            {/* Arabic (if Qunoot) */}
            {hasArabic && (
                <div className="relative bg-[#FFFCF7] dark:bg-black/20 rounded-xl p-8 md:p-10 mb-6 border border-amber-50/50 dark:border-white/5">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-200 dark:border-amber-800/50 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-200 dark:border-amber-800/50 rounded-br-lg"></div>
                    <p className="text-center font-arabic text-2xl md:text-3xl leading-loose text-slate-800 dark:text-slate-100" dir="rtl">{item.arabic}</p>
                </div>
            )}

            {/* Steps or toggle */}
            {item.steps.length > 0 && (
                <div className="flex flex-col items-center">
                    <button onClick={() => setShowDetails(!showDetails)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium mb-4 transition-colors ${showDetails ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" : "bg-gray-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400"}`}>
                        <span>{showDetails ? "Hide Steps" : "View Steps"}</span>
                        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden w-full">
                                <ul className="space-y-3 pb-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                                    {item.steps.map((step, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold text-xs mt-0.5">{idx + 1}</span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Transliteration + Translation for Qunoot */}
            {hasArabic && (
                <div className="mt-4 space-y-3 border-t border-gray-100 dark:border-zinc-800 pt-4">
                    <div><h4 className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wide mb-1">Transliteration</h4>
                        <p className="text-slate-500 dark:text-slate-400 italic text-sm leading-relaxed">{item.transliteration}</p></div>
                    <div><h4 className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wide mb-1">Meaning</h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed">{item.translation}</p></div>
                    <span className="text-xs text-slate-400 bg-slate-50 dark:bg-zinc-800 px-3 py-1 rounded-full inline-block">{item.source}</span>
                </div>
            )}

            {/* Hadith Note */}
            {item.note && (
                <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-3 flex gap-3">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-200/90 italic leading-relaxed">{item.note}</p>
                </div>
            )}
        </motion.div>
    );
}
