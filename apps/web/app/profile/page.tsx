"use client";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { RamadanStats } from "@/components/profile/RamadanStats";
import { motion } from "framer-motion";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black/50 pb-20">
            <div className="container mx-auto px-4 py-8 space-y-8">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ProfileHeader />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <RamadanStats />
                </motion.div>

            </div>
        </div>
    );
}
