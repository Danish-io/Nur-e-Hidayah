import Image from "next/image";
import { Mail, Github, Globe, Heart, MessageCircle, Code2, ExternalLink } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4 font-sans text-slate-800 dark:text-slate-100">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <header className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                            <Heart className="w-7 h-7 text-rose-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-gray-100 mb-3">Contact & About</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                        Nur-e-Hidayah is a free Islamic platform built with love. Got feedback, a bug report, or just want to say Salaam? We&apos;d love to hear from you.
                    </p>
                    <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full opacity-50 mt-5"></div>
                </header>

                {/* Developer Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h2 className="text-xl font-bold">About the Developer</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Profile Photo */}
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-200 dark:border-emerald-800 shrink-0">
                            <Image
                                src="/danish-profile.jpg"
                                alt="Danish — Developer of Nur-e-Hidayah"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-1">Danish Shabbir</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                                Full-stack developer passionate about building tools that connect people with Islam. Nur-e-Hidayah was created to make Islamic knowledge accessible to everyone, anywhere — free of charge.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">Next.js</span>
                                <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">TypeScript</span>
                                <span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full">Tailwind CSS</span>
                                <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full">Netlify</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Options */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <a href="mailto:danishshabbir657@gmail.com"
                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 flex items-center gap-4 hover:border-rose-200 dark:hover:border-rose-800/50 hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                            <Mail className="w-6 h-6 text-rose-500" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-slate-800 dark:text-gray-100">Email Us</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">danishshabbir657@gmail.com</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto shrink-0 group-hover:text-rose-500 transition-colors" />
                    </a>

                    <a href="https://github.com/Danish-io" target="_blank" rel="noopener noreferrer"
                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 flex items-center gap-4 hover:border-slate-300 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <Github className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-gray-100">GitHub</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">github.com/Danish-io</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto shrink-0 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors" />
                    </a>

                    <a href="https://nur-e-hidayah.netlify.app" target="_blank" rel="noopener noreferrer"
                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 flex items-center gap-4 hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                            <Globe className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-gray-100">Website</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">nur-e-hidayah.netlify.app</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto shrink-0 group-hover:text-emerald-500 transition-colors" />
                    </a>

                    <a href="mailto:danishshabbir657@gmail.com"
                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-md transition-all duration-200">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                            <MessageCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-gray-100">Feedback</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Report bugs or suggest features</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto shrink-0 group-hover:text-blue-500 transition-colors" />
                    </a>
                </div>

                {/* Mission Statement */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 p-8 text-center">
                    <p className="text-emerald-800 dark:text-emerald-200 font-arabic text-2xl mb-4 leading-loose">
                        وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 italic mb-2">&ldquo;My success is not but through Allah&rdquo; — Quran 11:88</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                        This platform is 100% free and ad-free. Built as a Sadaqah Jariyah — a continuous charity.
                    </p>
                </div>

            </div>
        </div>
    );
}
