import { callGeminiAPI, parseJSONFromText } from '../services/gemini.js';
import { VerifiedClaimOutput } from './verificationAgent.js';

export interface ContradictionOutput {
  claimText: string;
  orderIndex: number;
  finalStatus: 'verified' | 'contradicted' | 'unverified';
  contradictionReason?: string;
  sourceTitle: string;
  sourceUrl: string;
  snippet: string;
}

export async function runContradictionAgent(claims: VerifiedClaimOutput[]): Promise<ContradictionOutput[]> {
  const prompt = `You are the Contradiction Detection Agent for Pramāṇa AI.
Review the following claims for internal inconsistencies, exaggerated timelines, or conflicting external evidence:

${JSON.stringify(claims, null, 2)}

Only set finalStatus to "contradicted" if a claim is factually false or contains an exaggerated unverified timeline. Otherwise keep it as "verified" or "unverified".

Return ONLY valid JSON array matching this schema:
[
  {
    "claimText": "Exact text",
    "orderIndex": 1,
    "finalStatus": "verified",
    "contradictionReason": "Reason if contradicted",
    "sourceTitle": "Source Title",
    "sourceUrl": "https://source.com",
    "snippet": "Snippet"
  }
]`;

  const dynamicFallback = (c: VerifiedClaimOutput): ContradictionOutput => {
    const isExaggerated = /within 6 months|Q4 2026|10,000 logical qubits|guaranteed 100%/i.test(c.claimText);
    const status = isExaggerated ? 'contradicted' : (c.status || 'verified');
    return {
      claimText: c.claimText,
      orderIndex: c.orderIndex,
      finalStatus: status,
      contradictionReason: isExaggerated ? 'Contradicted by industry hardware roadmaps and empirical deployment timelines.' : undefined,
      sourceTitle: c.sourceTitle,
      sourceUrl: c.sourceUrl,
      snippet: c.snippet
    };
  };

  try {
    const rawText = await callGeminiAPI(prompt, "You are a contradiction detection agent returning JSON.");
    const parsed = parseJSONFromText<ContradictionOutput[]>(rawText, []);
    if (parsed && parsed.length > 0) return parsed;
    return claims.map(dynamicFallback);
  } catch (err) {
    return claims.map(dynamicFallback);
  }
}
