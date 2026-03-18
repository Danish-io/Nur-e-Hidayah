"use client";

import { useState, useEffect } from "react";

export type Mood = "peaceful" | "tired" | "overwhelmed" | "low_iman" | "grateful" | null;

interface GentleState {
    mood: Mood;
    lastCheckIn: string; // ISO Date string
}

export function useGentleState() {
    const [mood, setMood] = useState<Mood>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("ramadan-gentle-state");
        if (saved) {
            try {
                const parsed: GentleState = JSON.parse(saved);
                const today = new Date().toDateString();
                const savedDate = new Date(parsed.lastCheckIn).toDateString();

                // Reset if it's a new day
                if (today === savedDate) {
                    setMood(parsed.mood);
                } else {
                    setMood(null);
                }
            } catch (e) {
                console.error("Failed to parse gentle state", e);
            }
        }
    }, []);

    const updateMood = (newMood: Mood) => {
        setMood(newMood);
        const state: GentleState = {
            mood: newMood,
            lastCheckIn: new Date().toISOString()
        };
        localStorage.setItem("ramadan-gentle-state", JSON.stringify(state));
    };

    return { mood, updateMood, mounted };
}
