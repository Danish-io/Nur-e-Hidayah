"use client";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
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
                        <h4 className="text-lg font-bold font-arabic text-quran-gold mb-4">نور الهداية</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                            Empowering your spiritual journey with advanced technology and authentic resources.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">Links</h5>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/quran" className="hover:text-quran-gold">Quran</Link></li>
                            <li><Link href="/search" className="hover:text-quran-gold">Search</Link></li>
                            <li><Link href="/about" className="hover:text-quran-gold">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/privacy" className="hover:text-quran-gold">Privacy</Link></li>
                            <li><Link href="/terms" className="hover:text-quran-gold">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-zinc-800">
                    <p className="text-sm text-slate-400">© 2024 Nur-e-Hidayah. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-slate-400 hover:text-quran-gold"><Github className="w-5 h-5" /></Link>
                        <Link href="#" className="text-slate-400 hover:text-quran-gold"><Twitter className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
