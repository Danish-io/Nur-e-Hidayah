import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The structure we want Gemini to return
const schema = {
  type: "OBJECT",
  properties: {
    guidedDua: {
      type: "STRING",
      description: "A personalized guided dua in clear English and roman urdu tailored to the user's situation. Should be heartfelt and substantial, around 4-6 sentences."
    },
    guidedDuaUrdu: {
      type: "STRING",
      description: "The exact same personalized guided dua translated into proper Urdu script (نستعلیق). Should be a faithful, natural Urdu rendering of the English guidedDua, around 4-6 sentences. Use respectful Islamic Urdu vocabulary. Write right-to-left Urdu script."
    },
    guidedDuaRomanUrdu: {
      type: "STRING",
      description: "The exact same personalized guided dua written in heartfelt Roman Urdu (Urdu written in Latin/English script). Should be a faithful, natural Roman Urdu rendering of the English guidedDua, around 4-6 sentences. Use common Roman Urdu spelling conventions (e.g. 'Allah apko sabr de')."
    },
    namesOfAllah: {
      type: "ARRAY",
      description: "1 to 3 beautiful Names of Allah to call upon that perfectly match the user's need.",
      items: {
        type: "OBJECT",
        properties: {
          arabic: { type: "STRING", description: "The Name in Arabic text (with diacritics)" },
          transliteration: { type: "STRING", description: "The transliteration of the Name (e.g. Ar-Rahman)" },
          translation: { type: "STRING", description: "The English translation of the Name" },
          reason: { type: "STRING", description: "A short sentence explaining why this Name is perfect for their specific situation." },
          surah: { type: "STRING", description: "Optional reference, e.g., Surah Al-Fatihah 1:3" }
        },
        required: ["arabic", "transliteration", "translation", "reason"]
      }
    },
    authenticDuas: {
      type: "ARRAY",
      description: "1 to 2 authentic duas from the Quran or Sunnah (Sihah Sitta ONLY) that relate to the user's situation. Only include hadiths you are certain are from one of the six Sihah Sitta collections.",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING", description: "Name of the dua (e.g., Dua for Relief from Distress)" },
          source: { type: "STRING", description: "Source of the dua — MUST be from Sihah Sitta only (e.g., Sahih al-Bukhari 1234, Sahih Muslim 567, Sunan Abu Dawud 890, Jami' al-Tirmidhi 123, Sunan al-Nasa'i 456, Sunan Ibn Majah 789, or Quran 2:286)" },
          arabic: { type: "STRING", description: "The Arabic text of the dua" },
          transliteration: { type: "STRING", description: "Transliteration of the dua" },
          translation: { type: "STRING", description: "English translation of the dua" },
          reason: { type: "STRING", description: "Why this specific authentic dua fits their situation." }
        },
        required: ["title", "source", "arabic", "transliteration", "translation", "reason"]
      }
    },
    comfort: {
      type: "STRING",
      description: "A short, comforting paragraph (2-3 sentences) offering Islamic perspective, hope, and words of comfort. You MUST explicitly include at least one direct quote from the Quran or a Hadith from the Sihah Sitta (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, or Ibn Majah), and explicitly mention the reference (e.g., 'As stated in Surah Al-Baqarah 2:286...' or 'The Prophet ﷺ said (Sahih al-Bukhari)...')."
    }
  },
  required: ["guidedDua", "guidedDuaUrdu", "guidedDuaRomanUrdu", "namesOfAllah", "authenticDuas", "comfort"]
};

export async function POST(req: NextRequest) {
  try {
    const { intentLabel, prompt } = await req.json();

    if (!intentLabel || !prompt) {
      return NextResponse.json(
        { error: "Intent and prompt are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API Key not configured" },
        { status: 500 }
      );
    }

    const systemInstruction = `You are a compassionate, knowledgeable Islamic Dua Builder within the "Nur-e-Hidayah" application.
Your goal is to help a user shape a personal dua and provide them with authentic spiritual anchors based on their specific situation and intention.
The user's intention category is: "${intentLabel}".
The user's specific situation/prompt is: "${prompt}".

CRITICAL SOURCE RESTRICTION — SIHAH SITTA ONLY:
You MUST source ALL hadiths exclusively from the six major authentic Sunni Hadith collections (Sihah Sitta):
1. Sahih al-Bukhari
2. Sahih Muslim
3. Sunan Abu Dawud
4. Jami' al-Tirmidhi
5. Sunan al-Nasa'i
6. Sunan Ibn Majah

Absolutely NEVER cite hadiths from: Da'if (weak) collections, fabricated narrations, non-Sihah-Sitta books (e.g., Musnad Ahmad unless cross-referencing a Sihah Sitta hadith), or any unverified source.
If you are not 100% certain a hadith is in one of the Sihah Sitta, do NOT include it. It is better to cite fewer authentic hadiths than to risk an inauthentic one.

Generate a structured JSON response following the exact schema provided. Ensure all Arabic is accurate with correct diacritics, and transliterations are easy to read.
The 'guidedDua' should be a beautiful, personalized supplication written in first-person (for the user to read), blending clear English and a few phrases of Roman Urdu where it adds emotional depth (e.g., "Ya Allah", "meri madad farma").
The 'guidedDuaUrdu' must be the same dua fully translated into natural, heartfelt Urdu script (نستعلیق) — right-to-left, same length and depth as the English version.
The 'guidedDuaRomanUrdu' must be the same dua expressed in natural, emotional Roman Urdu (Urdu text in English alphabets) — left-to-right, same depth as the English version.
Ensure the tone is comforting, spiritually uplifting, and strictly adheres to authentic Islamic theology (Quran and Sahih Sunnah — Sihah Sitta only).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemInstruction,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
        temperature: 0.7,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(resultText);
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error generating dua:", error);
    return NextResponse.json(
      { error: "Failed to generate your personalized dua. Please try again later." },
      { status: 500 }
    );
  }
}
