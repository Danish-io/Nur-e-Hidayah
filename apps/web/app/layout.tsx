import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" });

export const metadata: Metadata = {
    title: "Nur-e-Hidayah",
    description: "Advanced Quran Web Application",
    manifest: "/manifest.json",
};

import { BookmarkProvider } from "@/lib/bookmarks-context";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { I18nProvider } from "@/lib/i18n";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${amiri.variable} font-sans antialiased overflow-x-hidden`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <I18nProvider>
                            <BookmarkProvider>
                                <div className="flex min-h-screen relative">

                                    {/* Ambient Background Layer */}
                                    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-3xl animate-breathe" />
                                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-3xl animate-pulse-slow" />
                                        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-amber-500/5 blur-3xl animate-float-slow" />
                                    </div>

                                    <Sidebar className="hidden lg:block sticky top-0 h-screen shrink-0 z-20" />

                                    <div className="flex-1 flex flex-col min-w-0 relative z-10">
                                        <Navbar />
                                        <main className="flex-1">
                                            {children}
                                        </main>
                                    </div>
                                </div>
                            </BookmarkProvider>
                        </I18nProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

