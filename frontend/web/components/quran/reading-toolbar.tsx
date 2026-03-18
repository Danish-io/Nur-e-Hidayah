"use client";
import React from "react";

import { useReadingSettings } from "@/context/reading-settings-context";
import { Button } from "@/components/ui/button";
import { Settings, Type, Languages, Book, ChevronDown, Layout, AlignJustify } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

export function ReadingToolbar({ className }: { className?: string }) {
    const settings = useReadingSettings();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY;
        if (latest < 50) {
            setHidden(false);
        } else if (diff > 5) {
            setHidden(true);
        } else if (diff < -5) {
            setHidden(false);
        }
        setLastScrollY(latest);
    });

    return (
        <motion.div
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -60, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "sticky top-[72px] z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-gray-200 dark:border-zinc-800 shadow-sm",
                className
            )}
        >
            <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">

                {/* Font Size Controls */}
                <div className="flex items-center space-x-2 border-r border-gray-200 dark:border-zinc-800 pr-4 shrink-0">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:inline">Font Size</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 rounded-full"
                        onClick={() => settings.setFontSize(settings.fontSize - 2)}
                    >
                        -
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{settings.fontSize}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 rounded-full"
                        onClick={() => settings.setFontSize(settings.fontSize + 2)}
                    >
                        +
                    </Button>
                </div>

                {/* Display Mode Toggle */}
                <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-zinc-800 pr-4 shrink-0">
                    <Button
                        variant={settings.displayMode === 'list' ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn(
                            "h-8 px-3 gap-2",
                            settings.displayMode === 'list' && "bg-quran-gold/10 text-quran-gold hover:bg-quran-gold/20"
                        )}
                        onClick={() => settings.setDisplayMode('list')}
                    >
                        <Layout className="w-4 h-4" />
                        <span className="hidden md:inline">List</span>
                    </Button>
                    <Button
                        variant={settings.displayMode === 'mushaf' ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn(
                            "h-8 px-3 gap-2",
                            settings.displayMode === 'mushaf' && "bg-quran-gold/10 text-quran-gold hover:bg-quran-gold/20"
                        )}
                        onClick={() => settings.setDisplayMode('mushaf')}
                    >
                        <AlignJustify className="w-4 h-4" />
                        <span className="hidden md:inline">Mushaf</span>
                    </Button>
                </div>

                {/* Script Selection */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Book className="w-4 h-4 text-quran-gold" />
                            <span>{settings.script === 'uthmani' ? 'Uthmani' : 'IndoPak'}</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Arabic Script</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={settings.script} onValueChange={(v: string) => settings.setScript(v as 'uthmani' | 'indopak')}>
                            <DropdownMenuRadioItem value="uthmani">
                                <span className="flex flex-col">
                                    <span>Uthmani Script</span>
                                    <span className="text-xs text-slate-400 font-arabic">ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ</span>
                                </span>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="indopak">
                                <span className="flex flex-col">
                                    <span>IndoPak Script</span>
                                    <span className="text-xs text-slate-400 font-arabic">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ</span>
                                </span>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* View Settings */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Languages className="w-4 h-4 text-quran-gold" />
                            <span>View Settings</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Translation</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={settings.translationMode} onValueChange={(v: string) => settings.setTranslationMode(v as 'en' | 'ur' | 'both' | 'none')}>
                            <DropdownMenuRadioItem value="en">English Only</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="ur">Urdu Only</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="both">Both Languages</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="none">Hide Translation</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={settings.showTransliteration}
                            onCheckedChange={settings.setShowTransliteration}
                        >
                            Show Transliteration
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Audio Meaning */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="w-4 h-4 text-quran-gold" />
                            <span>Audio: {settings.audioTranslation === 'none' ? 'None' : settings.audioTranslation === 'ur' ? 'Urdu' : 'English'}</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Audio Translation</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={settings.audioTranslation} onValueChange={(v: string) => settings.setAudioTranslation(v as 'none' | 'ur' | 'en')}>
                            <DropdownMenuRadioItem value="none">None (Arabic only)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="ur">Urdu (Shamshad)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="en">English (Walk)</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </motion.div>
    );
}
