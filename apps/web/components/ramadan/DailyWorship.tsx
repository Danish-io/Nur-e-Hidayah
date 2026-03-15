"use client";

import { useState, useEffect } from "react";
import { Check, Coffee, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DailyWorship() {
    const [status, setStatus] = useState<{ fasting: boolean, prayers: boolean[] }>({
        fasting: false,
        prayers: [false, false, false, false, false]
    });

    useEffect(() => {
        const saved = localStorage.getItem("ramadan-worship-tracker");
        if (saved) {
            const parsed = JSON.parse(saved);
            // TODO: Reset on new day logic similar to GentleState
            setStatus(parsed);
        }
    }, []);

    const togglePrayer = (index: number) => {
        const newPrayers = [...status.prayers];
        newPrayers[index] = !newPrayers[index];
        const newStatus = { ...status, prayers: newPrayers };
        setStatus(newStatus);
        localStorage.setItem("ramadan-worship-tracker", JSON.stringify(newStatus));
    };

    const toggleFasting = () => {
        const newStatus = { ...status, fasting: !status.fasting };
        setStatus(newStatus);
        localStorage.setItem("ramadan-worship-tracker", JSON.stringify(newStatus));
    };

    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    return (
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Moon className="w-5 h-5 text-emerald-500" />
                Daily Worship
            </h3>

            <div className="space-y-4">
                {/* Fasting Toggle */}
                <div
                    onClick={toggleFasting}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                        status.fasting
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500"
                            : "bg-slate-50 dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-full", status.fasting ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500")}>
                            <Coffee className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">Fasting Today</p>
                            <p className="text-xs text-slate-500">
                                {status.fasting ? "May Allah accept it." : "Intention is the first step."}
                            </p>
                        </div>
                    </div>
                    {status.fasting && <Check className="w-6 h-6 text-emerald-600" />}
                </div>

                {/* Prayer Grid */}
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-3">5 Daily Prayers</p>
                    <div className="grid grid-cols-5 gap-2">
                        {prayers.map((p, i) => (
                            <button
                                key={p}
                                onClick={() => togglePrayer(i)}
                                className={cn(
                                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all",
                                    status.prayers[i]
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : "bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <span className="text-xs font-bold uppercase">{p.substring(0, 1)}</span>
                                {status.prayers[i] && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-3 italic">
                        &quot;Every prayer counts. Tomorrow is another gift.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
