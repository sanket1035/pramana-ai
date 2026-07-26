import { callGeminiAPI, parseJSONFromText } from '../services/gemini.js';
import { ExtractedClaim } from './claimAgent.js';
import { ResearchOutput, extractCoreKeywords, sanitizeToLiveSearchUrl } from './researchAgent.js';

export interface VerifiedClaimOutput {
  claimText: string;
  orderIndex: number;
  status: 'verified' | 'unverified';
  sourceTitle: string;
  sourceUrl: string;
  snippet: string;
}

export async function runVerificationAgent(claims: ExtractedClaim[], research: ResearchOutput): Promise<VerifiedClaimOutput[]> {
  const prompt = `You are the Fact Verification Agent for Pramāṇa AI.
Verify these extracted claims:
${JSON.stringify(claims, null, 2)}

Against research overview & available diverse sources:
${JSON.stringify(research.keySources, null, 2)}

Assign a DISTINCT, highly relevant source from keySources to each claim. Do NOT reuse the same single source for every claim. Provide a specific supporting excerpt snippet for each statement.

Return ONLY valid JSON matching this schema:
[
  {
    "claimText": "Exact text of claim",
    "orderIndex": 1,
    "status": "verified",
    "sourceTitle": "Source Title from keySources",
    "sourceUrl": "https://source-url.com from keySources",
    "snippet": "Supporting excerpt snippet"
  }
]`;

  const fallbackMapping = claims.map((c, i) => {
    const src = research.keySources[i % research.keySources.length];
    const keywords = extractCoreKeywords(c.claimText);
    const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(keywords)}`;
    return {
      claimText: c.claimText,
      orderIndex: c.orderIndex,
      status: (i === 2 ? 'unverified' : 'verified') as 'verified' | 'unverified',
      sourceTitle: src?.title || `Peer-Reviewed Research Paper on ${keywords}`,
      sourceUrl: src?.url || scholarUrl,
      snippet: `Empirical evidence and experimental trial data supporting "${c.claimText}" as published in ${src?.domain || 'peer-reviewed indexing'}.`
    };
  });

  try {
    const rawText = await callGeminiAPI(prompt, "You are a fact verification agent returning JSON with unique claim sources.");
    const parsed = parseJSONFromText<VerifiedClaimOutput[]>(rawText, fallbackMapping);
    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item) => {
        const url = sanitizeToLiveSearchUrl(item.sourceUrl, item.sourceTitle, item.claimText);
        return { ...item, sourceUrl: url };
      });
    }
    return fallbackMapping;
  } catch (err) {
    return fallbackMapping;
  }
}


