"use client";

import { useState } from "react";
import { BookOpen, Download, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const QURAN_PDF_URL = "https://ia801301.us.archive.org/5/items/QuranPDF/Quran.pdf";

export default function QuranPdfPage() {
    const [showInfo, setShowInfo] = useState(true);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/quran"
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-400" />
                            <h1 className="text-lg font-semibold text-white">
                                Quran Sharif
                                <span className="text-sm font-normal text-slate-400 ml-2">PDF</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={QURAN_PDF_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-sm"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">Open in New Tab</span>
                        </a>
                        <a
                            href={QURAN_PDF_URL}
                            download="Quran-Sharif.pdf"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download PDF</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            {showInfo && (
                <div className="max-w-7xl mx-auto px-4 mt-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <p className="text-emerald-300 font-medium">
                                    القرآن الكريم — Al-Quran Al-Kareem
                                </p>
                                <p className="text-slate-400 mt-1">
                                    Complete Quran Sharif in standard Uthmani Arabic script.
                                    You can read directly below or download the PDF for offline reading.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowInfo(false)}
                            className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-4 shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* PDF Viewer */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl" style={{ height: "calc(100vh - 160px)" }}>
                    <iframe
                        src={`${QURAN_PDF_URL}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                        className="w-full h-full border-0"
                        title="Quran Sharif PDF"
                        allow="fullscreen"
                    />
                </div>
            </div>

            {/* Footer Note */}
            <div className="max-w-7xl mx-auto px-4 pb-6">
                <p className="text-center text-xs text-slate-500">
                    Source: Internet Archive — Public Domain Quran PDF in Uthmani Script
                </p>
            </div>
        </div>
    );
}
