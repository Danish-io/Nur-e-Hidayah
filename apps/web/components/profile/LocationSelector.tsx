"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Search, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useRamadanTimes } from "@/hooks/useRamadanTimes";

export function LocationSelector() {
    const { locationName, changeLocation, resetLocation } = useRamadanTimes();
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        if (city && country) {
            changeLocation(city, country);
            setOpen(false);
        }
    };

    const handleReset = () => {
        resetLocation();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group">
                    <MapPin className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                        {locationName}
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-xl">Change Location</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">City</label>
                        <input
                            type="text"
                            placeholder="e.g. London, Istanbul, New York"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">Country</label>
                        <input
                            type="text"
                            placeholder="e.g. UK, Turkey, USA"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6">
                        <Search className="w-4 h-4 mr-2" />
                        Find Prayer Times
                    </Button>
                    <Button variant="ghost" onClick={handleReset} className="w-full text-slate-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Auto-Detect
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
