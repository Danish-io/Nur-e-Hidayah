import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { knowledgeBase } from '@/lib/data/knowledge-base';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: "OBJECT",
  properties: {
    answer: {
      type: "STRING",
      description: "A clear, concise answer in English based on Quran and Sihah Sitta. Reference specific Surahs or Hadiths."
    },
    answerUrdu: {
      type: "STRING",
      description: "The exact same answer translated into proper Urdu script (نستعلیق). Right-to-left."
    },
    answerRomanUrdu: {
      type: "STRING",
      description: "The exact same answer written in natural Roman Urdu (Urdu in Latin script). Left-to-right."
    }
  },
  required: ["answer", "answerUrdu", "answerRomanUrdu"]
};

export async function POST(request: Request) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const systemInstruction = `You are "Nur-e-Hidayah", a knowledgeable Islamic AI assistant. 
Your goal is to answer questions about the Quran and the Sihah Sitta (the six major authentic Sunni Hadith collections: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, and Ibn Majah).

User Question: "${query}"

Guidelines:
1. Provide accurate information based ONLY on authentic sources (Quran and Sihah Sitta).
2. If the answer is not found in these sources, politely state that you can only answer from these authentic collections.
3. Be compassionate and respectful.
4. Return the response in three formats:
   - 'answer': Clear English with references.
   - 'answerUrdu': Proper Urdu script (نستعلیق).
   - 'answerRomanUrdu': Natural Roman Urdu (e.g., "Allah ne farmaya...").

Context from local knowledge base (optional reference):
${JSON.stringify(knowledgeBase.slice(0, 5))} ... (use your internal vast knowledge of Quran/Sihah Sitta primarily)`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: systemInstruction,
            config: {
                // @ts-ignore
                responseMimeType: "application/json",
                responseSchema: schema as any,
                temperature: 0.7,
            }
        });

        const resultText = response.text;
        if (!resultText) throw new Error("No response from AI");

        const data = JSON.parse(resultText);
        return NextResponse.json(data);

    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ 
            answer: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.",
            answerUrdu: "معذرت، اس وقت میرے علمی ذخیرے سے رابطہ کرنے میں دشواری ہو رہی ہے۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
            answerRomanUrdu: "Mazrat, is waqt mere ilmi zakhire se rabta karne mein dushwari ho rahi hai. Baraye meherbani baad mein dobara koshish karein."
        });
    }
}
