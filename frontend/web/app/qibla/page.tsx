"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Compass, MapPin, Navigation, RefreshCw, AlertCircle,
    Check, Info, Smartphone, ArrowUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

// Kaaba coordinates (Makkah)
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export default function QiblaPage() {
    const { t } = useI18n();
    const [location, setLocation] = useState<{ lat: number; lng: number; city: string; country: string } | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(0);
    const [compassHeading, setCompassHeading] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasCompass, setHasCompass] = useState(true);
    const [isCalibrated, setIsCalibrated] = useState(false);
    const [distance, setDistance] = useState<number>(0);
    const compassRef = useRef<HTMLDivElement>(null);

    // Calculate Qibla direction from user's location
    const calculateQiblaDirection = (lat: number, lng: number): number => {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;
        const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
        const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

        const y = Math.sin(kaabaLngRad - lngRad);
        const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);

        let qibla = Math.atan2(y, x) * (180 / Math.PI);
        qibla = (qibla + 360) % 360;

        return qibla;
    };

    // Calculate distance to Kaaba in km
    const calculateDistance = (lat: number, lng: number): number => {
        const R = 6371; // Earth's radius in km
        const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
        const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    // Get user location
    useEffect(() => {
        const getLocation = async () => {
            setLoading(true);
            setError(null);

            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000
                    });
                });

                const { latitude, longitude } = position.coords;

                // Get city name
                const geoResponse = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const geoData = await geoResponse.json();

                setLocation({
                    lat: latitude,
                    lng: longitude,
                    city: geoData.city || geoData.locality || "Unknown",
                    country: geoData.countryName || "Unknown"
                });

                const angle = calculateQiblaDirection(latitude, longitude);
                setQiblaAngle(angle);
                setDistance(calculateDistance(latitude, longitude));
            } catch (err: any) {
                console.error("Location error:", err);
                setError("Please enable location access to find Qibla direction.");

                // Default to a demo location (Delhi, India)
                const demoLat = 28.6139;
                const demoLng = 77.2090;
                setLocation({
                    lat: demoLat,
                    lng: demoLng,
                    city: "Demo",
                    country: "Location"
                });
                setQiblaAngle(calculateQiblaDirection(demoLat, demoLng));
                setDistance(calculateDistance(demoLat, demoLng));
            } finally {
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    // Device orientation for compass
    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                // For iOS, we need to use webkitCompassHeading
                const heading = (event as any).webkitCompassHeading || (360 - event.alpha);
                setCompassHeading(heading);
                setIsCalibrated(true);
            }
        };

        // Check if device orientation is supported
        if (typeof DeviceOrientationEvent !== 'undefined') {
            // For iOS 13+, we need to request permission
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                setHasCompass(true);
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        } else {
            setHasCompass(false);
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation, true);
        };
    }, []);

    // Request compass permission (iOS)
    const requestCompassPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', (event) => {
                        if (event.alpha !== null) {
                            const heading = (event as any).webkitCompassHeading || (360 - event.alpha);
                            setCompassHeading(heading);
                            setIsCalibrated(true);
                        }
                    }, true);
                }
            } catch (err) {
                console.error("Compass permission denied:", err);
            }
        }
    };

    // Rotation angle for the Qibla pointer
    const pointerRotation = qiblaAngle - compassHeading;

    // Direction label based on angle
    const getDirectionLabel = (angle: number): string => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(angle / 45) % 8;
        return directions[index];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950/20 p-4 md:p-8">
            <div className="max-w-lg mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                        <Compass className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{t.nav.qibla}</h1>
                    <p className="text-slate-500 dark:text-slate-400">{t.home.direction} to Makkah</p>

                    {/* Location */}
                    {location && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mt-2"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{location.city}, {location.country}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4" />
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

                {/* Compass */}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        {/* Compass Container */}
                        <div
                            ref={compassRef}
                            className="relative w-72 h-72 md:w-80 md:h-80 mx-auto"
                        >
                            {/* Outer Ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-zinc-700 shadow-xl" />

                            {/* Compass Rose Background */}
                            <motion.div
                                className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-100 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-inner"
                                style={{ rotate: -compassHeading }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                {/* Cardinal Directions */}
                                {['N', 'E', 'S', 'W'].map((dir, i) => (
                                    <div
                                        key={dir}
                                        className="absolute inset-0 flex items-start justify-center pt-6"
                                        style={{ transform: `rotate(${i * 90}deg)` }}
                                    >
                                        <span className={cn(
                                            "text-lg font-bold",
                                            dir === 'N' ? "text-rose-500" : "text-slate-400 dark:text-slate-500"
                                        )}>
                                            {dir}
                                        </span>
                                    </div>
                                ))}

                                {/* Degree Markers */}
                                {[...Array(36)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 flex items-start justify-center"
                                        style={{ transform: `rotate(${i * 10}deg)` }}
                                    >
                                        <div className={cn(
                                            "mt-2",
                                            i % 9 === 0
                                                ? "w-0.5 h-4 bg-slate-400 dark:bg-slate-500"
                                                : "w-0.5 h-2 bg-slate-300 dark:bg-slate-600"
                                        )} />
                                    </div>
                                ))}
                            </motion.div>

                            {/* Qibla Pointer Arrow */}
                            <motion.div
                                className="absolute inset-8 flex items-center justify-center"
                                style={{ rotate: pointerRotation }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <div className="relative w-full h-full flex items-start justify-center">
                                    {/* Arrow */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[40px] border-b-emerald-500 drop-shadow-lg" />
                                        <div className="w-2 h-20 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-b-full" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Center Kaaba Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <span className="text-2xl">🕋</span>
                                </div>
                            </div>
                        </div>

                        {/* Qibla Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 p-6 bg-white/60 dark:bg-zinc-900/50 rounded-3xl border border-slate-200/50 dark:border-white/10 shadow-lg"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {/* Qibla Angle */}
                                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                                    <Navigation className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Qibla Direction</p>
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                        {Math.round(qiblaAngle)}°
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {getDirectionLabel(qiblaAngle)}
                                    </p>
                                </div>

                                {/* Distance */}
                                <div className="text-center p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
                                    <MapPin className="w-6 h-6 mx-auto text-rose-500 mb-2" />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Distance to Kaaba</p>
                                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                                        {distance.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">km</p>
                                </div>
                            </div>

                            {/* Compass Status */}
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="w-5 h-5 text-slate-400" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Compass Status</span>
                                    </div>
                                    {isCalibrated ? (
                                        <span className="flex items-center gap-1 text-sm text-emerald-500">
                                            <Check className="w-4 h-4" /> Active
                                        </span>
                                    ) : (
                                        <button
                                            onClick={requestCompassPermission}
                                            className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                                        >
                                            Enable Compass
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Instructions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                        >
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    <p className="font-medium mb-1">How to use:</p>
                                    <ol className="list-decimal list-inside space-y-1 text-blue-600 dark:text-blue-400">
                                        <li>Hold your phone flat and level</li>
                                        <li>Turn until the green arrow points up</li>
                                        <li>That direction faces the Kaaba 🕋</li>
                                    </ol>
                                </div>
                            </div>
                        </motion.div>

                        {/* Calibration Tip */}
                        {!isCalibrated && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800"
                            >
                                <div className="flex items-start gap-3">
                                    <RefreshCw className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-700 dark:text-amber-300">
                                        <p className="font-medium">Calibrate your compass:</p>
                                        <p className="text-amber-600 dark:text-amber-400">
                                            Move your phone in a figure-8 pattern to calibrate the compass for better accuracy.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                    <p>Qibla direction calculated using spherical geometry</p>
                    <p className="text-xs mt-1">For best results, use outdoors away from metal objects</p>
                </motion.div>

            </div>
        </div>
    );
}
