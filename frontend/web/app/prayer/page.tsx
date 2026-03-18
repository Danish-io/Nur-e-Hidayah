"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Clock, MapPin, Sun, Sunrise, Sunset, Moon, CloudSun,
    Bell, BellOff, Volume2, VolumeX, Settings, RefreshCw,
    ChevronRight, Calendar, Compass, Check, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

// Prayer time interface
interface PrayerTimes {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

// Prayer card component
const PrayerCard = ({
    name,
    time,
    icon: Icon,
    isNext,
    isPast,
    iconColor
}: {
    name: string;
    time: string;
    icon: any;
    isNext: boolean;
    isPast: boolean;
    iconColor: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
            "relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
            isNext
                ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                : isPast
                    ? "bg-slate-100/50 dark:bg-zinc-900/30 border-slate-200/50 dark:border-white/5 opacity-60"
                    : "bg-white/60 dark:bg-zinc-900/50 border-slate-200/50 dark:border-white/10 hover:shadow-md"
        )}
    >
        {isNext && (
            <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                NEXT
            </div>
        )}
        <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            isNext ? "bg-emerald-500/20" : isPast ? "bg-slate-200 dark:bg-zinc-800" : "bg-slate-100 dark:bg-zinc-800",
            iconColor
        )}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
            <h3 className={cn(
                "font-semibold",
                isNext ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-white"
            )}>
                {name}
            </h3>
            {isPast && <p className="text-xs text-slate-400">Completed</p>}
        </div>
        <div className={cn(
            "text-xl font-bold tabular-nums",
            isNext ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"
        )}>
            {time}
        </div>
    </motion.div>
);

