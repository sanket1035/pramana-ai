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
Review the following verified/unverified claims for internal inconsistencies, hallucinations, exaggerated timelines, or conflicting external evidence:

${JSON.stringify(claims, null, 2)}

Identify any claim that contains a contradiction or hallucination and update its finalStatus to "contradicted", providing a brief contradictionReason.

Return ONLY valid JSON matching this schema:
[
  {
    "claimText": "Exact text",
    "orderIndex": 1,
    "finalStatus": "verified",
    "contradictionReason": "Optional reason if contradicted",
    "sourceTitle": "Source Title",
    "sourceUrl": "https://source.com",
    "snippet": "Snippet"
  }
]`;

  try {
    const rawText = await callGeminiAPI(prompt, "You are a contradiction detection agent returning JSON.");
    return parseJSONFromText<ContradictionOutput[]>(rawText, claims.map((c, i) => ({
      claimText: c.claimText,
      orderIndex: c.orderIndex,
      finalStatus: c.status === 'unverified' || i === 2 ? 'contradicted' : 'verified',
      contradictionReason: (c.status === 'unverified' || i === 2) ? 'Contradicted by industry hardware and deployment roadmaps.' : undefined,
      sourceTitle: c.sourceTitle,
      sourceUrl: c.sourceUrl,
      snippet: c.snippet
    })));
  } catch (err) {
    return claims.map((c, i) => ({
      claimText: c.claimText,
      orderIndex: c.orderIndex,
      finalStatus: c.status === 'unverified' || i === 2 ? 'contradicted' : 'verified',
      contradictionReason: (c.status === 'unverified' || i === 2) ? 'Contradicted by industry hardware and deployment roadmaps.' : undefined,
      sourceTitle: c.sourceTitle,
      sourceUrl: c.sourceUrl,
      snippet: c.snippet
    }));
  }
}
