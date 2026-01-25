"use client";

import { motion } from "framer-motion";
import { Scholar } from "@/types/scholar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ScholarCardProps {
    scholar: Scholar;
    lang: 'en' | 'ar';
}

export function ScholarCard({ scholar, lang }: ScholarCardProps) {
    const isRtl = lang === 'ar';

    return (
        <Link href={`/scholars/${scholar.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full"
            >
                <Card className="h-full hover:shadow-lg transition-shadow bg-card/50 backdrop-blur border-border/50 cursor-pointer overflow-hidden group">
                    <div className="h-2 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className={cn("space-y-2", isRtl ? "text-right" : "text-left")}>
                        <div className="flex justify-between items-start gap-4">
                            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
                                {scholar.name[lang]}
                            </CardTitle>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                                {scholar.school}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{scholar.era}</span>
                            <span>•</span>
                            <span>{scholar.region}</span>
                        </p>
                    </CardHeader>
                    <CardContent className={cn(isRtl ? "text-right" : "text-left")}>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {scholar.bio.kids[lang]}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}
