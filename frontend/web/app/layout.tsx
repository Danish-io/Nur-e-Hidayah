import type { Metadata } from "next";
import { Inter, Amiri, Playfair_Display, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const naskh = Noto_Naskh_Arabic({ weight: ["400", "500", "600", "700"], subsets: ["arabic"], variable: "--font-naskh" });

export const metadata: Metadata = {
    title: "Nur-e-Hidayah",
    description: "Advanced Quran Web Application",
    manifest: "/manifest.json",
    icons: {
        icon: "/icon.png",
        apple: "/icons/icon-192x192.png",
        shortcut: "/icon.png",
    },
};

import { BookmarkProvider } from "@/lib/bookmarks-context";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { I18nProvider } from "@/lib/i18n";
import { DailyAyah } from "@/components/quran/daily-ayah";
import { ReadingSettingsProvider } from "@/context/reading-settings-context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${amiri.variable} ${playfair.variable} ${naskh.variable} font-sans antialiased overflow-x-hidden relative`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    forcedTheme="dark"
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <I18nProvider>
                            <ReadingSettingsProvider>
                                <BookmarkProvider>
                                    <div className="flex min-h-screen relative overflow-hidden">
                                        {/* Ambient "Nur" Layers */}
                                        <div className="geometric-pattern" />
                                        <div className="fixed inset-0 z-0 pointer-events-none">
                                            {/* Soft Radials */}
                                            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px] animate-breathe" />
                                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[100px] animate-pulse-slow" />

                                            {/* Particle Drift (Simulated) */}
                                            <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-white/20 rounded-full animate-particle" style={{ animationDelay: '1s' }} />
                                            <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-emerald-400/10 rounded-full animate-particle" style={{ animationDelay: '5s' }} />
                                            <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-amber-400/5 rounded-full animate-particle" style={{ animationDelay: '10s' }} />
                                        </div>

                                        <Sidebar className="hidden lg:block sticky top-0 h-screen shrink-0 z-20" />

                                        <div className="flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-700">
                                            <Navbar />
                                            <div className="px-4 py-2 flex justify-center">
                                                <DailyAyah />
                                            </div>
                                            <main className="flex-1">
                                                {children}
                                            </main>
                                        </div>
                                    </div>
                                </BookmarkProvider>
                            </ReadingSettingsProvider>
                        </I18nProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

