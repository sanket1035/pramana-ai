import { callGeminiAPI, parseJSONFromText } from '../services/gemini.js';
import { ResearchOutput } from './researchAgent.js';

export interface ExtractedClaim {
  claimText: string;
  orderIndex: number;
}

export async function runClaimAgent(query: string, researchOutput: ResearchOutput): Promise<ExtractedClaim[]> {
  const prompt = `You are the Claim Extraction Agent for Pramāṇa AI.
Given the query: "${query}" and research findings:
"${researchOutput.rawFindings}"

Deconstruct the topic into 4 distinct, atomic, verifiable factual claims. Ensure at least one claim is a common misconception or unverified statement to test the pipeline.

Return ONLY valid JSON matching this schema:
[
  { "claimText": "Atomic verifiable statement 1", "orderIndex": 1 },
  { "claimText": "Atomic verifiable statement 2", "orderIndex": 2 },
  { "claimText": "Atomic verifiable statement 3", "orderIndex": 3 },
  { "claimText": "Atomic verifiable statement 4", "orderIndex": 4 }
]`;

  try {
    const rawText = await callGeminiAPI(prompt, "You are a claim extraction agent outputting a JSON array.");
    return parseJSONFromText<ExtractedClaim[]>(rawText, [
      { claimText: `Primary mechanism associated with ${query} is proven theoretically.`, orderIndex: 1 },
      { claimText: `Official standards for ${query} were published in peer-reviewed journals.`, orderIndex: 2 },
      { claimText: `Commercial deployment of ${query} is projected to happen within 6 months.`, orderIndex: 3 },
      { claimText: `Existing security frameworks remain resilient against early implementations of ${query}.`, orderIndex: 4 }
    ]);
  } catch (err) {
    return [
      { claimText: `Primary mechanism associated with ${query} is proven theoretically.`, orderIndex: 1 },
      { claimText: `Official standards for ${query} were published in peer-reviewed journals.`, orderIndex: 2 },
      { claimText: `Commercial deployment of ${query} is projected to happen within 6 months.`, orderIndex: 3 },
      { claimText: `Existing security frameworks remain resilient against early implementations of ${query}.`, orderIndex: 4 }
    ];
  }
}
