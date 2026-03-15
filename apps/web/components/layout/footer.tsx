"use client";
import Link from "next/link";
import { Github, Mail, Code2, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/search")) {
        return null;
    }

    return (
        <footer className="bg-slate-50 dark:bg-zinc-900 py-12 border-t border-slate-200 dark:border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <h4 className="text-xl font-bold font-arabic text-emerald-600 dark:text-emerald-400">نور الهداية</h4>
                            <span className="text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">Nur-e-Hidayah</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                            Empowering your spiritual journey with advanced technology and authentic Islamic resources. 
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Links</h5>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/quran" className="hover:text-emerald-600 transition-colors">Quran</Link></li>
                            <li><Link href="/hadith" className="hover:text-emerald-600 transition-colors">Hadith</Link></li>
                            <li><Link href="/duas" className="hover:text-emerald-600 transition-colors">Duas</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact & About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Developer</h5>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <Code2 className="w-4 h-4 text-indigo-500" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Danish Shabbir</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed">
                            Full-stack dev building tools for the Ummah.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-zinc-800 gap-4">
                    <div className="flex flex-col items-center md:items-start space-y-1">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            © 2026 Nur-e-Hidayah by Danish Shabbir. All rights reserved.
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                            Developed with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> by Danish Shabbir
                        </p>
                    </div>
                    <div className="flex space-x-4 mt-6 md:mt-0">
                        <a href="https://github.com/Danish-io" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="GitHub">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="mailto:danishshabbir657@gmail.com" className="text-slate-400 hover:text-rose-500 transition-colors" title="Email">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
