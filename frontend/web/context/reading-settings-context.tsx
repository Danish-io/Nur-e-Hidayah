"use client";

import { createContext, useContext, useState, ReactNode, useEffect, Suspense, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

type ScriptType = 'uthmani' | 'indopak';
type TranslationType = 'en' | 'ur' | 'both' | 'none';

interface ReadingSettings {
    fontSize: number;
    script: ScriptType;
    translationMode: TranslationType;
    showTransliteration: boolean;
    audioTranslation: 'none' | 'ur' | 'en';
    displayMode: 'list' | 'mushaf';
}

interface ReadingSettingsContextType extends ReadingSettings {
    setFontSize: (size: number) => void;
    setScript: (script: ScriptType) => void;
    setTranslationMode: (mode: TranslationType) => void;
    setShowTransliteration: (show: boolean) => void;
    setAudioTranslation: (lang: 'none' | 'ur' | 'en') => void;
    setDisplayMode: (mode: 'list' | 'mushaf') => void;
    resetSettings: () => void;
}

const defaultSettings: ReadingSettings = {
    fontSize: 28,
    script: 'uthmani',
    translationMode: 'en',
    showTransliteration: false,
    audioTranslation: 'none',
    displayMode: 'list',
};

const ReadingSettingsContext = createContext<ReadingSettingsContextType | undefined>(undefined);

function SettingsHandler({ setSettings, isLoaded }: {
    setSettings: React.Dispatch<React.SetStateAction<ReadingSettings>>,
    isLoaded: boolean
}) {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (isLoaded) {
            const mode = searchParams.get('mode');
            if (mode === 'mushaf') {
                setSettings(prev => ({ ...prev, displayMode: 'mushaf' }));
            }
        }
    }, [searchParams, isLoaded, setSettings]);

    return null;
}

export function ReadingSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quran-reading-settings');
        if (saved) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(saved) });
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('quran-reading-settings', JSON.stringify(settings));
        }
    }, [settings, isLoaded]);

    const setFontSize = useCallback((size: number) => {
        const newSize = Math.max(18, Math.min(size, 60));
        setSettings(prev => ({ ...prev, fontSize: newSize }));
    }, []);

    const setScript = useCallback((script: ScriptType) => {
        setSettings(prev => ({ ...prev, script }));
    }, []);

    const setTranslationMode = useCallback((mode: TranslationType) => {
        setSettings(prev => ({ ...prev, translationMode: mode }));
    }, []);

    const setShowTransliteration = useCallback((show: boolean) => {
        setSettings(prev => ({ ...prev, showTransliteration: show }));
    }, []);

    const setAudioTranslation = useCallback((lang: 'none' | 'ur' | 'en') => {
        setSettings(prev => ({ ...prev, audioTranslation: lang }));
    }, []);

    const setDisplayMode = useCallback((mode: 'list' | 'mushaf') => {
        setSettings(prev => ({ ...prev, displayMode: mode }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
    }, []);

    const providerValue = useMemo(() => ({
        ...settings,
        setFontSize,
        setScript,
        setTranslationMode,
        setShowTransliteration,
        setAudioTranslation,
        setDisplayMode,
        resetSettings
    }), [settings, setFontSize, setScript, setTranslationMode, setShowTransliteration, setAudioTranslation, setDisplayMode, resetSettings]);

    return (
        <ReadingSettingsContext.Provider value={providerValue}>
            <Suspense fallback={null}>
                <SettingsHandler setSettings={setSettings} isLoaded={isLoaded} />
            </Suspense>
            {children}
        </ReadingSettingsContext.Provider>
    );
}

export function useReadingSettings() {
    const context = useContext(ReadingSettingsContext);
    if (context === undefined) {
        throw new Error("useReadingSettings must be used within a ReadingSettingsProvider");
    }
    return context;
}
