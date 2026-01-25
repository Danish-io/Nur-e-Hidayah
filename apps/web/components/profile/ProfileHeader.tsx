"use client";

import { useSession } from "next-auth/react";
import { User, Calendar, MapPin, Shield } from "lucide-react";
import { LocationSelector } from "@/components/profile/LocationSelector";

export function ProfileHeader() {
    const { data: session } = useSession();

    return (
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-[2px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-10 h-10 text-emerald-600" />
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        {session?.user?.name || "Guest User"}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-center md:justify-start gap-2">
                        {session?.user?.email || "Sign in to sync your journey"}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            <span>Ramadan 1447</span>
                        </div>
                        {/* New Location Selector */}
                        <LocationSelector />

                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>Seeker Level 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
