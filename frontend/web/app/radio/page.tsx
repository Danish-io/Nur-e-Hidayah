"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Search, Filter, Radio as RadioIcon, Signal, Star, Volume2, SkipBack, SkipForward, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Data with Reliable CDN Streams (QuranicAudio.com)
const featuredStations = [
    { id: 1, name: "Mishary Alafasy", type: "Reciters", url: "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3", initials: "MA" },
    { id: 2, name: "Abdur-Rahman as-Sudais", type: "Reciters", url: "https://download.quranicaudio.com/qdc/abdurrahmaan_as_sudais/murattal/1.mp3", initials: "RS" },
    { id: 3, name: "Sa'ud ash-Shuraym", type: "Reciters", url: "https://download.quranicaudio.com/qdc/sa3ood_ash_shuraym/murattal/1.mp3", initials: "SS" },
    { id: 4, name: "Maher al-Muaiqly", type: "Reciters", url: "https://download.quranicaudio.com/qdc/maher_al_muaiqly/murattal/1.mp3", initials: "MM" },
    { id: 5, name: "Ahmad al-Ajmy", type: "Reciters", url: "https://download.quranicaudio.com/qdc/ahmed_ajamy/murattal/1.mp3", initials: "AA" },
    { id: 6, name: "AbdulBaset AbdulSamad", type: "Reciters", url: "https://download.quranicaudio.com/qdc/abdul_basit_murattal/murattal/1.mp3", initials: "AB" },
];

const liveStreams = [
    { id: 101, name: "Makkah Live", type: "Live", url: "http://live.mp3quran.net:8006/;", status: "online" },
    { id: 102, name: "Madinah Live", type: "Live", url: "http://live.mp3quran.net:8010/;", status: "online" },
    { id: 103, name: "Alf Elf Radio", type: "Live", url: "https://live.mp3quran.net:9702/;", status: "offline" },
    { id: 104, name: "Quran Radio - Mixed", type: "Live", url: "http://live.mp3quran.net:8002/;", status: "online" },
];

const allStations = [
    { id: 201, name: "Ibrahim al-Akhdar", type: "Reciters", initials: "IA", url: "https://download.quranicaudio.com/quran/ibrahim_al_akhdar/001.mp3" },
    { id: 202, name: "Abu Bakr al-Shatri", type: "Reciters", initials: "AB", url: "https://download.quranicaudio.com/quran/abu_bakr_ash-shaatree/001.mp3" },
    { id: 203, name: "Ahmad al-Ajmy", type: "Reciters", initials: "AA", url: "https://download.quranicaudio.com/quran/ahmed_ibn_3lee_al-3ajamy/001.mp3" },
    { id: 204, name: "Khalid Al-Jalil", type: "Reciters", initials: "KJ", url: "https://download.quranicaudio.com/quran/khalid_al_jalil/001.mp3" },
    { id: 205, name: "Yasser Al-Dosari", type: "Reciters", initials: "YD", url: "https://download.quranicaudio.com/quran/yasser_ad-dussary/001.mp3" },
    { id: 206, name: "Nasser Al-Qatami", type: "Reciters", initials: "NQ", url: "https://download.quranicaudio.com/quran/nasser_alqatami/001.mp3" },
    { id: 207, name: "Fares Abbad", type: "Reciters", initials: "FA", url: "https://download.quranicaudio.com/quran/fares/001.mp3" },
    { id: 208, name: "Idris Abkar", type: "Reciters", initials: "IA", url: "https://download.quranicaudio.com/quran/idrees_abkar/001.mp3" },
    { id: 209, name: "Salah Al-Budair", type: "Reciters", initials: "SB", url: "https://download.quranicaudio.com/quran/salah_budair/001.mp3" },
    { id: 210, name: "Abdullah Al-Juhany", type: "Reciters", initials: "AJ", url: "https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee/001.mp3" },
    { id: 211, name: "Saad Al-Ghamdi", type: "Reciters", initials: "SG", url: "https://download.quranicaudio.com/quran/sa3d_al-ghaamidee/001.mp3" },
    { id: 212, name: "Mahmoud Khalil Al-Hussary", type: "Reciters", initials: "MH", url: "https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/001.mp3" },
    { id: 213, name: "Ali Jaber", type: "Reciters", initials: "AJ", url: "https://download.quranicaudio.com/quran/ali_jaber/001.mp3" },
    { id: 214, name: "Mohamed Siddiq El-Minshawi", type: "Reciters", initials: "MM", url: "https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/001.mp3" },
    { id: 215, name: "Hani Ar-Rifai", type: "Reciters", initials: "HR", url: "https://download.quranicaudio.com/quran/haine_ar-rifa3ee/001.mp3" },
    { id: 216, name: "Abdullah Basfar", type: "Reciters", initials: "AB", url: "https://download.quranicaudio.com/quran/abdullaah_basfar/001.mp3" },
    { id: 217, name: "Muhammad Jibreel", type: "Reciters", initials: "MJ", url: "https://download.quranicaudio.com/quran/muhammad_jibreel/001.mp3" },
    { id: 218, name: "Mohamed Tablawi", type: "Reciters", initials: "MT", url: "https://download.quranicaudio.com/quran/mohammad_altablawi/001.mp3" },
    { id: 219, name: "Abdul Basit (Mujawwad)", type: "Reciters", initials: "AB", url: "https://download.quranicaudio.com/quran/abdul_basit_mujawwad/001.mp3" },
    { id: 220, name: "Wadi Al-Yamani", type: "Reciters", initials: "WY", url: "https://download.quranicaudio.com/quran/wadee_hammadi_al-yamani/001.mp3" },
];

