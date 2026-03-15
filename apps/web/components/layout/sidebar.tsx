"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "@/components/layout/sidebar-content";


export function Sidebar({ className }: { className?: string }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-[#1C1C1C] backdrop-blur-xl border-r border-white/5 transition-all duration-300 relative group",
                isCollapsed ? "w-20" : "w-64",
                className
            )}
        >
            {/* Button removed from here, moving to SidebarContent */}
            <SidebarContent isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        </div>
    );
}
