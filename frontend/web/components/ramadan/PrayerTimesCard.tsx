"use client";

import { useRamadanTimes } from "@/hooks/useRamadanTimes";
import { cn } from "@/lib/utils";
import { Clock, Sunrise, Sunset, Moon } from "lucide-react";

export function PrayerTimesCard() {
    const { times, nextEvent, loading } = useRamadanTimes();

    if (loading) return <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-3xl animate-pulse" />;
    if (!times) return null;

    const prayers = [
        { name: "Fajr", time: times.Fajr, icon: Sunrise },
        { name: "Dhuhr", time: times.Dhuhr, icon: SunIcon },
        { name: "Asr", time: times.Asr, icon: SunIcon },
        { name: "Maghrib", time: times.Maghrib, icon: Sunset },
        { name: "Isha", time: times.Isha, icon: Moon },
    ];

    return (
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col h-full transition-all duration-500 hover:shadow-lg hover:border-emerald-500/20 group">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-500 animate-pulse-slow" />
                        Prayer Times
                    </h3>
                    <p className="text-sm text-slate-500">Makkah Time (Auto-detecting...)</p>
                </div>

                {nextEvent && (
                    <div className="text-right">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {nextEvent.name}
                        </div>
                        <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in inline-block relative">
                            {/* Subtle Glow Effect behind time */}
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />
                            <span className="relative z-10">{nextEvent.timeLeft}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {prayers.map((prayer, i) => {
                    return (
                        <div
                            key={prayer.name}
                            className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:scale-[1.02]"
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:text-emerald-600 transition-colors">
                                    <prayer.icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">{prayer.name}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{prayer.time}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SunIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}
