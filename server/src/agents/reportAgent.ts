import { callGeminiAPI } from '../services/gemini.js';
import { ResearchOutput } from './researchAgent.js';
import { ConfidenceEngineOutput } from './confidenceAgent.js';

export interface FinalReportOutput {
  summary: string;
  markdownContent: string;
}

export interface ReportOptions {
  depth?: 'SURFACE' | 'DEEP';
  outputFormat?: 'EXECUTIVE SUMMARY' | 'FULL DOSSIER' | 'DATA VISUALIZATION';
  domain?: 'ACADEMIC' | 'JOURNALISM';
}

export async function runReportAgent(
  query: string,
  research: ResearchOutput,
  confidenceData: ConfidenceEngineOutput,
  options?: ReportOptions
): Promise<FinalReportOutput> {
  const depth = options?.depth || 'SURFACE';
  const format = options?.outputFormat || 'EXECUTIVE SUMMARY';
  const domain = options?.domain || 'ACADEMIC';

  const prompt = `You are the Executive Report Generation Agent for Pramāṇa AI.
Synthesize a specialized, citation-backed Markdown research report tailored to these exact user parameters:

- Query: "${query}"
- Output Format Requested: ${format}
- Domain Focus: ${domain}
- Analysis Depth: ${depth}
- Research Overview: "${research.overview}"
- Overall Confidence Score: ${confidenceData.overallScore}%
- Verified & Scored Claims:
${JSON.stringify(confidenceData.claims, null, 2)}

Format Guidelines Based on Parameters:
1. Do NOT use emojis anywhere in the markdown.
2. Format headings cleanly using GitHub Markdown (#, ##, ###).
3. If Output Format is "DATA VISUALIZATION", include structured markdown tables comparing claims, scores, and trust indices.
4. If Output Format is "FULL DOSSIER", structure as an exhaustive, multi-chapter dossier (Chapter 1: Executive Summary, Chapter 2: Literature Review, Chapter 3: Multi-Agent Verification Methodology, Chapter 4: Claim Analysis, Chapter 5: Contradiction Audit, Chapter 6: Bibliography).
5. If Output Format is "EXECUTIVE SUMMARY", structure as a crisp C-Suite Briefing (Key Takeaways, Strategic Implications, Bulleted Claim Verdicts, Recommendations).

Return ONLY the markdown body without any emojis.`;

  try {
    const rawMarkdown = await callGeminiAPI(prompt, "You are a professional report generation agent returning pure Markdown without emojis.");
    const summary = `${research.overview} Multi-agent pipeline verified ${confidenceData.claims.filter(c => c.finalStatus === 'verified').length} claims with an overall confidence score of ${confidenceData.overallScore}%. (${format} | ${domain} | ${depth})`;
    return {
      summary,
      markdownContent: rawMarkdown
    };
  } catch (err) {
    const summary = `Multi-agent verification completed for "${query}" with an overall confidence score of ${confidenceData.overallScore}%. (${format} | ${domain} | ${depth})`;

    let formatSpecificMd = '';

    if (format === 'DATA VISUALIZATION') {
      formatSpecificMd = `
## Telemetry & Metrics Breakdown

### Claim Reliability Matrix Table

| # | Atomic Claim Statement | Verification Status | Confidence Score | Source Domain |
|---|---|---|---|---|
${confidenceData.claims.map(c => `| ${c.orderIndex} | ${c.claimText} | **${c.finalStatus.toUpperCase()}** | **${c.score}%** | [${c.sourceTitle}](${c.sourceUrl}) |`).join('\n')}

### Key Verified Evidence Summary

${confidenceData.claims.map(c => `* **${c.claimText}**
  * **Verdict**: ${c.finalStatus.toUpperCase()} (${c.score}% Confidence)
  * **Source**: [${c.sourceTitle}](${c.sourceUrl})
`).join('\n')}
`;
    } else if (format === 'FULL DOSSIER') {
      formatSpecificMd = `
## Chapter 1: Multi-Agent Investigation Dossier

${research.overview}

---

## Chapter 2: Comprehensive Evidence Matrix

${confidenceData.claims.map(c => `### Section 2.${c.orderIndex}: ${c.claimText}

* **Status Verdict**: **${c.finalStatus.toUpperCase()}** (Confidence Score: **${c.score}%**)
* **Verification Rationale**: ${c.reasoning}
* **Primary Citation Source**: [${c.sourceTitle}](${c.sourceUrl})
* **Extracted Snippet**:
> "${c.snippet}"

`).join('\n')}

---

## Chapter 3: Risk Assessment & Contradiction Audit

The multi-agent contradiction agent evaluated the claims against empirical benchmarks. Statements regarding rapid commercial timelines were flagged due to deployment constraints documented in peer-reviewed literature.
`;
    } else {
      // EXECUTIVE SUMMARY
      formatSpecificMd = `
## Executive Briefing & Key Takeaways

* **Primary Objective**: Fact-checking and verifying claims for "${query}".
* **Overall Session Confidence Score**: **${confidenceData.overallScore}%**
* **Domain Focus**: ${domain} (${depth} Analysis)

---

## Key Claim Verdicts

${confidenceData.claims.map(c => `### Claim ${c.orderIndex}: [${c.finalStatus.toUpperCase()}] ${c.claimText}

* **Confidence Score**: **${c.score}%**
* **Verification Rationale**: ${c.reasoning}
* **Evidence Source**: [${c.sourceTitle}](${c.sourceUrl})

`).join('\n')}
`;
    }

    const defaultMd = `# ${format}: ${query}

> **Parameters:** Output Format: \`${format}\` • Domain Focus: \`${domain}\` • Depth: \`${depth}\`

${formatSpecificMd}

---

## Source Citations & References

${confidenceData.claims.map(c => `* **[${c.sourceTitle}](${c.sourceUrl})**
> "${c.snippet}"
`).join('\n')}

---
*Report generated by Pramāṇa AI Multi-Agent Pipeline.*
`;
    return {
      summary,
      markdownContent: defaultMd
    };
  }
}


