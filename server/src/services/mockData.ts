import { ResearchSession, ResearchReport, Claim, Citation, ConfidenceScore, AgentLog, FullReportPayload } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

class MemoryStore {
  sessions: Map<string, ResearchSession> = new Map();
  reports: Map<string, ResearchReport> = new Map();
  claims: Map<string, Claim[]> = new Map();
  citations: Map<string, Citation> = new Map();
  confidenceScores: Map<string, ConfidenceScore> = new Map();
  logs: Map<string, AgentLog[]> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    const defaultSessionId = 'demo-session-quantum-cryptography';
    const createdAt = new Date(Date.now() - 3600000).toISOString();

    const session: ResearchSession = {
      id: defaultSessionId,
      user_id: 'default-user-id',
      query: 'What are the verified impacts of quantum computing on modern RSA cryptography and PQC standards?',
      status: 'completed',
      current_stage: 'ReportGenerator',
      created_at: createdAt,
      completed_at: new Date(Date.now() - 3540000).toISOString()
    };

    const claims: Claim[] = [
      {
        id: 'claim-1',
        session_id: defaultSessionId,
        claim_text: "Shor's algorithm running on a quantum computer breaks RSA-2048 in polynomial time.",
        status: 'verified',
        order_index: 1
      },
      {
        id: 'claim-2',
        session_id: defaultSessionId,
        claim_text: 'NIST officially finalized ML-KEM and ML-DSA Post-Quantum Cryptography standards in 2024.',
        status: 'verified',
        order_index: 2
      },
      {
        id: 'claim-3',
        session_id: defaultSessionId,
        claim_text: 'Commercial quantum computers with 10,000 logical qubits will be deployed globally by Q4 2026.',
        status: 'contradicted',
        order_index: 3
      },
      {
        id: 'claim-4',
        session_id: defaultSessionId,
        claim_text: 'Current AES-256 symmetric encryption remains resistant to quantum Grover search attacks.',
        status: 'verified',
        order_index: 4
      }
    ];

    const citationsList: Citation[] = [
      {
        id: 'cite-1',
        claim_id: 'claim-1',
        source_url: 'https://arxiv.org/abs/quant-ph/9508027',
        source_title: 'Shor Algorithms for Quantum Computation',
        snippet: 'Shor demonstrated that prime factorization and discrete logarithms can be solved in O(n^3) operations on a quantum computer.'
      },
      {
        id: 'cite-2',
        claim_id: 'claim-2',
        source_url: 'https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards',
        source_title: 'NIST Finalized Post-Quantum Encryption Standards (FIPS 203 & 204)',
        snippet: 'NIST released its first group of finalized post-quantum encryption standards designed to withstand quantum attacks.'
      },
      {
        id: 'cite-3',
        claim_id: 'claim-3',
        source_url: 'https://nature.com/articles/quantum-hardware-roadmap-2025',
        source_title: 'IEEE Quantum Hardware Roadmap Analysis',
        snippet: 'Fault-tolerant quantum systems with 10k logical qubits are projected for post-2033 rather than 2026 due to error correction overhead.'
      },
      {
        id: 'cite-4',
        claim_id: 'claim-4',
        source_url: 'https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final',
        source_title: 'NIST Special Publication 800-57 Recommendation for Key Management',
        snippet: 'Grover algorithm reduces AES key security by half; AES-256 retains 128-bit quantum security strength.'
      }
    ];

    const confidenceList: ConfidenceScore[] = [
      { id: 'conf-1', claim_id: 'claim-1', score: 98, reasoning: 'Mathematical proof verified across peer-reviewed literature since 1994.' },
      { id: 'conf-2', claim_id: 'claim-2', score: 96, reasoning: 'Confirmed by official NIST publications and FIPS standard release announcements.' },
      { id: 'conf-3', claim_id: 'claim-3', score: 24, reasoning: 'Contradicted by hardware roadmap reports; qubit error-correction milestones remain unreached.' },
      { id: 'conf-4', claim_id: 'claim-4', score: 94, reasoning: 'Supported by cryptographic consensus; Grover search provides quadratic speedup, leaving AES-256 secure.' }
    ];

    const report: ResearchReport = {
      id: 'report-1',
      session_id: defaultSessionId,
      summary: 'Quantum computing poses an existential threat to classical asymmetric algorithms (RSA/ECC) via Shor Algorithm, while symmetric encryption (AES-256) remains resistant. NIST finalized PQC standards (ML-KEM, ML-DSA) in 2024 to mitigate risk.',
      content_markdown: `# Executive Research Report: Quantum Computing & PQC Migration

## Overview
As quantum computing hardware advances toward fault-tolerance, asymmetric cryptographic primitives based on integer factorization and discrete logarithms (such as RSA-2048 and ECDSA) face algorithmic collapse.

---

## Key Claims & Evidence Matrix

### 1. RSA Vulnerability & Shor's Algorithm
* **Claim:** Shor's algorithm running on a quantum computer breaks RSA-2048 in polynomial time.
* **Status:** Verified (98% Confidence)
* **Evidence:** Demonstrated theoretically in peer-reviewed literature. A quantum computer with approximately 4,000 physical error-corrected qubits could factor RSA keys in hours.

### 2. NIST Post-Quantum Standards
* **Claim:** NIST officially finalized ML-KEM and ML-DSA Post-Quantum Cryptography standards in 2024.
* **Status:** Verified (96% Confidence)
* **Evidence:** FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) were formally published in August 2024 as official government standards.

### 3. Projected Timeline Misconceptions
* **Claim:** Commercial quantum computers with 10,000 logical qubits will be deployed globally by Q4 2026.
* **Status:** Contradicted (24% Confidence)
* **Evidence:** Hardware roadmaps from IBM, Google Quantum AI, and Quantinuum indicate 10,000 fault-tolerant logical qubits will not materialize until 2033–2035.

### 4. Symmetric Cryptography Resilience
* **Claim:** Current AES-256 symmetric encryption remains resistant to quantum Grover search attacks.
* **Status:** Verified (94% Confidence)
* **Evidence:** Grover's algorithm provides quadratic speedup, reducing effective security of AES-256 to 128-bits, which is well above the threshold of computational feasibility.

---

## Multi-Agent Verification Summary
* **Claims Analyzed:** 4
* **Verified:** 3
* **Contradicted:** 1
* **Overall Session Confidence Score:** 88%
`,
      overall_confidence: 88,
      created_at: new Date(Date.now() - 3540000).toISOString()
    };

