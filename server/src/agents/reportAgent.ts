import { callGeminiAPI } from '../services/gemini.js';
import { ResearchOutput } from './researchAgent.js';
import { ConfidenceEngineOutput } from './confidenceAgent.js';

export interface FinalReportOutput {
  summary: string;
  markdownContent: string;
}

export async function runReportAgent(
  query: string,
  research: ResearchOutput,
  confidenceData: ConfidenceEngineOutput
): Promise<FinalReportOutput> {
  const prompt = `You are the Report Generation Agent for Pramāṇa AI.
Synthesize a comprehensive, executive Markdown research report based on:

Query: "${query}"
Research Overview: "${research.overview}"
Overall Confidence Score: ${confidenceData.overallScore}%
Verified & Scored Claims:
${JSON.stringify(confidenceData.claims, null, 2)}

Requirements for the Report:
1. Include an H1 title: "# Executive Research Report: ${query}"
2. Executive Summary section
3. Key Claims & Verification Matrix section with badge indicators
4. Deep Dive Analysis section
5. Source Citations & References section
6. Format cleanly in GitHub Markdown.

Return ONLY the markdown body.`;

  try {
    const rawMarkdown = await callGeminiAPI(prompt, "You are an executive report generation agent returning pure Markdown.");
    const summary = `${research.overview} Multi-agent pipeline verified ${confidenceData.claims.filter(c => c.finalStatus === 'verified').length} claims with an overall confidence score of ${confidenceData.overallScore}%.`;
    return {
      summary,
      markdownContent: rawMarkdown
    };
  } catch (err) {
    const summary = `Multi-agent verification completed for "${query}" with an overall confidence score of ${confidenceData.overallScore}%.`;
    const defaultMd = `# Executive Research Report: ${query}

## Executive Summary
${research.overview}

## Key Claims & Verification Matrix

${confidenceData.claims.map(c => `### ${c.orderIndex}. ${c.claimText}
- **Status:** ${c.finalStatus.toUpperCase()} (${c.score}% Confidence)
- **Reasoning:** ${c.reasoning}
- **Source:** [${c.sourceTitle}](${c.sourceUrl})
- *Snippet:* "${c.snippet}"
`).join('\n')}

## Conclusion & Verdict
The multi-agent pipeline verified the primary foundational statements for "${query}" while identifying contradictory projections. Overall confidence score: **${confidenceData.overallScore}%**.
`;
    return {
      summary,
      markdownContent: defaultMd
    };
  }
}
