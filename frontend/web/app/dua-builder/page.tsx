"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Shield, Compass, Leaf, RefreshCcw, Search, Sparkles, 
  Copy, Save, BookOpen, HeartHandshake, ChevronRight, Check,
  Trash2, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  intents, 
  IntentId, 
  dataLookup, 
  GeneratedData, 
  Intent 
} from "./data";

type SavedDua = {
  id: string;
  intentLabel: string;
  prompt: string;
  guidedDua: string;
  date: string;
};

type DuaLang = "en" | "ur" | "ru";

const iconMap: Record<IntentId, React.ElementType> = {
  ease: Leaf,
  thanks: Heart,
  forgiveness: RefreshCcw,
  guidance: Compass,
  protection: Shield
};

export default function DuaBuilderPage() {
  const [selectedIntent, setSelectedIntent] = useState<IntentId | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedData | null>(null);
  const [savedDuas, setSavedDuas] = useState<SavedDua[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [duaLang, setDuaLang] = useState<DuaLang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("savedDuas");
    if (saved) {
      try {
        setSavedDuas(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved duas", e);
      }
    }
  }, []);

  const handleBuildDua = async () => {
    if (!selectedIntent || !prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);
    setSaved(false);
    setDuaLang("en");
    
    try {
      const intentObj = intents.find(i => i.id === selectedIntent);
      
      const response = await fetch("/api/dua-builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intentLabel: intentObj?.label || selectedIntent,
          prompt: prompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "OpenAI API Key not configured" || data.error?.includes("API Key")) {
           alert("Notice: Gemini API Key is missing in your .env.local file. Falling back to the static pre-defined dua template. To get dynamic personalized responses, please add GEMINI_API_KEY to your environment variables.");
        } else {
           throw new Error(data.error || "Failed to generate dua");
        }
        setResult(dataLookup[selectedIntent]);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      alert("Notice: Could not connect to the AI service. Showing a pre-defined dua template instead.");
      setResult(dataLookup[selectedIntent]);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDuaText = () => {
    if (!result) return "";
    if (duaLang === "ur" && result.guidedDuaUrdu) return result.guidedDuaUrdu;
    if (duaLang === "ru" && result.guidedDuaRomanUrdu) return result.guidedDuaRomanUrdu;
    return result.guidedDua;
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(getDuaText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (result && selectedIntent && !saved) {
      const intentObj = intents.find(i => i.id === selectedIntent);
      const newDua: SavedDua = {
        id: Date.now().toString(),
        intentLabel: intentObj?.label || "Custom",
        prompt: prompt,
        guidedDua: result.guidedDua,
        date: new Date().toLocaleDateString()
      };
      
      const newSaved = [newDua, ...savedDuas];
      setSavedDuas(newSaved);
      localStorage.setItem("savedDuas", JSON.stringify(newSaved));
      setSaved(true);
    }
  };

  const handleDeleteSaved = (id: string) => {
    const newSaved = savedDuas.filter(d => d.id !== id);
    setSavedDuas(newSaved);
    localStorage.setItem("savedDuas", JSON.stringify(newSaved));
  };

  return (
    <div className="min-h-screen bg-[#111111] text-slate-300 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intention Section */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Search className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Start with your intention</h1>
          </div>
          <p className="text-sm text-slate-400 mb-6 pl-13">Keep it honest, specific, and in your own words.</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {intents.map((intent) => {
              const Icon = iconMap[intent.id];
              const isSelected = selectedIntent === intent.id;
              return (
                <button
                  key={intent.id}
                  onClick={() => {
                    setSelectedIntent(intent.id);
                    // If prompt is empty or uses a starter from another intent, clear it
                    if (prompt === '' || intents.some(i => i.prompts.includes(prompt))) {
                      setPrompt('');
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                    isSelected 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                      : "bg-[#2A2A2A] text-slate-300 border-white/5 hover:bg-[#333333] hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {intent.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 mb-4 transition-opacity duration-300 h-4">
            {selectedIntent ? intents.find(i => i.id === selectedIntent)?.description : "Relief, provision, hardship, or a pressing need."}
          </p>

          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-slate-300">What do you want to ask Allah for?</label>
                <span className="text-xs text-slate-500">{prompt.length}/600</span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, 600))}
                placeholder="Example: I am anxious about my future, I want Allah to calm my heart, guide my next step, and protect my family."
                className="w-full h-32 bg-[#161616] border border-white/10 rounded-xl p-4 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
              />
              {prompt && (
                <button 
                  onClick={() => setPrompt("")}
                  className="absolute bottom-4 right-4 text-xs text-slate-500 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 italic">Mention the situation, what you fear or hope for, and who else you want to include.</p>

            <AnimatePresence mode="popLayout">
              {selectedIntent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-3 pt-2"
                >
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span>Starter Prompts</span>
                    {/* <button className="text-emerald-500/80 hover:text-emerald-400">Try another set</button> */}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {intents.find(i => i.id === selectedIntent)?.prompts.map((starter, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPrompt(starter)}
                        className="bg-[#2A2A2A] hover:bg-[#333333] border border-white/5 text-slate-300 text-xs py-2 px-4 rounded-full transition-colors text-left"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 flex items-center gap-4">
              <Button 
                onClick={handleBuildDua}
                disabled={!selectedIntent || !prompt.trim() || isGenerating}
                className={cn(
                  "bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  isGenerating ? "animate-pulse" : ""
                )}
              >
                {isGenerating 
                  ? "Building..." 
                  : !selectedIntent 
                    ? "Choose an intention first" 
                    : !prompt.trim() 
                      ? "Describe your situation" 
                      : "Build My Dua"
                }
              </Button>
              <Link href="/duas" className="text-sm text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                Browse the full dua library
              </Link>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Guided Dua Block */}
            <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight mb-2">Your guided dua</h2>
                  <p className="text-sm text-slate-400">Use this as a starting point, then make dua in your own words as well.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="bg-[#2A2A2A] border-white/10 hover:bg-[#333333] text-slate-300 h-9 gap-2">
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSave} 
                    disabled={saved}
                    className={cn(
                      "border-white/10 h-9 gap-2 transition-all",
                      saved ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-[#2A2A2A] hover:bg-[#333333] text-slate-300"
                    )}
                  >
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>

              <div className="bg-[#161616] rounded-xl p-6 border border-white/5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Your Personal Dua</h3>
                  <div className="flex items-center gap-1 bg-[#2A2A2A] rounded-full p-1 border border-white/5">
                    <button
                      onClick={() => setDuaLang("en")}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        duaLang === "en"
                          ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      English
                    </button>
                    {result.guidedDuaUrdu && (
                      <button
                        onClick={() => setDuaLang("ur")}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          duaLang === "ur"
                            ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        اردو
                      </button>
                    )}
                    {result.guidedDuaRomanUrdu && (
                      <button
                        onClick={() => setDuaLang("ru")}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          duaLang === "ru"
                            ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        Roman Urdu
                      </button>
                    )}
                  </div>
                </div>
                <p
                  className={cn(
                    "text-slate-200 leading-relaxed",
                    duaLang === "en" || duaLang === "ru"
                      ? "text-lg font-serif"
                      : "text-xl font-arabic text-right leading-[2.2]",
                    duaLang === "ur" && "direction-rtl"
                  )}
                  dir={duaLang === "ur" ? "rtl" : "ltr"}
                >
                  {getDuaText()}
                </p>
              </div>

              {/* Names of Allah */}
              <div className="mb-0">
                 <h3 className="text-slate-300 font-bold mb-4">Names of Allah to call upon</h3>
                 <p className="text-sm text-slate-500 mb-4">Begin your dua by praising Allah through names that match your need.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.namesOfAllah.map((name, idx) => (
                      <div key={idx} className="bg-[#2A2A2A] rounded-xl p-5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-arabic text-2xl text-white">{name.arabic}</span>
                          {name.surah && <span className="text-[10px] text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md">{name.surah}</span>}
                        </div>
                        <h4 className="font-bold text-slate-200 text-sm">{name.transliteration}</h4>
                        <p className="text-xs text-slate-400 mb-3">{name.translation}</p>
                        <p className="text-xs text-emerald-400/80 bg-emerald-400/5 p-2 rounded-lg">{name.reason}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Authentic Duas */}
            <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-tight mb-2">Authentic duas from the Sihah Sitta</h2>
              <p className="text-sm text-slate-400 mb-6">Verified supplications from the six major authentic Sunni Hadith collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i &amp; Ibn Majah) that best fit your request.</p>
              
              <div className="space-y-6">
                {result.authenticDuas.map((dua, idx) => (
                  <div key={idx} className="bg-[#161616] rounded-xl p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                       <div>
                         <h3 className="font-bold text-emerald-400">{dua.title}</h3>
                         <p className="text-xs text-slate-500">{dua.source}</p>
                       </div>
                    </div>
                    
                    <div className="bg-[#2A2A2A] rounded-xl p-6 flex items-center justify-center mb-6 min-h-[120px]">
                      <p className="font-arabic text-3xl leading-loose text-white text-center" dir="rtl">
                        {dua.arabic}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Transliteration</span>
                        <p className="text-sm text-slate-300 italic">{dua.transliteration}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Translation</span>
                        <p className="text-sm text-slate-200">{dua.translation}</p>
                      </div>
                      <div className="pt-4 border-t border-white/5 mt-4">
                        <p className="text-xs text-emerald-400/80">
                          <span className="font-bold">Why this dua fits your situation:</span> {dua.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to make this dua & Comfort */}
            <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
               <h2 className="text-xl font-bold text-white tracking-tight mb-4">How To Make This Dua</h2>
               <ul className="space-y-3 mb-8">
                 <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span><strong className="text-emerald-400">Best times to make this specific dua:</strong> The last third of the night is particularly blessed, as well as after obligatory prayers and during times of distress.</span>
                 </li>
                 <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span><strong className="text-emerald-400">How to prepare spiritually:</strong> Begin with wudu (ablution), face the qibla, and start your dua with praise for Allah, acknowledging His names and attributes.</span>
                 </li>
                 <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span><strong className="text-emerald-400">How to combine the personal English dua with the authentic Arabic duas above:</strong> Recite the personal dua first, then follow with the Arabic duas, reflecting on their meanings and how they relate to your situation.</span>
                 </li>
               </ul>

               <div className="bg-[#161616] rounded-xl p-6 border border-white/5">
                 <h3 className="text-emerald-400 text-sm font-bold tracking-wider mb-2">Words of Comfort</h3>
                 <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-emerald-500/50 pl-4 py-1">
                   {result.comfort}
                 </p>
               </div>
            </div>
            
          </motion.div>
        )}

        {!result && (
          <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-sm font-bold text-emerald-500">1</div>
                <p className="text-sm text-slate-300">Choose the type of dua you need right now.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-sm font-bold text-emerald-500">2</div>
                <p className="text-sm text-slate-300">Describe your situation in plain language.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-sm font-bold text-emerald-500">3</div>
                <p className="text-sm text-slate-300">Use the guided personal dua, then recite the authentic duas from the Sihah Sitta below.</p>
              </div>
            </div>
          </div>
        )}

        {/* Ledger Section */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-2">Personal dua ledger</h2>
          <p className="text-sm text-slate-400 mb-6">Saved locally on this device so you can return to meaningful duas later.</p>

          {savedDuas.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-[#161616]">
              <p className="text-sm text-slate-500">Save a dua after generating one and it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedDuas.map(dua => (
                <div key={dua.id} className="bg-[#161616] p-5 rounded-xl border border-white/5 group hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-[#2A2A2A] text-emerald-400 px-3 py-1 rounded-full">{dua.intentLabel}</span>
                      <span className="text-xs text-slate-500">{dua.date}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteSaved(dua.id)}
                      className="text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 mb-2 font-serif">{dua.guidedDua.length > 150 ? dua.guidedDua.substring(0, 150) + "..." : dua.guidedDua}</p>
                  <p className="text-xs text-slate-500"><strong>Prompt:</strong> {dua.prompt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
