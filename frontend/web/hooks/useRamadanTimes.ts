"use client";

import { useState, useEffect } from "react";

export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
}

export interface RamadanEvent {
    name: string;
    time: string;
    timeLeft: string;
    type: "suhoor" | "iftar" | "prayer";
}

export function useRamadanTimes() {
    const [times, setTimes] = useState<PrayerTimes | null>(null);
    const [nextEvent, setNextEvent] = useState<RamadanEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [hijriDate, setHijriDate] = useState<string>("");
    const [locationName, setLocationName] = useState<string>("Detecting Location...");

    // Helper to fetch
    const fetchTimes = async (params: string) => {
        setLoading(true);
        try {
            const date = new Date();
            const timestamp = Math.floor(date.getTime() / 1000);

            // params could be "latitude=x&longitude=y" or "city=x&country=y"
            const url = params.includes("city")
                ? `https://api.aladhan.com/v1/timingsByCity/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?${params}&method=2`
                : `https://api.aladhan.com/v1/timings/${timestamp}?${params}&method=2`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 200) {
                setTimes(data.data.timings);
                const hijri = data.data.date.hijri;
                setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch prayer times", error);
            setLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        const savedLocation = localStorage.getItem("ramadan-location-preference");

        if (savedLocation) {
            // Use saved manual location (City, Country)
            const loc = JSON.parse(savedLocation);
            setLocationName(`${loc.city}, ${loc.country}`);
            fetchTimes(`city=${loc.city}&country=${loc.country}`);
        } else if (navigator.geolocation) {
            // Auto-detect
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationName("Current Location");
                    fetchTimes(`latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`);
                },
                () => {
                    // Fallback
                    setLocationName("Makkah (Default)");
                    fetchTimes(`latitude=21.4225&longitude=39.8262`);
                }
            );
        } else {
            setLocationName("Makkah (Default)");
            fetchTimes(`latitude=21.4225&longitude=39.8262`);
        }
    }, []);

    const changeLocation = (city: string, country: string) => {
        localStorage.setItem("ramadan-location-preference", JSON.stringify({ city, country }));
        setLocationName(`${city}, ${country}`);
        fetchTimes(`city=${city}&country=${country}`);
    };

    const resetLocation = () => {
        localStorage.removeItem("ramadan-location-preference");
        setLocationName("Detecting...");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocationName("Current Location");
                fetchTimes(`latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`);
            });
        }
    };

    // Timer Logic - Keep existing logic
    useEffect(() => {
        if (!times) return;

        const interval = setInterval(() => {
            const now = new Date();
            const timeToMinutes = (timeStr: string) => {
                const [h, m] = timeStr.split(":").map(Number);
                return h * 60 + m;
            };

            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            // Handle edge case where API returns times like "19:00 (EST)" - just parse first part
            const cleanTime = (t: string) => t.split(" ")[0];

            const fajr = timeToMinutes(cleanTime(times.Fajr));
            const maghrib = timeToMinutes(cleanTime(times.Maghrib));

            let targetName = "";
            let targetTime = "";
            let eventType: "suhoor" | "iftar" | "prayer" = "prayer";
            let diff = 0;

            if (currentMinutes < fajr) {
                targetName = "Suhoor Ends (Fajr)";
                targetTime = times.Fajr;
                eventType = "suhoor";
                diff = fajr - currentMinutes;
            } else if (currentMinutes < maghrib) {
                targetName = "Iftar (Maghrib)";
                targetTime = times.Maghrib;
                eventType = "iftar";
                diff = maghrib - currentMinutes;
            } else {
                targetName = "Suhoor Ends (Next Fajr)";
                targetTime = times.Fajr;
                eventType = "suhoor";
                diff = (24 * 60 - currentMinutes) + fajr;
            }

            const h = Math.floor(diff / 60);
            const m = diff % 60;
            const s = 59 - now.getSeconds();

            setNextEvent({
                name: targetName,
                time: targetTime,
                timeLeft: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
                type: eventType
            });

        }, 1000);

        return () => clearInterval(interval);
    }, [times]);

    return { times, nextEvent, loading, hijriDate, locationName, changeLocation, resetLocation };
}