    const logsList: AgentLog[] = [
      { id: 'log-1', session_id: defaultSessionId, agent_name: 'Research', status: 'completed', output_summary: 'Gathered 12 candidate papers and NIST specifications on quantum cryptographic threats.', started_at: createdAt, finished_at: createdAt },
      { id: 'log-2', session_id: defaultSessionId, agent_name: 'ClaimExtraction', status: 'completed', output_summary: 'Extracted 4 atomic verifiable claims regarding RSA, NIST PQC, timelines, and AES-256.', started_at: createdAt, finished_at: createdAt },
      { id: 'log-3', session_id: defaultSessionId, agent_name: 'Verification', status: 'completed', output_summary: 'Cross-checked 4 claims against official NIST standards and IEEE quantum roadmaps.', started_at: createdAt, finished_at: createdAt },
      { id: 'log-4', session_id: defaultSessionId, agent_name: 'Contradiction', status: 'completed', output_summary: 'Flagged 1 claim with severe timeline hallucination (2026 quantum deployment claim).', started_at: createdAt, finished_at: createdAt },
      { id: 'log-5', session_id: defaultSessionId, agent_name: 'Confidence', status: 'completed', output_summary: 'Assigned individual confidence scores (98%, 96%, 24%, 94%). Overall score: 88%.', started_at: createdAt, finished_at: createdAt },
      { id: 'log-6', session_id: defaultSessionId, agent_name: 'ReportGenerator', status: 'completed', output_summary: 'Synthesized final executive markdown report with citations and claim matrix.', started_at: createdAt, finished_at: createdAt }
    ];

    this.sessions.set(defaultSessionId, session);
    this.reports.set(defaultSessionId, report);
    this.claims.set(defaultSessionId, claims);
    citationsList.forEach(c => this.citations.set(c.claim_id, c));
    confidenceList.forEach(c => this.confidenceScores.set(c.claim_id, c));
    this.logs.set(defaultSessionId, logsList);
  }

  saveSession(session: ResearchSession) {
    this.sessions.set(session.id, session);
  }

  getSession(id: string): ResearchSession | undefined {
    return this.sessions.get(id);
  }

  getAllSessions(): ResearchSession[] {
    return Array.from(this.sessions.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  saveReport(report: ResearchReport) {
    this.reports.set(report.session_id, report);
  }

  getReport(sessionId: string): ResearchReport | undefined {
    return this.reports.get(sessionId);
  }

  saveClaims(sessionId: string, claimsList: Claim[]) {
    this.claims.set(sessionId, claimsList);
  }

  getClaims(sessionId: string): Claim[] {
    return this.claims.get(sessionId) || [];
  }

  saveCitation(citation: Citation) {
    this.citations.set(citation.claim_id, citation);
  }

  getCitation(claimId: string): Citation | undefined {
    return this.citations.get(claimId);
  }

  saveConfidence(confidence: ConfidenceScore) {
    this.confidenceScores.set(confidence.claim_id, confidence);
  }

  getConfidence(claimId: string): ConfidenceScore | undefined {
    return this.confidenceScores.get(claimId);
  }

  addLog(log: AgentLog) {
    const existing = this.logs.get(log.session_id) || [];
    existing.push(log);
    this.logs.set(log.session_id, existing);
  }

  getLogs(sessionId: string): AgentLog[] {
    return this.logs.get(sessionId) || [];
  }

  getFullPayload(sessionId: string): FullReportPayload | undefined {
    const session = this.getSession(sessionId);
    const report = this.getReport(sessionId);
    if (!session || !report) return undefined;

    const claimsList = this.getClaims(sessionId).map(claim => ({
      ...claim,
      citation: this.getCitation(claim.id),
      confidence: this.getConfidence(claim.id)
    }));

    const logs = this.getLogs(sessionId);

    return {
      session,
      report,
      claims: claimsList,
      logs
    };
  }

  deleteSession(sessionId: string) {
    this.sessions.delete(sessionId);
    this.reports.delete(sessionId);
    const sessionClaims = this.claims.get(sessionId) || [];
    sessionClaims.forEach(c => {
      this.citations.delete(c.id);
      this.confidenceScores.delete(c.id);
    });
    this.claims.delete(sessionId);
    this.logs.delete(sessionId);
  }
}

export const memoryStore = new MemoryStore();