export default function RadioPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentStation, setCurrentStation] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio Ref
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.preload = "auto";

        // Handle Errors
        audioRef.current.onerror = () => {
            console.error("Audio Error:", audioRef.current?.error);
            alert("Unable to play this station. The stream might be offline.");
            setIsPlaying(false);
        };

        // Handle End
        audioRef.current.onended = () => {
            setIsPlaying(false);
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const playStation = async (station: any) => {
        if (!audioRef.current) return;

        try {
            if (currentStation?.id === station.id) {
                // Toggle Play/Pause for current station
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } else {
                // New Station
                // Reset audio state
                audioRef.current.pause();
                audioRef.current.src = station.url;
                audioRef.current.load();

                await audioRef.current.play();
                setCurrentStation(station);
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Playback Failed:", error);
            setIsPlaying(false);
            alert(`Playback failed for ${station.name}. Please try another station.`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-28 font-sans">
            {/* Page Header */}
            <div className="bg-emerald-700 text-white py-6 shadow-md mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold tracking-wide">Quran Radio</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-12">

                {/* Featured Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100">Featured</h2>
                        <span className="text-sm text-slate-400 font-normal">({featuredStations.length} stations)</span>
                    </div>

                    <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-4 min-w-max">
                            {featuredStations.map(station => (
                                <StationCard
                                    key={station.id}
                                    station={station}
                                    currentStation={currentStation}
                                    isPlaying={isPlaying}
                                    onPlay={playStation}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Live Streams Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Signal className="w-5 h-5 text-red-500" />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100">Live Streams</h2>
                        <span className="text-sm text-slate-400 font-normal">({liveStreams.filter(s => s.status === "online").length} active)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveStreams
                            .filter(stream => stream.status === "online")
                            .map(stream => (
                                <LiveCard
                                    key={stream.id}
                                    station={stream}
                                    currentStation={currentStation}
                                    isPlaying={isPlaying}
                                    onPlay={playStation}
                                />
                            ))}
                    </div>
                </section>

                {/* All Stations Section */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100">All Stations</h2>
                            <span className="text-sm text-slate-400 font-normal">({allStations.length} of {allStations.length})</span>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search stations..."
                                    className="pl-9 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="flex items-center gap-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">All Categories</span>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {allStations.map(station => (
                            <MiniStationCard
                                key={station.id}
                                station={station}
                                currentStation={currentStation}
                                isPlaying={isPlaying}
                                onPlay={playStation}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Now Playing Bar (Nur Redesign) */}
            {currentStation && (
                <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 z-40 transition-all duration-1000 ease-in-out">
                    <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                <RadioIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400 relative z-10" />
                                <div className="absolute inset-0 bg-emerald-400/10 animate-pulse-slow" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-serif font-bold text-lg md:text-xl text-slate-800 dark:text-emerald-50 line-clamp-1">{currentStation.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-600/70 dark:text-emerald-400/60">Luminous Stream</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="text-slate-400 hover:text-emerald-400 transition-all duration-500 hidden md:block hover:scale-110">
                                <SkipBack className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => playStation(currentStation)}
                                className="w-12 h-12 md:w-14 md:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 transition-all duration-500 hover:scale-110 active:scale-95 group relative overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/10 group-hover:h-full transition-all duration-700" />
                                {isPlaying ? <Pause className="w-6 h-6 fill-current relative z-10" /> : <Play className="w-6 h-6 fill-current ml-1 relative z-10" />}
                            </button>
                            <button className="text-slate-400 hover:text-emerald-400 transition-all duration-500 hidden md:block hover:scale-110">
                                <SkipForward className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StationCard({ station, currentStation, isPlaying, onPlay }: { station: any, currentStation: any, isPlaying: boolean, onPlay: (s: any) => void }) {
    const isCurrent = currentStation?.id === station.id;
    const active = isCurrent && isPlaying;

    return (
        <div
            onClick={() => onPlay(station)}
            className={`group relative overflow-hidden rounded-[20px] p-7 w-64 h-52 cursor-pointer transition-all duration-700
                ${active
                    ? 'bg-emerald-600/20 text-white shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.02] border-emerald-500/50'
                    : 'glass hover:border-emerald-500/30 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-emerald-500/5'
                }
            `}
        >
            {/* Background Decorative Element */}
            <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-1000
                ${active ? 'bg-emerald-400/20 opacity-100' : 'bg-emerald-500/5 opacity-0 group-hover:opacity-100'}
            `} />

            <div className="flex flex-col h-full justify-between items-start relative z-10">
                <div className="flex items-start justify-between w-full">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold shadow-inner transition-all duration-700 group-hover:scale-110
                        ${active
                            ? 'bg-white text-emerald-700 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }
                    `}>
                        {station.initials || <RadioIcon className="w-7 h-7" />}
                    </div>

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                        ${active
                            ? 'bg-white text-emerald-600 shadow-lg'
                            : 'bg-white/5 dark:bg-emerald-500/5 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        }
                    `}>
                        {active ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <h3 className={`font-serif font-bold text-xl leading-tight line-clamp-2 transition-colors duration-500
                        ${active ? 'text-white' : 'text-slate-800 dark:text-emerald-50'}
                    `}>
                        {station.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className={`h-[1px] w-4 bg-current opacity-30 ${active ? 'text-emerald-200' : 'text-slate-400'}`} />
                        <div className={`text-[10px] font-bold uppercase tracking-[0.2em]
                            ${active ? 'text-emerald-200' : 'text-slate-400'}
                        `}>
                            {station.type}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LiveCard({ station, currentStation, isPlaying, onPlay }: { station: any, currentStation: any, isPlaying: boolean, onPlay: (s: any) => void }) {
    const isCurrent = currentStation?.id === station.id;
    const active = isCurrent && isPlaying;

    return (
        <div
            onClick={() => onPlay(station)}
            className={`rounded-[20px] p-6 border shadow-sm transition-all duration-700 cursor-pointer relative overflow-hidden group
                ${active
                    ? 'bg-emerald-600/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                    : 'glass hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-xl'
                }
            `}
        >
            <div className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-2 shadow-sm transition-all duration-700
                ${active ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-400'}
            `}>
                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-current'}`}></div>
                Live
            </div>

            <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-700 shadow-inner
                    ${active
                        ? 'bg-emerald-500 text-white scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-emerald-500/5 text-emerald-600 hover:bg-emerald-500/10'}
                `}>
                    {active ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`font-serif font-bold text-xl line-clamp-1 mb-1.5 leading-tight transition-colors duration-500 ${active ? 'text-emerald-50' : 'text-slate-800 dark:text-emerald-50/90'}`}>
                        {station.name}
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="inline-block px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] rounded font-bold uppercase tracking-[0.15em]">
                            {station.type}
                        </span>
                        <div className="flex gap-1 items-end h-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`w-1 rounded-full bg-emerald-500 transition-all duration-500 ${active ? 'animate-bounce' : 'opacity-20'}`}
                                    style={{
                                        height: `${40 + Math.random() * 60}%`,
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '0.6s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniStationCard({ station, currentStation, isPlaying, onPlay }: { station: any, currentStation: any, isPlaying: boolean, onPlay: (s: any) => void }) {
    const isCurrent = currentStation?.id === station.id;
    const active = isCurrent && isPlaying;

    return (
        <div
            onClick={() => onPlay(station)}
            className={`group rounded-[20px] p-5 border transition-all duration-700 cursor-pointer flex flex-col h-full
                 ${active
                    ? 'bg-emerald-600/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                    : 'glass hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-md'
                }
            `}
        >
            <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-serif font-bold shadow-inner transition-all duration-700 group-hover:scale-110
                    ${active ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-500/10 text-emerald-600'}
                `}>
                    {station.initials || <RadioIcon className="w-6 h-6" />}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                     ${active ? 'bg-white text-emerald-600 shadow-md' : 'bg-white/5 text-slate-400 group-hover:text-emerald-500'}
                `}>
                    {active ? <Pause className="w-5 h-5 fill-current" /> : <Play className={`w-5 h-5 fill-current ml-0.5`} />}
                </div>
            </div>

            <h3 className={`font-serif font-bold text-base mb-auto line-clamp-2 transition-colors duration-500 ${active ? 'text-emerald-50' : 'text-slate-800 dark:text-emerald-50/80'}`}>
                {station.name}
            </h3>

            <div className="mt-5 flex items-center justify-between">
                <span className="inline-block px-3 py-1 bg-white/5 text-slate-500 dark:text-emerald-100/40 text-[9px] rounded-lg font-bold uppercase tracking-[0.2em]">
                    {station.type}
                </span>
                {active && (
                    <div className="flex gap-1 items-end h-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-3 bg-emerald-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
