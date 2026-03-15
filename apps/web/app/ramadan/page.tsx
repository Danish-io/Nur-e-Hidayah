"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Moon, Star, BookOpen, Clock, Heart, Shield, CheckCircle2, ChevronDown, 
    Check, Info, Sunrise, Sunset, Book, Sparkles
} from "lucide-react";
import { useRamadanTimes } from "@/hooks/useRamadanTimes";
import { cn } from "@/lib/utils";

// --- Data Structures ---

const CHECKLIST_ITEMS = [
    { id: "fajr", label: "Fajr Prayer", icon: Sunrise },
    { id: "dhuhr", label: "Dhuhr Prayer", icon: Clock },
    { id: "asr", label: "Asr Prayer", icon: Clock },
    { id: "maghrib", label: "Maghrib Prayer", icon: Sunset },
    { id: "isha", label: "Isha Prayer", icon: Moon },
    { id: "taraweeh", label: "Taraweeh Prayer", icon: Star },
    { id: "quran", label: "Quran Reading", icon: BookOpen, hasInput: true },
    { id: "morning_adhkar", label: "Morning Adhkar", icon: Sunrise },
    { id: "evening_adhkar", label: "Evening Adhkar", icon: Sunset },
    { id: "sadaqah", label: "Sadaqah (Charity)", icon: Heart },
    { id: "dua_iftar", label: "Dua Before Iftar", icon: Shield },
];

const ESSENTIAL_DUAS = [
    {
        id: "suhoor",
        title: "Suhoor Intention (Niyyah for Fasting)",
        arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
        translation: "I intend to keep the fast for tomorrow in the month of Ramadan.",
    },
    {
        id: "iftar",
        title: "Iftar Dua (Breaking the Fast)",
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
        translation: "The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.",
    },
    {
        id: "qadr",
        title: "Laylatul Qadr Dua",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        translation: "O Allah, You are forgiving and love forgiveness, so forgive me.",
    },
    {
        id: "taraweeh",
        title: "Dua After Taraweeh",
        arabic: "سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ",
        translation: "Glory be to the Owner of the Kingdom and the Dominion. Glory be to the Possessor of Majesty, Greatness, Awe, Power, Pride, and Might.",
    }
];

const RAMADAN_TIPS = [
    { title: "Wake Up for Suhoor", content: "Even a sip of water has barakah." },
    { title: "Set Quran Goals Early", content: "Consistency over quantity." },
    { title: "Make a Dua List", content: "Write down your deepest needs." },
    { title: "Protect Your Fast", content: "Avoid argumentative or negative behavior." },
    { title: "Give Daily Sadaqah", content: "Even a smile or dates count." },
    { title: "Don't Skip Taraweeh", content: "Even two rakahs are better than none." },
    { title: "Maximize the Last 10 Nights", content: "Seek Laylatul Qadr actively." },
    { title: "Stay Hydrated at Iftar", content: "Drink water slowly." },
    { title: "Maintain Good Sleep Habits", content: "Nap during the day if needed." },
    { title: "Connect with Community", content: "Attend the masjid when possible." },
];

