export interface User {
  id: string;
  email?: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  isAnonymous: boolean;
}

export type StageStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface ResearchSession {
  id: string;
  user_id: string;
  query: string;
  status: StageStatus;
  current_stage: string;
  created_at: string;
  completed_at?: string;
  depth?: 'SURFACE' | 'DEEP';
  output_format?: 'EXECUTIVE SUMMARY' | 'FULL DOSSIER' | 'DATA VISUALIZATION';
  domain?: 'ACADEMIC' | 'JOURNALISM';
}

export type ClaimStatus = 'verified' | 'contradicted' | 'unverified';

export interface Claim {
  id: string;
  session_id: string;
  claim_text: string;
  status: ClaimStatus;
  order_index: number;
  citation?: Citation;
  confidence?: ConfidenceScore;
}

export interface Citation {
  id: string;
  claim_id: string;
  source_url: string;
  source_title: string;
  snippet: string;
}

export interface ConfidenceScore {
  id: string;
  claim_id: string;
  score: number;
  reasoning: string;
}

export interface AgentLog {
  id: string;
  session_id: string;
  agent_name: 'Research' | 'ClaimExtraction' | 'Verification' | 'Contradiction' | 'Confidence' | 'Citation' | 'ReportGenerator';
  status: 'started' | 'completed' | 'failed';
  output_summary: string;
  started_at: string;
  finished_at?: string;
}

export interface ResearchReport {
  id: string;
  session_id: string;
  summary: string;
  content_markdown: string;
  overall_confidence: number;
  created_at: string;
}

export interface FullReportPayload {
  session: ResearchSession;
  report: ResearchReport;
  claims: Claim[];
  logs: AgentLog[];
}

export interface HistoryItem {
  id: string;
  query: string;
  status: StageStatus;
  overallConfidence: number;
  summary: string;
  claimCount: number;
  createdAt: string;
  completedAt?: string;
}