export default function PrayerPage() {
    const { t } = useI18n();
    const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [adhanEnabled, setAdhanEnabled] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch prayer times
    useEffect(() => {
        const fetchPrayerTimes = async () => {
            setLoading(true);
            setError(null);

            try {
                // Get user location
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000
                    });
                });

                const { latitude, longitude } = position.coords;

                // Get city name from coordinates
                const geoResponse = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const geoData = await geoResponse.json();
                setLocation({
                    city: geoData.city || geoData.locality || "Unknown",
                    country: geoData.countryName || "Unknown"
                });

                // Format date for API
                const dateStr = selectedDate.toISOString().split('T')[0];

                // Fetch prayer times from Aladhan API
                const response = await fetch(
                    `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=2`
                );
                const data = await response.json();

                if (data.code === 200) {
                    const timings = data.data.timings;
                    setPrayerTimes({
                        fajr: formatTime(timings.Fajr),
                        sunrise: formatTime(timings.Sunrise),
                        dhuhr: formatTime(timings.Dhuhr),
                        asr: formatTime(timings.Asr),
                        maghrib: formatTime(timings.Maghrib),
                        isha: formatTime(timings.Isha),
                    });
                } else {
                    throw new Error("Failed to fetch prayer times");
                }
            } catch (err: any) {
                console.error("Error fetching prayer times:", err);
                setError(err.message || "Failed to get prayer times. Please enable location access.");

                // Set default times for demo
                setPrayerTimes({
                    fajr: "05:30 AM",
                    sunrise: "06:45 AM",
                    dhuhr: "12:30 PM",
                    asr: "03:45 PM",
                    maghrib: "06:15 PM",
                    isha: "07:45 PM",
                });
                setLocation({ city: "Demo", country: "Location" });
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, [selectedDate]);

    // Calculate next prayer
    useEffect(() => {
        if (!prayerTimes) return;

        const prayers = [
            { name: t.prayer.fajr, time: prayerTimes.fajr },
            { name: t.prayer.sunrise, time: prayerTimes.sunrise },
            { name: t.prayer.dhuhr, time: prayerTimes.dhuhr },
            { name: t.prayer.asr, time: prayerTimes.asr },
            { name: t.prayer.maghrib, time: prayerTimes.maghrib },
            { name: t.prayer.isha, time: prayerTimes.isha },
        ];

        const now = currentTime;

        for (const prayer of prayers) {
            const prayerTime = parseTime(prayer.time);
            if (prayerTime > now) {
                const diff = prayerTime.getTime() - now.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setNextPrayer({
                    name: prayer.name,
                    time: prayer.time,
                    remaining: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                });
                return;
            }
        }

        // If all prayers passed, next is Fajr tomorrow
        setNextPrayer({
            name: t.prayer.fajr,
            time: prayerTimes.fajr,
            remaining: "Tomorrow"
        });
    }, [currentTime, prayerTimes, t]);

    // Helper functions
    const formatTime = (time24: string): string => {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const parseTime = (time12: string): Date => {
        const [timePart, period] = time12.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const isPrayerPast = (time: string): boolean => {
        return parseTime(time) < currentTime;
    };

    const isNextPrayer = (name: string): boolean => {
        return nextPrayer?.name === name;
    };

    // Prayer data with icons
    const prayerData = prayerTimes ? [
        { name: t.prayer.fajr, time: prayerTimes.fajr, icon: Moon, color: "text-indigo-500" },
        { name: t.prayer.sunrise, time: prayerTimes.sunrise, icon: Sunrise, color: "text-amber-500" },
        { name: t.prayer.dhuhr, time: prayerTimes.dhuhr, icon: Sun, color: "text-yellow-500" },
        { name: t.prayer.asr, time: prayerTimes.asr, icon: CloudSun, color: "text-orange-500" },
        { name: t.prayer.maghrib, time: prayerTimes.maghrib, icon: Sunset, color: "text-rose-500" },
        { name: t.prayer.isha, time: prayerTimes.isha, icon: Moon, color: "text-purple-500" },
    ] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 p-4 md:p-8">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{t.prayer.title}</h1>

                    {/* Location */}
                    {location && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{location.city}, {location.country}</span>
                            <button
                                onClick={() => window.location.reload()}
                                className="ml-2 p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                title="Refresh location"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Next Prayer Countdown */}
                {nextPrayer && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30"
                    >
                        <div className="text-center">
                            <p className="text-emerald-100 text-sm mb-1">{t.prayer.nextPrayer}</p>
                            <h2 className="text-2xl font-bold mb-3">{nextPrayer.name}</h2>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-emerald-200" />
                                <span className="text-lg">{nextPrayer.time}</span>
                            </div>
                            <div className="mt-4 py-3 px-6 bg-white/20 backdrop-blur-sm rounded-2xl inline-block">
                                <p className="text-xs text-emerald-100 mb-1">{t.prayer.timeRemaining}</p>
                                <p className="text-3xl font-bold font-mono tracking-wider">{nextPrayer.remaining}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Date Selector */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between mb-6 p-4 bg-white/60 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/50 dark:border-white/10"
                >
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                            <p className="font-semibold text-slate-800 dark:text-white">
                                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white text-sm"
                    />
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">{t.common.loading}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-amber-700 dark:text-amber-400 font-medium">Location Notice</p>
                            <p className="text-sm text-amber-600 dark:text-amber-500">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Prayer Times Grid */}
                {!loading && prayerTimes && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3 mb-8"
                    >
                        {prayerData.map((prayer, index) => (
                            <motion.div
                                key={prayer.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PrayerCard
                                    name={prayer.name}
                                    time={prayer.time}
                                    icon={prayer.icon}
                                    iconColor={prayer.color}
                                    isNext={isNextPrayer(prayer.name)}
                                    isPast={isPrayerPast(prayer.time) && !isNextPrayer(prayer.name)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Quick Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-5 bg-white/60 dark:bg-zinc-900/50 rounded-3xl border border-slate-200/50 dark:border-white/10"
                >
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-slate-500" />
                        Quick Settings
                    </h3>

                    <div className="space-y-4">
                        {/* Notifications Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {notificationsEnabled ? (
                                    <Bell className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <BellOff className="w-5 h-5 text-slate-400" />
                                )}
                                <div>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">Prayer Notifications</p>
                                    <p className="text-xs text-slate-500">Get notified before each prayer</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                className={cn(
                                    "relative w-12 h-6 rounded-full transition-colors duration-300",
                                    notificationsEnabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    notificationsEnabled ? "translate-x-7" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        {/* Adhan Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {adhanEnabled ? (
                                    <Volume2 className="w-5 h-5 text-indigo-500" />
                                ) : (
                                    <VolumeX className="w-5 h-5 text-slate-400" />
                                )}
                                <div>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">Adhan Sound</p>
                                    <p className="text-xs text-slate-500">Play Adhan at prayer times</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setAdhanEnabled(!adhanEnabled)}
                                className={cn(
                                    "relative w-12 h-6 rounded-full transition-colors duration-300",
                                    adhanEnabled ? "bg-indigo-500" : "bg-slate-300 dark:bg-zinc-700"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    adhanEnabled ? "translate-x-7" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        {/* Qibla Direction Link */}
                        <a
                            href="/qibla"
                            className="flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Compass className="w-5 h-5 text-rose-500" />
                                <div>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">Qibla Direction</p>
                                    <p className="text-xs text-slate-500">Find the direction to Makkah</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </a>
                    </div>
                </motion.div>

                {/* Hijri Date Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                    <p>Prayer times calculated using Muslim World League method</p>
                </motion.div>

            </div>
        </div>
    );
}
