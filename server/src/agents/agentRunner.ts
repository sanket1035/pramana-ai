import { v4 as uuidv4 } from 'uuid';
import { memoryStore } from '../services/mockData.js';
import { runResearchAgent } from './researchAgent.js';
import { runClaimAgent } from './claimAgent.js';
import { runVerificationAgent } from './verificationAgent.js';
import { runContradictionAgent } from './contradictionAgent.js';
import { runConfidenceAgent } from './confidenceAgent.js';
import { runReportAgent } from './reportAgent.js';
import { ResearchSession, ResearchReport, Claim, Citation, ConfidenceScore, AgentLog } from '../types/index.js';

export interface PipelineOptions {
  depth?: 'SURFACE' | 'DEEP';
  outputFormat?: 'EXECUTIVE SUMMARY' | 'FULL DOSSIER' | 'DATA VISUALIZATION';
  domain?: 'ACADEMIC' | 'JOURNALISM';
}

export async function executeMultiAgentPipeline(
  query: string,
  userId: string = 'default-user-id',
  options?: PipelineOptions
): Promise<string> {
  const sessionId = uuidv4();
  const now = new Date().toISOString();

  // 1. Create Session with options
  const session: ResearchSession = {
    id: sessionId,
    user_id: userId,
    query,
    status: 'running',
    current_stage: 'Research',
    created_at: now,
    depth: options?.depth || 'SURFACE',
    output_format: options?.outputFormat || 'EXECUTIVE SUMMARY',
    domain: options?.domain || 'ACADEMIC'
  };
  memoryStore.saveSession(session);

  // Background Async Execution
  runPipeline(sessionId, query, options).catch(err => {
    console.error(`Pipeline execution error for session ${sessionId}:`, err);
    const s = memoryStore.getSession(sessionId);
    if (s) {
      s.status = 'failed';
      memoryStore.saveSession(s);
    }
  });

  return sessionId;
}

async function runPipeline(sessionId: string, query: string, options?: PipelineOptions) {
  const logStage = (agentName: AgentLog['agent_name'], summary: string) => {
    const log: AgentLog = {
      id: uuidv4(),
      session_id: sessionId,
      agent_name: agentName,
      status: 'completed',
      output_summary: summary,
      started_at: new Date().toISOString(),
      finished_at: new Date().toISOString()
    };
    memoryStore.addLog(log);
  };

  const updateStage = (stageName: string) => {
    const s = memoryStore.getSession(sessionId);
    if (s) {
      s.current_stage = stageName;
      memoryStore.saveSession(s);
    }
  };

  try {
    // Delay helper to allow realistic multi-agent execution display
    const stagePause = () => new Promise(res => setTimeout(res, 1200));

    // Stage 1: Research Agent
    updateStage('Research');
    const research = await runResearchAgent(query);
    logStage('Research', `Gathered context & ${research.keySources.length} sources for query.`);
    await stagePause();

    // Stage 2: Claim Extraction Agent
    updateStage('ClaimExtraction');
    const extractedClaims = await runClaimAgent(query, research);
    logStage('ClaimExtraction', `Extracted ${extractedClaims.length} verifiable atomic claims.`);
    await stagePause();

    // Stage 3: Fact Verification Agent
    updateStage('Verification');
    const verifiedClaims = await runVerificationAgent(extractedClaims, research);
    logStage('Verification', `Cross-checked claims against sources.`);
    await stagePause();

    // Stage 4: Contradiction Detection Agent
    updateStage('Contradiction');
    const contradictionClaims = await runContradictionAgent(verifiedClaims);
    logStage('Contradiction', `Audited claims for internal & external contradictions.`);
    await stagePause();

    // Stage 5: Confidence Engine Agent
    updateStage('Confidence');
    const confidenceOutput = await runConfidenceAgent(contradictionClaims);
    logStage('Confidence', `Calculated claim scores & overall confidence score (${confidenceOutput.overallScore}%).`);
    await stagePause();

    // Stage 6: Citation formatting & storage
    updateStage('Citation');
    const claimsToStore: Claim[] = [];
    confidenceOutput.claims.forEach((c) => {
      const claimId = uuidv4();
      const claimObj: Claim = {
        id: claimId,
        session_id: sessionId,
        claim_text: c.claimText,
        status: c.finalStatus,
        order_index: c.orderIndex
      };
      claimsToStore.push(claimObj);

      const citationObj: Citation = {
        id: uuidv4(),
        claim_id: claimId,
        source_url: c.sourceUrl,
        source_title: c.sourceTitle,
        snippet: c.snippet
      };
      memoryStore.saveCitation(citationObj);

      const confidenceObj: ConfidenceScore = {
        id: uuidv4(),
        claim_id: claimId,
        score: c.score,
        reasoning: c.reasoning
      };
      memoryStore.saveConfidence(confidenceObj);
    });
    memoryStore.saveClaims(sessionId, claimsToStore);
    logStage('Citation', `Linked verified citations and confidence badges.`);
    await stagePause();

    // Stage 7: Report Generator Agent
    updateStage('ReportGenerator');
    const reportOutput = await runReportAgent(query, research, confidenceOutput, options);

    const reportObj: ResearchReport = {
      id: uuidv4(),
      session_id: sessionId,
      summary: reportOutput.summary,
      content_markdown: reportOutput.markdownContent,
      overall_confidence: confidenceOutput.overallScore,
      created_at: new Date().toISOString()
    };
    memoryStore.saveReport(reportObj);
    logStage('ReportGenerator', `Generated executive markdown research report.`);

    // Complete Session
    const s = memoryStore.getSession(sessionId);
    if (s) {
      s.status = 'completed';
      s.completed_at = new Date().toISOString();
      memoryStore.saveSession(s);
    }
  } catch (err: any) {
    console.error(`Pipeline failed for session ${sessionId}:`, err);
    const s = memoryStore.getSession(sessionId);
    if (s) {
      s.status = 'failed';
      memoryStore.saveSession(s);
    }
  }
}