const JUZ_PLANNER = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1} — Juz ${i + 1}`,
    subtitle: `Pages ${i * 20 + 1}-${(i + 1) * 20}`
}));

export default function RamadanPage() {
    const { times, nextEvent, hijriDate, locationName } = useRamadanTimes();
    const currentDay = 25; // Could be dynamic based on hijri date
    
    // State 
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [quranPages, setQuranPages] = useState<string>("0");
    const [expandedDua, setExpandedDua] = useState<string | null>("suhoor");
    const [expandedTip, setExpandedTip] = useState<number | null>(null);
    const [checkedPlanner, setCheckedPlanner] = useState<Record<number, boolean>>({});
    
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progressPercent = Math.round((currentDay / 30) * 100);

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const togglePlanner = (day: number) => {
        setCheckedPlanner(prev => ({ ...prev, [day]: !prev[day] }));
    };

    return (
        <div className="min-h-screen bg-[#111111] text-slate-300 pb-24 font-sans select-none">
            
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                
                {/* 1. Header Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Moon className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Ramadan Guide</h1>
                            <p className="text-sm text-slate-400">Your companion for a blessed Ramadan 2026</p>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden shadow-xl">
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500 opacity-[0.03] blur-3xl pointer-events-none" />
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold tracking-widest rounded-full uppercase mb-4 shadow-[0_0_10px_rgba(245,158,11,0.2)] border border-amber-500/30">
                                Ramadan 2026
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Day {currentDay} of Ramadan</h2>
                            <p className="text-amber-500/80 font-medium mb-8">
                                {30 - currentDay} days remaining • Make every moment count
                            </p>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Progress</span>
                                    <span>{progressPercent}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercent}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    />
                                </div>
                                <div className="flex justify-between w-full mt-2">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div key={i} className={cn("h-1 w-1 rounded-full", i < currentDay ? "bg-amber-500/50" : "bg-[#2A2A2A]")} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 2. Suhoor & Iftar Timer */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-lg font-bold text-white">Suhoor & Iftar Timer</h2>
                    </div>
                    <p className="text-sm text-slate-400 text-sm pl-8 -mt-2">{locationName}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#1C1C1C] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center gap-2">
                            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Stop Eating</span>
                            <span className="text-3xl font-bold text-emerald-400">{times ? times.Imsak || times.Fajr : "05:28"}</span>
                            <span className="text-xs text-slate-600">Imsak</span>
                        </div>
                        <div className="bg-[#1C1C1C] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center gap-2">
                            <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Suhoor Ends</span>
                            <span className="text-3xl font-bold text-white">{times?.Fajr || "05:38"}</span>
                            <span className="text-xs text-slate-600">Fajr Adhan</span>
                        </div>
                        <div className="bg-[#1C1C1C] rounded-xl p-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
                            <span className="text-xs text-amber-500/80 font-bold tracking-widest uppercase">Iftar Time</span>
                            <span className="text-3xl font-bold text-amber-400">{times?.Maghrib || "18:40"}</span>
                            <span className="text-xs text-slate-600">Maghrib Adhan</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-6">
                        <span className="text-sm text-slate-400 mb-2">Time until {nextEvent?.type === 'iftar' ? 'Iftar' : 'Suhoor'}</span>
                        <div className="flex items-center justify-center gap-4 text-3xl font-bold text-amber-500 mb-2">
                            <span>{nextEvent?.timeLeft?.split(":")[0] || "00"}</span> <span className="text-slate-600 text-lg">HRS</span>
                            <span>{nextEvent?.timeLeft?.split(":")[1] || "00"}</span> <span className="text-slate-600 text-lg">MIN</span>
                            <span>{nextEvent?.timeLeft?.split(":")[2] || "00"}</span> <span className="text-slate-600 text-lg">SEC</span>
                        </div>
                        <span className="text-sm text-slate-400">You are currently {nextEvent?.type === 'iftar' ? 'fasting. Stay patient!' : 'not fasting. Eat well!'}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-800 to-indigo-300" />
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-300">Waning Crescent</span>
                            <span className="text-[10px] text-slate-500">Current lunar phase</span>
                        </div>
                    </div>
                </div>

                {/* Fasting Tracker Grid */}
                <div className="space-y-4 pt-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-bold text-white">Fasting Tracker</span>
                        <span className="text-xs text-slate-500">{currentDay}/30 days fasted</span>
                    </div>
                    <div className="grid grid-cols-7 sm:grid-cols-10 gap-2">
                        {Array.from({ length: 30 }).map((_, i) => {
                            const day = i + 1;
                            const isPast = day < currentDay;
                            const isCurrent = day === currentDay;
                            return (
                                <div 
                                    key={day} 
                                    className={cn(
                                        "aspect-[2/1] rounded flex items-center justify-center text-xs font-medium border transition-colors",
                                        isCurrent ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : 
                                        isPast ? "bg-[#1C1C1C] border-white/5 text-slate-500" : "bg-transparent border-white/5 text-slate-700"
                                    )}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 3. Daily Checklist */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-white">Daily Checklist</h2>
                    </div>
                    
                    <div className="bg-[#1C1C1C] rounded-full px-4 py-1 inline-flex items-center gap-2 mb-2 border border-white/5">
                        <span className="text-xs text-slate-500">Day</span>
                        <span className="text-sm text-white">Day {currentDay} (Today)</span>
                    </div>

                    <div className="flex justify-end text-xs text-amber-500 font-bold pr-2">{checkedCount}/11</div>

                    <div className="space-y-2">
                        {CHECKLIST_ITEMS.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => toggleCheck(item.id)}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                                    checkedItems[item.id] 
                                        ? "bg-emerald-500/10 border-emerald-500/30" 
                                        : "bg-[#1C1C1C] border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                                        checkedItems[item.id] ? "bg-emerald-500 border-emerald-500 text-[#111]" : "border-slate-600 group-hover:border-slate-400"
                                    )}>
                                        {checkedItems[item.id] && <Check className="w-3 h-3" />}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("w-4 h-4", checkedItems[item.id] ? "text-emerald-500" : "text-slate-500")} />
                                        <span className={cn(
                                            "text-sm font-medium transition-colors",
                                            checkedItems[item.id] ? "text-emerald-400" : "text-slate-300"
                                        )}>
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                                {item.hasInput && (
                                    <div 
                                        className="flex items-center gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input 
                                            type="number" 
                                            value={quranPages}
                                            onChange={(e) => setQuranPages(e.target.value)}
                                            className="w-16 bg-[#111111] border border-white/10 rounded-md px-2 py-1 text-sm text-center text-white focus:outline-none focus:border-amber-500"
                                        />
                                        <span className="text-xs text-slate-500">pages</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 4. Essential Ramadan Duas */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-white">Essential Ramadan Duas</h2>
                    </div>

                    <div className="space-y-3">
                        {ESSENTIAL_DUAS.map((dua) => (
                            <div key={dua.id} className="bg-[#1C1C1C] rounded-xl border border-white/5 overflow-hidden">
                                <AnimatePresence initial={false}>
                                    {expandedDua === dua.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-b border-white/5"
                                        >
                                            <div className="p-8 flex items-center justify-center min-h-[120px]">
                                                <p className="font-arabic text-3xl leading-loose text-white text-center" dir="rtl">
                                                    {dua.arabic}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={() => setExpandedDua(expandedDua === dua.id ? null : dua.id)}
                                    className="w-full flex items-center justify-between p-4 bg-[#1C1C1C] hover:bg-[#222] transition-colors"
                                >
                                    <span className="text-sm font-medium text-slate-300">{dua.title}</span>
                                    <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform", expandedDua === dua.id && "rotate-180")} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 5. 10 Ramadan Tips */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <Info className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-lg font-bold text-white">10 Ramadan Tips</h2>
                    </div>

                    <div className="space-y-2">
                        {RAMADAN_TIPS.map((tip, idx) => (
                            <div key={idx} className="bg-[#1C1C1C] rounded-lg border border-white/5 overflow-hidden">
                                <button
                                    onClick={() => setExpandedTip(expandedTip === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-[#222] transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center">
                                            {idx + 1}
                                        </span>
                                        <span className="text-sm font-medium text-slate-300">{tip.title}</span>
                                    </div>
                                    <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform", expandedTip === idx && "rotate-180")} />
                                </button>
                                <AnimatePresence>
                                    {expandedTip === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            <div className="px-14 pb-4 pt-0 text-sm text-slate-400">
                                                {tip.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 6. Last 10 Nights */}
                <div className="space-y-4">
                    <div className="flex flex-col mb-6">
                        <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                            <h2 className="text-lg font-bold text-white">Last 10 Nights</h2>
                        </div>
                        <span className="text-xs text-slate-500 ml-8">Track your Qiyam al-Layl • 0/10 nights</span>
                    </div>

                    <p className="text-xs text-amber-500/70 mb-4 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
                        The Prophet ﷺ said: &quot;Whoever stands in prayer during the Night of Qadr with faith and hope of reward, all their past sins will be forgiven.&quot; (Bukhari & Muslim). ★ Odd nights are highlighted — Laylatul Qadr is most likely on one of them.
                    </p>

                    <div className="grid grid-cols-5 gap-3">
                        {Array.from({ length: 10 }).map((_, i) => {
                            const night = 21 + i;
                            const isOdd = night % 2 !== 0;
                            return (
                                <div key={night} className={cn(
                                    "aspect-video rounded-lg border flex flex-col items-center justify-center relative transition-colors cursor-pointer hover:border-amber-500/50",
                                    isOdd ? "border-amber-500/30 bg-amber-500/5 shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]" : "border-white/5 bg-[#1C1C1C]"
                                )}>
                                    {isOdd && <Star className="absolute top-1 right-1 w-3 h-3 text-amber-500 fill-amber-500" />}
                                    <span className={cn("text-base font-bold", isOdd ? "text-amber-400" : "text-slate-300")}>{night}</span>
                                    <span className="text-[9px] text-slate-500 uppercase">Night</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                    <div className="px-4 text-white/20 text-xs shrink-0">☾</div>
                    <div className="h-px bg-white/5 w-full max-w-[40%]" />
                </div>

                {/* 7. Quran Completion Planner */}
                <div className="space-y-4">
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3">
                            <Book className="w-5 h-5 text-emerald-500" />
                            <h2 className="text-lg font-bold text-white">Quran Completion Planner</h2>
                        </div>
                        <span className="text-xs text-slate-500 ml-8">~20 pages/day • 1 Juz per day • 0/30 completed</span>
                    </div>

                    <div className="flex justify-between text-xs text-emerald-500 font-bold mb-2">
                        <span>{Object.values(checkedPlanner).filter(Boolean).length}/604 pages read</span>
                        <span>{Math.round((Object.values(checkedPlanner).filter(Boolean).length / 30) * 100)}%</span>
                    </div>

                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {JUZ_PLANNER.map((juz) => (
                            <div 
                                key={juz.day}
                                onClick={() => togglePlanner(juz.day)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group",
                                    checkedPlanner[juz.day]
                                        ? "bg-emerald-500/10 border-emerald-500/30" 
                                        : "bg-[#1C1C1C] border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0",
                                    checkedPlanner[juz.day] ? "bg-emerald-500 border-emerald-500 text-[#111]" : "border-slate-600 group-hover:border-slate-400"
                                )}>
                                    {checkedPlanner[juz.day] && <Check className="w-3 h-3" />}
                                </div>
                                <div>
                                    <h4 className={cn("text-sm font-bold", checkedPlanner[juz.day] ? "text-emerald-400" : "text-slate-300")}>
                                        {juz.title}
                                    </h4>
                                    <p className="text-xs text-slate-500">{juz.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="pt-12 pb-8 flex flex-col items-center justify-center">
                    <p className="text-xs text-amber-500/60 font-medium mb-1">May Allah accept your fasting, prayers, and good deeds.</p>
                    <p className="text-xs text-amber-500/40 font-arabic">رمضان كريم — Ramadan Kareem</p>
                </div>

            </div>
        </div>
    );
}


