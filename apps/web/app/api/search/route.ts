import { NextResponse } from 'next/server';

import { knowledgeBase } from '@/lib/data/knowledge-base';
import { romanHindiDictionary } from '@/lib/data/roman-hindi-dictionary';

// Pre-compute a reverse map for O(1) lookup
// Maps every word (key & values) -> Set of all synonyms
const synonymMap = new Map<string, Set<string>>();

Object.entries(romanHindiDictionary).forEach(([key, values]) => {
    // collection of all related words including the key itself
    const allWords = new Set([key, ...values]);

    allWords.forEach(word => {
        if (!synonymMap.has(word)) {
            synonymMap.set(word, new Set());
        }
        // Add all other words to this word's set
        allWords.forEach(w => synonymMap.get(word)?.add(w));
    });
});

export async function POST(request: Request) {
    const body = await request.json();
    const originalQuery = body.query.trim().toLowerCase();

    // 1. Tokenize and Expand
    const tokens = originalQuery.split(/\s+/);
    const expandedTokens = new Set<string>();

    tokens.forEach((token: string) => {
        expandedTokens.add(token); // Add original token

        // Add synonyms if they exist
        if (synonymMap.has(token)) {
            synonymMap.get(token)?.forEach(syn => expandedTokens.add(syn));
        }
    });

    // Create a massive search string for substring matching
    // This allows "namaz" to match "namazi" or similar variations if they occur
    const expandedQueryString = Array.from(expandedTokens).join(" ");

    // 2. Score Knowledge Base Items
    let bestMatch: { answer: string, score: number } | null = null;

    for (const item of knowledgeBase) {
        let score = 0;

        for (const keyword of item.keywords) {
            // Check if keyword exists in our expanded query string
            if (expandedQueryString.includes(keyword)) {
                score++;
            }
        }

        // Update best match if this item checks out
        if (score > 0) {
            // If scores are tied, the earlier entry takes precedence (simplistic tie-breaking)
            if (!bestMatch || score > bestMatch.score) {
                bestMatch = { answer: item.answer, score };
            }
        }
    }

    // Default response
    let answer = "I'm sorry, I couldn't find a specific answer to that in my knowledge base. Please try asking about Namaz, Roza, Zakat, Hajj, or Wuzu.";

    if (bestMatch) {
        answer = bestMatch.answer;
    }

    return NextResponse.json({ answer });
}
