"use client";

import { RamadanHero } from "@/components/ramadan/RamadanHero";
import { PrayerTimesCard } from "@/components/ramadan/PrayerTimesCard";
import { DailyWorship } from "@/components/ramadan/DailyWorship";
import { NightWorship } from "@/components/ramadan/NightWorship";
import { EmotionalDuas } from "@/components/ramadan/EmotionalDuas";
import { ShabEQadr } from "@/components/ramadan/ShabEQadr";
import { QuranTracker } from "@/components/ramadan/QuranTracker";
import { useRamadanTimes } from "@/hooks/useRamadanTimes";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RamadanPage() {
    const { hijriDate, loading } = useRamadanTimes();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black pb-24">
            <div className="container mx-auto px-4 py-8 space-y-8">

                {/* Hero Section - The Gentle Guide */}
                <RamadanHero hijriDate={hijriDate} />

                {/* Core Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Column 1: Prayer Essentials */}
                    <div className="space-y-6">
                        <PrayerTimesCard />
                    </div>

                    {/* Column 2: Worship Tracker */}
                    <div className="space-y-6">
                        <DailyWorship />

                        {/* Quran Companion - Feature 2 */}
                        <QuranTracker />
                    </div>

                    {/* Column 3: Gentle Support & Night Mode */}
                    <div className="space-y-6">
                        {/* Feature 4: Night Worship Mode */}
                        <NightWorship />

                        {/* Feature 5: Emotional Duas */}
                        <EmotionalDuas />

                        {/* Feature 6: Shab-E-Qadr Guide */}
                        <ShabEQadr />
                    </div>
                </div>
            </div>
        </div>
    );
}
