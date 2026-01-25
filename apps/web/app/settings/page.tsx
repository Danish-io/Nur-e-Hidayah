"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Settings, Moon, Sun, Globe, Bell, Volume2, BookOpen, Clock,
    Palette, Type, Eye, Download, Trash2, RefreshCw, ChevronRight,
    Smartphone, Monitor, Languages, MapPin, Calculator, Compass,
    Heart, Shield, Info, Check, X
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useI18n, Language } from "@/lib/i18n";

// Setting Card Component
const SettingCard = ({
    icon: Icon,
    title,
    description,
    children,
    iconColor = "text-emerald-500"
}: {
    icon: any;
    title: string;
    description: string;
    children: React.ReactNode;
    iconColor?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-white/10 p-5 hover:shadow-lg transition-all duration-300"
    >
        <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 ${iconColor}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{description}</p>
                {children}
            </div>
        </div>
    </motion.div>
);

// Toggle Switch Component
const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (val: boolean) => void }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={cn(
            "relative w-12 h-6 rounded-full transition-colors duration-300",
            enabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
        )}
    >
        <div className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
            enabled ? "translate-x-7" : "translate-x-1"
        )} />
    </button>
);

// Select Dropdown Component
const Select = ({
    value,
    onChange,
    options
}: {
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[]
}) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
    >
        {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
);

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { t, language, setLanguage } = useI18n();
    const [mounted, setMounted] = useState(false);

    // Settings State
    const [settings, setSettings] = useState({
        // Appearance
        fontSize: "medium",
        arabicFontSize: "large",

        // Language & Region
        translationLanguage: "english",
        location: "auto",

        // Prayer Settings
        calculationMethod: "mwl",
        madhab: "shafi",

        // Notifications
        prayerReminders: true,
        adhanSound: true,
        dailyVerse: true,
        ramadanReminders: true,

        // Audio
        defaultReciter: "mishary",
        autoPlayNext: true,

        // Reading
        showTranslation: true,
        showTransliteration: false,
        tajweedHighlight: true,

        // Accessibility
        highContrast: false,
        reducedMotion: false,
    });

    useEffect(() => {
        setMounted(true);
        // Load settings from localStorage
        const saved = localStorage.getItem("nur-settings");
        if (saved) {
            setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
        }
    }, []);

    // Save settings to localStorage
    const updateSetting = (key: string, value: any) => {
        setSettings(prev => {
            const updated = { ...prev, [key]: value };
            localStorage.setItem("nur-settings", JSON.stringify(updated));
            return updated;
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Settings className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{t.settings.title}</h1>
                    <p className="text-slate-500 dark:text-slate-400">{t.settings.subtitle}</p>
                </motion.div>

                <div className="space-y-6">

                    {/* === APPEARANCE === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-purple-500" />
                            {t.settings.appearance}
                        </h2>

                        <SettingCard
                            icon={theme === "dark" ? Moon : Sun}
                            title={t.settings.theme}
                            description={t.settings.themeDesc}
                            iconColor="text-amber-500"
                        >
                            <div className="flex gap-2">
                                {[
                                    { value: "light", label: t.settings.light, icon: Sun },
                                    { value: "dark", label: t.settings.dark, icon: Moon },
                                    { value: "system", label: t.settings.system, icon: Monitor },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setTheme(opt.value)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                            theme === opt.value
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                                : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                                        )}
                                    >
                                        <opt.icon className="w-4 h-4" />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </SettingCard>

                        <SettingCard icon={Type} title={t.settings.textSize} description={t.settings.textSizeDesc} iconColor="text-blue-500">
                            <Select
                                value={settings.fontSize}
                                onChange={(val) => updateSetting("fontSize", val)}
                                options={[
                                    { value: "small", label: "Small" },
                                    { value: "medium", label: "Medium (Default)" },
                                    { value: "large", label: "Large" },
                                    { value: "xlarge", label: "Extra Large" },
                                ]}
                            />
                        </SettingCard>

                        <SettingCard icon={BookOpen} title={t.settings.arabicFontSize} description={t.settings.arabicFontSizeDesc} iconColor="text-emerald-500">
                            <Select
                                value={settings.arabicFontSize}
                                onChange={(val) => updateSetting("arabicFontSize", val)}
                                options={[
                                    { value: "medium", label: "Medium" },
                                    { value: "large", label: "Large (Default)" },
                                    { value: "xlarge", label: "Extra Large" },
                                    { value: "xxlarge", label: "Very Large" },
                                ]}
                            />
                        </SettingCard>
                    </div>

                    {/* === LANGUAGE & REGION === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-500" />
                            {t.settings.language}
                        </h2>

                        <SettingCard icon={Languages} title={t.settings.language} description={t.settings.languageDesc} iconColor="text-indigo-500">
                            <Select
                                value={language}
                                onChange={(val) => setLanguage(val as Language)}
                                options={[
                                    { value: "english", label: "English" },
                                    { value: "urdu", label: "اردو (Urdu)" },
                                    { value: "hindi", label: "हिंदी (Hindi)" },
                                    { value: "arabic", label: "العربية (Arabic)" },
                                ]}
                            />
                        </SettingCard>

                        <SettingCard icon={BookOpen} title={t.settings.translationLang} description={t.settings.translationLangDesc} iconColor="text-teal-500">
                            <Select
                                value={settings.translationLanguage}
                                onChange={(val) => updateSetting("translationLanguage", val)}
                                options={[
                                    { value: "english", label: "English (Sahih International)" },
                                    { value: "urdu", label: "Urdu (Fateh Muhammad Jalandhari)" },
                                    { value: "hindi", label: "Hindi" },
                                    { value: "indonesian", label: "Indonesian" },
                                ]}
                            />
                        </SettingCard>

                        <SettingCard icon={MapPin} title={t.settings.location} description={t.settings.locationDesc} iconColor="text-rose-500">
                            <Select
                                value={settings.location}
                                onChange={(val) => updateSetting("location", val)}
                                options={[
                                    { value: "auto", label: "Auto-detect (GPS)" },
                                    { value: "manual", label: "Set Manually" },
                                ]}
                            />
                        </SettingCard>
                    </div>

                    {/* === PRAYER SETTINGS === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-teal-500" />
                            {t.settings.prayerSettings}
                        </h2>

                        <SettingCard icon={Calculator} title={t.settings.calcMethod} description={t.settings.calcMethodDesc} iconColor="text-amber-500">
                            <Select
                                value={settings.calculationMethod}
                                onChange={(val) => updateSetting("calculationMethod", val)}
                                options={[
                                    { value: "mwl", label: "Muslim World League" },
                                    { value: "isna", label: "ISNA (North America)" },
                                    { value: "egypt", label: "Egyptian General Authority" },
                                    { value: "makkah", label: "Umm al-Qura (Makkah)" },
                                    { value: "karachi", label: "University of Karachi" },
                                    { value: "tehran", label: "Institute of Geophysics, Tehran" },
                                ]}
                            />
                        </SettingCard>

                        <SettingCard icon={Compass} title={t.settings.madhab} description={t.settings.madhabDesc} iconColor="text-purple-500">
                            <Select
                                value={settings.madhab}
                                onChange={(val) => updateSetting("madhab", val)}
                                options={[
                                    { value: "shafi", label: "Shafi'i, Maliki, Hanbali" },
                                    { value: "hanafi", label: "Hanafi" },
                                ]}
                            />
                        </SettingCard>
                    </div>

                    {/* === NOTIFICATIONS === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-rose-500" />
                            {t.settings.notifications}
                        </h2>

                        <SettingCard icon={Clock} title={t.settings.prayerReminders} description={t.settings.prayerRemindersDesc} iconColor="text-teal-500">
                            <Toggle enabled={settings.prayerReminders} onChange={(val) => updateSetting("prayerReminders", val)} />
                        </SettingCard>

                        <SettingCard icon={Volume2} title={t.settings.adhanSound} description={t.settings.adhanSoundDesc} iconColor="text-indigo-500">
                            <Toggle enabled={settings.adhanSound} onChange={(val) => updateSetting("adhanSound", val)} />
                        </SettingCard>

                        <SettingCard icon={BookOpen} title={t.settings.dailyVerse} description={t.settings.dailyVerseDesc} iconColor="text-emerald-500">
                            <Toggle enabled={settings.dailyVerse} onChange={(val) => updateSetting("dailyVerse", val)} />
                        </SettingCard>

                        <SettingCard icon={Moon} title={t.settings.ramadanReminders} description={t.settings.ramadanRemindersDesc} iconColor="text-purple-500">
                            <Toggle enabled={settings.ramadanReminders} onChange={(val) => updateSetting("ramadanReminders", val)} />
                        </SettingCard>
                    </div>

                    {/* === AUDIO === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-amber-500" />
                            {t.settings.audio}
                        </h2>

                        <SettingCard icon={Heart} title={t.settings.defaultReciter} description={t.settings.defaultReciterDesc} iconColor="text-rose-500">
                            <Select
                                value={settings.defaultReciter}
                                onChange={(val) => updateSetting("defaultReciter", val)}
                                options={[
                                    { value: "mishary", label: "Mishary Rashid Alafasy" },
                                    { value: "sudais", label: "Abdul Rahman Al-Sudais" },
                                    { value: "minshawi", label: "Mohamed Siddiq El-Minshawi" },
                                    { value: "husary", label: "Mahmoud Khalil Al-Husary" },
                                    { value: "ajmi", label: "Ahmed Al-Ajmi" },
                                ]}
                            />
                        </SettingCard>

                        <SettingCard icon={RefreshCw} title={t.settings.autoPlayNext} description={t.settings.autoPlayNextDesc} iconColor="text-blue-500">
                            <Toggle enabled={settings.autoPlayNext} onChange={(val) => updateSetting("autoPlayNext", val)} />
                        </SettingCard>
                    </div>

                    {/* === READING PREFERENCES === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-500" />
                            {t.settings.reading}
                        </h2>

                        <SettingCard icon={Languages} title={t.settings.showTranslation} description={t.settings.showTranslationDesc} iconColor="text-blue-500">
                            <Toggle enabled={settings.showTranslation} onChange={(val) => updateSetting("showTranslation", val)} />
                        </SettingCard>

                        <SettingCard icon={Type} title={t.settings.showTransliteration} description={t.settings.showTransliterationDesc} iconColor="text-purple-500">
                            <Toggle enabled={settings.showTransliteration} onChange={(val) => updateSetting("showTransliteration", val)} />
                        </SettingCard>

                        <SettingCard icon={Palette} title={t.settings.tajweed} description={t.settings.tajweedDesc} iconColor="text-rose-500">
                            <Toggle enabled={settings.tajweedHighlight} onChange={(val) => updateSetting("tajweedHighlight", val)} />
                        </SettingCard>
                    </div>

                    {/* === ACCESSIBILITY === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-cyan-500" />
                            {t.settings.accessibility}
                        </h2>

                        <SettingCard icon={Eye} title={t.settings.highContrast} description={t.settings.highContrastDesc} iconColor="text-slate-600">
                            <Toggle enabled={settings.highContrast} onChange={(val) => updateSetting("highContrast", val)} />
                        </SettingCard>

                        <SettingCard icon={RefreshCw} title={t.settings.reducedMotion} description={t.settings.reducedMotionDesc} iconColor="text-orange-500">
                            <Toggle enabled={settings.reducedMotion} onChange={(val) => updateSetting("reducedMotion", val)} />
                        </SettingCard>
                    </div>

                    {/* === DATA MANAGEMENT === */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-slate-500" />
                            {t.settings.data}
                        </h2>

                        <SettingCard icon={Download} title={t.settings.downloadOffline} description={t.settings.downloadOfflineDesc} iconColor="text-emerald-500">
                            <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                                {t.settings.download}
                            </button>
                        </SettingCard>

                        <SettingCard icon={Trash2} title={t.settings.clearCache} description={t.settings.clearCacheDesc} iconColor="text-red-500">
                            <button className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors border border-red-500/20">
                                {t.settings.clearCache}
                            </button>
                        </SettingCard>
                    </div>

                    {/* === APP INFO === */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center py-8 border-t border-slate-200 dark:border-zinc-800 mt-8"
                    >
                        <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-sm mb-2">
                            <Info className="w-4 h-4" />
                            {t.home.welcome}
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-600">{t.settings.version} 1.0.0 • {t.settings.madeWith}</p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
