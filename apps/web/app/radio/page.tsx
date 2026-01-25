"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Search, Filter, Radio as RadioIcon, Signal, Star, Volume2, SkipBack, SkipForward, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Data with Reliable CDN Streams (QuranicAudio.com)
const featuredStations = [
    { id: 1, name: "Mishary Alafasy", type: "Reciters", url: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mishary" },
    { id: 2, name: "Abdur-Rahman as-Sudais", type: "Reciters", url: "https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sudais" },
    { id: 3, name: "Sa'ud ash-Shuraym", type: "Reciters", url: "https://download.quranicaudio.com/quran/sa3ood_al-shuraym/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Shuraym" },
    { id: 4, name: "Maher al-Muaiqly", type: "Reciters", url: "https://download.quranicaudio.com/quran/maher_almu3aiqly/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maher" },
    { id: 5, name: "Ahmad al-Ajmy", type: "Reciters", url: "https://download.quranicaudio.com/quran/ahmed_ibn_3lee_al-3ajamy/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ajmy" },
    { id: 6, name: "AbdulBaset AbdulSamad", type: "Reciters", url: "https://download.quranicaudio.com/quran/abdul_basit_murattal/001.mp3", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=AbdulBaset" },
];

const liveStreams = [
    { id: 101, name: "Makkah Live", type: "Live", url: "https://qurango.net/radio/makkah", status: "online" },
    { id: 102, name: "Madinah Live", type: "Live", url: "https://qurango.net/radio/madinah", status: "online" },
    { id: 103, name: "Alf Elf Radio", type: "Live", url: "https://live.mp3quran.net:9702/;", status: "offline" },
    { id: 104, name: "Quran Radio - Mixed", type: "Live", url: "https://qurango.net/radio/mix", status: "online" },
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
                audioRef.current.src = station.url;
                await audioRef.current.play();
                setCurrentStation(station);
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Playback Failed:", error);
            setIsPlaying(false);
            alert("Playback failed. Please try another station.");
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

            {/* Now Playing Bar */}
            {currentStation && (
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-lg p-3 z-40 transition-transform duration-500 ease-in-out">
                    <div className="container mx-auto max-w-5xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center animate-pulse-slow">
                                <RadioIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-white line-clamp-1">{currentStation.name}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-emerald-700 font-medium px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">Live Radio</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="text-slate-400 hover:text-emerald-600 transition-colors hidden md:block">
                                <SkipBack className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => playStation(currentStation)}
                                className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                            </button>
                            <button className="text-slate-400 hover:text-emerald-600 transition-colors hidden md:block">
                                <SkipForward className="w-5 h-5" />
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
            className={`bg-white dark:bg-zinc-900 rounded-xl p-4 w-60 border shadow-sm hover:shadow-md transition-all group cursor-pointer
                ${active ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-100 dark:border-zinc-800'}
            `}
        >
            <div className={`bg-gray-50 dark:bg-zinc-800 rounded-lg h-32 flex items-center justify-center mb-4 relative overflow-hidden transition-colors
                 ${active ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'group-hover:bg-gray-100 dark:group-hover:bg-zinc-750'}
            `}>
                {station.image ? (
                    <img
                        src={station.image}
                        alt={station.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110
                        ${active ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-zinc-700 text-slate-700 dark:text-slate-200'}
                    `}>
                        {active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </div>
                )}

                {/* Overlay Play Icon for Image Cards */}
                {station.image && (
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'opacity-100 bg-black/40' : ''}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm
                            ${active ? 'bg-emerald-600 text-white' : 'bg-white/90 text-slate-800'}
                         `}>
                            {active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                        </div>
                    </div>
                )}
            </div>
            <h3 className={`font-semibold truncate mb-2 ${active ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-800 dark:text-gray-200'}`}>
                {station.name}
            </h3>
            <span className="inline-block px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs rounded-md font-medium">
                {station.type}
            </span>
        </div>
    );
}

function LiveCard({ station, currentStation, isPlaying, onPlay }: { station: any, currentStation: any, isPlaying: boolean, onPlay: (s: any) => void }) {
    const isCurrent = currentStation?.id === station.id;
    const active = isCurrent && isPlaying;

    return (
        <div
            onClick={() => onPlay(station)}
            className={`bg-white dark:bg-zinc-900 rounded-xl p-4 border shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden
                ${active ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-100 dark:border-zinc-800'}
            `}
        >
            <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm animate-pulse flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                Live
            </div>

            <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                    ${active ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-gray-50 dark:bg-zinc-800'}
                `}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110
                        ${active ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-zinc-700 text-slate-700 dark:text-slate-200'}
                    `}>
                        {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </div>
                </div>
                <div>
                    <h3 className={`font-semibold line-clamp-2 mb-2 leading-tight ${active ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-800 dark:text-gray-200'}`}>
                        {station.name}
                    </h3>
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-md font-medium">
                        {station.type}
                    </span>
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
            className={`bg-white dark:bg-zinc-900 rounded-xl p-4 border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full
                 ${active ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-100 dark:border-zinc-800'}
            `}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm
                    ${station.initials ? 'bg-emerald-600' : 'bg-gray-400'}`}>
                    {station.initials || <RadioIcon className="w-5 h-5" />}
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                     ${active ? 'bg-emerald-600 text-white' : 'bg-gray-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-zinc-700'}
                `}>
                    {active ? <Pause className="w-4 h-4" /> : <Play className={`w-4 h-4 ml-0.5 ${active ? 'text-white' : 'text-slate-400 hover:text-emerald-600'}`} />}
                </div>
            </div>

            <h3 className={`font-semibold text-sm mb-auto ${active ? 'text-emerald-800' : 'text-slate-800 dark:text-gray-200'}`}>
                {station.name}
            </h3>

            <div className="mt-3">
                <span className="inline-block px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] rounded-md font-medium">
                    {station.type}
                </span>
            </div>
        </div>
    );
}
