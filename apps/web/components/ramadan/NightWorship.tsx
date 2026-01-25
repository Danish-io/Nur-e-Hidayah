"use client";

import { Moon, Star, Plus, Minus, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function NightWorship() {
    const [rakaat, setRakaat] = useState(0);
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        setIsNight(hour >= 19 || hour < 5);

        const saved = localStorage.getItem("ramadan-taraweeh");
        if (saved) setRakaat(parseInt(saved));
    }, []);

    const updateRakaat = (val: number) => {
        const newVal = Math.max(0, val);
        setRakaat(newVal);
        localStorage.setItem("ramadan-taraweeh", newVal.toString());
    };

    return (
        <div className={cn(
            "rounded-3xl p-6 shadow-lg transition-all relative overflow-hidden group",
            "bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white"
        )}>
            {/* Night Sky Animation - Slow Stars */}
            <div className="absolute inset-0 pointer-events-none">
                <Star className="absolute top-4 right-8 text-yellow-200 w-1 h-1 animate-twinkle-slow" style={{ animationDelay: '0s' }} />
                <Star className="absolute top-12 left-12 text-yellow-100 w-1 h-1 animate-twinkle-slow" style={{ animationDelay: '2s' }} />
                <Star className="absolute bottom-8 right-24 text-yellow-300/60 w-2 h-2 animate-twinkle-slow" style={{ animationDelay: '4s' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/50" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-500">
                        {/* Crescent Moon Pulse */}
                        <Moon className="w-5 h-5 text-indigo-200 animate-pulse-slow" />
                    </div>
                    <h3 className="font-bold text-lg text-indigo-50">Night Worship</h3>
                </div>

                {isNight ? (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-md border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-500/10 animate-pulse-slow" />

                            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 relative z-10">Taraweeh Counter</p>
                            <div className="flex items-center justify-between relative z-10">
                                <button
                                    onClick={() => updateRakaat(rakaat - 2)}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors element-hover"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <div className="text-center">
                                    <span key={rakaat} className="text-4xl font-mono font-bold animate-scale-in inline-block">{rakaat}</span>
                                    <span className="text-xs block text-indigo-300">Rakaats</span>
                                </div>
                                <button
                                    onClick={() => updateRakaat(rakaat + 2)}
                                    className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm italic text-indigo-200 mb-2 leading-relaxed opacity-80">
                                "Whoever stands (in prayer) in Ramadan out of faith and in hope of reward, his previous sins will be forgiven."
                            </p>
                            <p className="text-xs text-indigo-400 text-right">- Bukhari</p>
                        </div>
                    </div>
                ) : (
                    <div className="py-2">
                        <p className="text-indigo-200 text-sm mb-4 leading-relaxed opacity-80">
                            The night is for rest and intimate worship. Use this mode after Maghrib to track Taraweeh and find peace.
                        </p>
                        <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-emerald-300 transition-colors opacity-90 hover:opacity-100">
                            Prepare for Night <MoveRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
