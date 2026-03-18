"use client";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Search, Sparkles, Send } from "lucide-react";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<{ 
        role: 'user' | 'ai', 
        content: string,
        contentUrdu?: string,
        contentRomanUrdu?: string,
        selectedLang?: 'en' | 'ur' | 'ru'
    }[]>([
        { 
            role: 'ai', 
            content: "Assalamu Alaikum! I am Nur-e-Hidayah. Ask me any question about the Quran and Hadith, and I will find relevant answers from the Sihah Sitta — the six major authentic Sunni Hadith collections.",
            contentUrdu: "اسلام علیک! میں نورِ ہدایت ہوں۔ مجھ سے قرآن اور حدیث کے بارے میں کوئی بھی سوال پوچھیں، اور میں صحاح ستہ سے متعلقہ جوابات تلاش کروں گا۔",
            contentRomanUrdu: "Assalamu Alaikum! Main Nur-e-Hidayah hoon. Mujh se Quran aur Hadith ke bare mein koi bhi sawal poochein, aur main Sihah Sitta se mutaliqa jawab talaash karungi.",
            selectedLang: 'en'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US'; // Default to English/Roman Hindi mix
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
            };

            recognition.start();
        } else {
            alert("Voice recognition is not supported in this browser.");
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = query;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setQuery("");
        setLoading(true);

        try {
            // connecting to local mock service (since python failed)
            const res = await fetch("/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: userMsg })
            });

            const data = await res.json();
            setMessages(prev => [...prev, { 
                role: 'ai', 
                content: data.answer || "Sorry, I couldn't find an answer.",
                contentUrdu: data.answerUrdu,
                contentRomanUrdu: data.answerRomanUrdu,
                selectedLang: 'en'
            }]);
        } catch (err) {
            // Fallback to mock response if API fails
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: "I am currently running in offline mode. Here is a simulated answer: The Quran emphasizes patience (Sabr) in Surah Al-Baqarah (2:153): 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.'"
                }]);
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">


            <div className="flex-1 container mx-auto px-4 pt-24 pb-24 max-w-3xl flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                ? 'bg-quran-gold text-white rounded-br-none select-text'
                                : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-bl-none shadow-sm'
                                }`}>
                                {msg.role === 'ai' && (
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center text-xs text-quran-gold font-bold">
                                            <Sparkles className="w-3 h-3 mr-1" /> Nur-e-Hidayah
                                        </div>
                                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 rounded-full p-0.5 border border-gray-200 dark:border-zinc-700">
                                            <button
                                                onClick={() => {
                                                    const newMessages = [...messages];
                                                    newMessages[idx].selectedLang = 'en';
                                                    setMessages(newMessages);
                                                }}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${msg.selectedLang === 'en' ? 'bg-quran-gold text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                            >
                                                EN
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const newMessages = [...messages];
                                                    newMessages[idx].selectedLang = 'ur';
                                                    setMessages(newMessages);
                                                }}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${msg.selectedLang === 'ur' ? 'bg-quran-gold text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                            >
                                                اردو
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const newMessages = [...messages];
                                                    newMessages[idx].selectedLang = 'ru';
                                                    setMessages(newMessages);
                                                }}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${msg.selectedLang === 'ru' ? 'bg-quran-gold text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                            >
                                                RU
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <p 
                                    className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap select-text ${msg.selectedLang === 'ur' ? 'text-right font-arabic text-xl leading-[1.8]' : ''}`}
                                    dir={msg.selectedLang === 'ur' ? 'rtl' : 'ltr'}
                                >
                                    {msg.selectedLang === 'ur' ? msg.contentUrdu : msg.selectedLang === 'ru' ? msg.contentRomanUrdu : msg.content}
                                </p>
                            </div>
                        </div>
                    ))}

                    {messages.length === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                            {[
                                "Namaz ka hukum kya hai?",
                                "Sabr ke bare me Quran kya kehta hai?",
                                "Jannat kin logon ko milegi?",
                                "Roza rakhne ka maqsad kya hai?"
                            ].map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setQuery(q)}
                                    className="text-left text-sm p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-quran-gold dark:hover:border-quran-gold transition-colors text-slate-700 dark:text-slate-300"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 rounded-bl-none shadow-sm flex items-center space-x-2">
                                <div className="w-2 h-2 bg-quran-gold rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-quran-gold rounded-full animate-bounce delay-75" />
                                <div className="w-2 h-2 bg-quran-gold rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSearch} className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-black/80 backdrop-blur border-t border-gray-200 dark:border-zinc-800">
                    <div className="container mx-auto max-w-3xl relative flex items-center">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Ask a question from Quran & Sihah Sitta (e.g., 'Sabr ke bare me Quran kya kehta hai?')"}
                            className={`w-full h-14 pl-5 pr-28 rounded-full border ${isListening ? 'border-red-500 ring-2 ring-red-500/50' : 'border-gray-300 dark:border-zinc-700'} bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-quran-gold/50 transition-all`}
                        />
                        <div className="absolute right-2 top-2 flex space-x-2 items-center">
                            <Button
                                type="button"
                                size="icon"
                                onClick={startListening}
                                className={`h-10 w-10 rounded-full transition-colors ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isListening ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                </svg>
                            </Button>
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-quran-gold hover:bg-quran-gold/90"
                                disabled={loading}
                            >
                                <Send className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
