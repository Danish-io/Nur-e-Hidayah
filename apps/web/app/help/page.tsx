"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, Moon, Radio, Sparkles, Clock, Compass,
    HandHeart, BookText, Bookmark, Settings, HelpCircle,
    ChevronDown, Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Help() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openSection, setOpenSection] = useState<string | null>("Quran");

    const guides = [
        {
            id: "Quran",
            title: "Quran Reader",
            icon: BookOpen,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            content: [
                {
                    subtitle: "Reading Modes",
                    text: "Toggle between 'Mushaf Mode' (page view) and 'List Mode' (verse view) using the icons in the top right. Mushaf mode mimics the physical book."
                },
                {
                    subtitle: "Translations & Tafseer",
                    text: "Click on any verse to open the context menu. Select 'Tafseer' to read commentary from scholars like Ibn Kathir. Enable word-by-word translation in Settings."
                },
                {
                    subtitle: "Audio Playback",
                    text: "Press the play button on any verse or at the bottom of the screen to start recitation. You can choose from over 20+ reciters in the Audio Settings."
                }
            ]
        },
        {
            id: "Ramadan",
            title: "Ramadan Tracker",
            icon: Moon,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            content: [
                {
                    subtitle: "Fasting Timer",
                    text: "The dashboard shows a countdown to either Suhoor (start of fast) or Iftar (end of fast) based on your location."
                },
                {
                    subtitle: "Logging Progress",
                    text: "Use the check-ins to log your daily Fasting, Prayers, and Quran reading. This builds your 'Spirit Streak' visible on the Profile."
                },
                {
                    subtitle: "Goals",
                    text: "Set a Quran completion goal (e.g. 'Finish in 30 days') and the app will calculate how many pages you need to read daily."
                }
            ]
        },
        {
            id: "Radio",
            title: "Quran Radio",
            icon: Radio,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            content: [
                {
                    subtitle: "Live Stations",
                    text: "Tune in to 24/7 distinct curated stations. 'Calm Recitation' focuses on soothing voices, while 'Tajweed' focuses on perfect pronunciation."
                },
                {
                    subtitle: "Background Play",
                    text: "Radio continues playing even if you navigate to other pages. Use the global player bar at the bottom to pause or change volume."
                }
            ]
        },
        {
            id: "AI Search",
            title: "AI Companion",
            icon: Sparkles,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            content: [
                {
                    subtitle: "Natural Questions",
                    text: "Ask questions like 'What does the Quran say about anxiety?' or 'Story of Prophet Yusuf' to get summarized answers with citations."
                },
                {
                    subtitle: "Contextual Insight",
                    text: "The AI analyzes verses to provide thematic connections. Always verify critical rulings with a qualified scholar."
                }
            ]
        },
        {
            id: "Prayer",
            title: "Prayer Times",
            icon: Clock,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
            content: [
                {
                    subtitle: "Auto-Detection",
                    text: "The app detects your location automatically. If times seem off, go to Settings > Prayer Calculation Method and adjust the authority (e.g. ISNA vs MWL)."
                },
                {
                    subtitle: "Notifications",
                    text: "Enable notifications to get Adhan alerts. You can customize which prayers trigger a sound."
                }
            ]
        },
        {
            id: "Qibla",
            title: "Qibla Compass",
            icon: Compass,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            content: [
                {
                    subtitle: "Calibration",
                    text: "For best results, move your phone in a figure-8 motion before using. Ensure GPS is enabled."
                },
                {
                    subtitle: "AR View",
                    text: "Switch to Camera mode to see the Qibla direction overlaid on the real world."
                }
            ]
        },
        {
            id: "Duas",
            title: "Duas & Adhkar",
            icon: HandHeart,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            content: [
                {
                    subtitle: "Emotional Categories",
                    text: "Browse Duas based on how you feel (Happy, Sad, Anxious, Grateful). Each Dua has translation and audio."
                },
                {
                    subtitle: "Morning/Evening Adhkar",
                    text: "Follow the Sunnah protection adhkar. The app tracks your streak for consistency."
                }
            ]
        },
        {
            id: "Hadith",
            title: "Hadith Collection",
            icon: BookText,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            content: [
                {
                    subtitle: "Browse Collections",
                    text: "Access authentic books like Sahih Bukhari and Sahih Muslim. Search for topics within specific books."
                }
            ]
        },
        {
            id: "Bookmarks",
            title: "Bookmarks",
            icon: Bookmark,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            content: [
                {
                    subtitle: "Saving Verses",
                    text: "Tap the bookmark icon on any verse card. You can organize bookmarks into custom folders (e.g. 'For Memorization')."
                }
            ]
        },
        {
            id: "Settings",
            title: "Settings",
            icon: Settings,
            color: "text-slate-500",
            bg: "bg-slate-500/10",
            content: [
                {
                    subtitle: "Theme",
                    text: "Switch between Light, Dark, or System theme. 'Sepia' mode is available for easier reading at night."
                },
                {
                    subtitle: "Language",
                    text: "Change the app interface language and the Quran translation language independently."
                }
            ]
        }
    ];

    const filteredGuides = guides.filter(g =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.content.some(c => c.text.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black/20 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-white/5 pt-24 pb-12 px-4 shadow-sm">
                <div className="container max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mb-6">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
                        Explore guides and tutorials to make the most of your spiritual journey with Nur-e-Hidayah.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for features (e.g. 'Fasting', 'Audio')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Guides Grid */}
            <div className="container max-w-3xl mx-auto px-4 py-12">
                <div className="space-y-4">
                    {filteredGuides.length > 0 ? (
                        filteredGuides.map((guide) => (
                            <motion.div
                                key={guide.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenSection(openSection === guide.id ? null : guide.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${guide.bg} ${guide.color}`}>
                                            <guide.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                            {guide.title}
                                        </span>
                                    </div>
                                    <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === guide.id && "rotate-180")} />
                                </button>

                                <AnimatePresence>
                                    {openSection === guide.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-white/5">
                                                <div className="space-y-6 mt-6">
                                                    {guide.content.map((item, i) => (
                                                        <div key={i} className="pl-4 border-l-2 border-emerald-500/20">
                                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                                                {item.subtitle}
                                                            </h4>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                                {item.text}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            No guides found matching "{searchQuery}".
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
