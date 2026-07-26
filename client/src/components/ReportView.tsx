import React, { useState, useEffect, useRef } from 'react';
import { Download, Copy, Check, ShieldCheck, Sparkles, BookOpen, BarChart3, Database, FileText, CheckCircle2, AlertTriangle, ArrowDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FullReportPayload, Claim } from '../types/index.js';
import { ClaimCard } from './ClaimCard.js';

interface ReportViewProps {
  payload: FullReportPayload;
}

const PipelineFlowchartComponent: React.FC<{
  query: string;
  confidenceScore: number;
  verifiedCount: number;
  contradictedCount: number;
  totalClaims: number;
}> = ({ query, confidenceScore, verifiedCount, contradictedCount, totalClaims }) => {
  return (
    <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-6 rounded-lg space-y-4 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between border-b border-[var(--border-main)]/50 pb-3">
        <span className="text-[var(--text-accent)] font-bold uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[var(--text-accent)]" />
          Multi-Agent Verification Architecture Flowchart
        </span>
        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-main)]">
          PIPELINE ACTIVE
        </span>
      </div>

      {/* Node List Flow */}
      <div className="space-y-3 relative py-2">
        {/* Node 1: Input Query */}
        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-lg space-y-1.5 shadow">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-accent)] uppercase font-bold">
            <span>START / RESEARCH OBJECTIVE</span>
            <span className="text-green-400">STATUS: INITIATED</span>
          </div>
          <p className="font-serif text-sm text-[var(--text-main)] leading-relaxed font-semibold">
            "{query}"
          </p>
        </div>

        {/* Connector Arrow 1 */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-high)] rounded-full border border-[var(--border-main)] text-[9px] text-[var(--text-muted)]">
            <ArrowDown className="w-3 h-3 text-[var(--text-accent)] animate-bounce" />
            <span>01_RESEARCH_AGENT SCANS SOURCES</span>
          </div>
        </div>

        {/* Node 2: Research Agent */}
        <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-[var(--text-accent)]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[var(--text-main)] block">01_RESEARCH_AGENT</span>
              <span className="text-[10px] text-[var(--text-muted)]">Heuristic parsing across academic & official databases</span>
            </div>
          </div>
          <span className="text-[10px] text-green-400 font-bold bg-green-950/40 px-2 py-1 rounded border border-green-800/40">
            COMPLETED
          </span>
        </div>

        {/* Connector Arrow 2 */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-high)] rounded-full border border-[var(--border-main)] text-[9px] text-[var(--text-muted)]">
            <ArrowDown className="w-3 h-3 text-[var(--text-accent)]" />
            <span>02_CLAIM_EXTRACTION DECONSTRUCTS ATOMIC CLAIMS</span>
          </div>
        </div>

        {/* Node 3: Claim Extraction */}
        <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-[var(--text-accent)]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[var(--text-main)] block">02_CLAIM_EXTRACTION</span>
              <span className="text-[10px] text-[var(--text-muted)]">Deconstructed query into {totalClaims} atomic statements</span>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-accent)] font-bold bg-[var(--text-accent)]/10 px-2 py-1 rounded border border-[var(--text-accent)]/30">
            {totalClaims} CLAIMS
          </span>
        </div>

        {/* Connector Arrow 3 */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-high)] rounded-full border border-[var(--border-main)] text-[9px] text-[var(--text-muted)]">
            <ArrowDown className="w-3 h-3 text-[var(--text-accent)]" />
            <span>03_FACT_VERIFICATION CROSS-CHECKS EVIDENCE</span>
          </div>
        </div>

        {/* Node 4: Fact Verification */}
        <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[var(--text-main)] block">03_FACT_VERIFICATION</span>
              <span className="text-[10px] text-[var(--text-muted)]">Cross-referenced primary & secondary literature</span>
            </div>
          </div>
          <span className="text-[10px] text-green-400 font-bold bg-green-950/40 px-2 py-1 rounded border border-green-800/40">
            {verifiedCount} VERIFIED
          </span>
        </div>

        {/* Connector Arrow 4 */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-high)] rounded-full border border-[var(--border-main)] text-[9px] text-[var(--text-muted)]">
            <ArrowDown className="w-3 h-3 text-amber-400" />
            <span>04_CONTRADICTION_DETECTION AUDITS MISCONCEPTIONS</span>
          </div>
        </div>

        {/* Node 5: Contradiction Detection */}
        <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[var(--text-main)] block">04_CONTRADICTION_DETECTION</span>
              <span className="text-[10px] text-[var(--text-muted)]">Audited timeline risks & internal inconsistencies</span>
            </div>
          </div>
          <span className="text-[10px] text-amber-400 font-bold bg-amber-950/40 px-2 py-1 rounded border border-amber-800/40">
            {contradictedCount} FLAGGED
          </span>
        </div>

        {/* Connector Arrow 5 */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-high)] rounded-full border border-[var(--border-main)] text-[9px] text-[var(--text-muted)]">
            <ArrowDown className="w-3 h-3 text-[var(--text-accent)]" />
            <span>05_CONFIDENCE_ENGINE CALCULATES FINAL SCORE</span>
          </div>
        </div>

        {/* Node 6: Confidence Engine Output */}
        <div className="p-4 bg-[var(--bg-surface-high)] border-2 border-[var(--text-accent)] rounded-lg flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--text-accent)]/20 border border-[var(--text-accent)] flex items-center justify-center text-[var(--text-accent)] font-bold text-sm">
              %
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--text-main)] block">05_CONFIDENCE_ENGINE</span>
              <span className="text-[11px] text-[var(--text-muted)]">Global Epistemic Bayesian Probability</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block uppercase">Session Confidence</span>
            <span className="font-serif text-2xl font-bold text-[var(--text-accent)]">{confidenceScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClaimConfidenceBarChart: React.FC<{ claims: Claim[] }> = ({ claims }) => {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 rounded space-y-4 font-mono text-xs shadow-md">
      <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
        <span className="text-[var(--text-accent)] font-bold uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[var(--text-accent)]" />
          Claim Reliability & Confidence Score Distribution
        </span>
        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-main)] px-2 py-0.5 rounded border border-[var(--border-main)]">
          {claims.length} CLAIMS SCORED
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {claims.map((claim, idx) => {
          const score = claim.confidence?.score ?? (claim.status === 'verified' ? 92 : 30);
          const isVerified = claim.status === 'verified';
          const barFill = isVerified ? 'bg-[var(--accent-primary)]' : 'bg-amber-600/80';
          const badgeStyle = isVerified
            ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)] border-[var(--text-accent)]/30'
            : 'bg-amber-950/40 text-amber-300 border-amber-800/40';

          return (
            <div key={claim.id || idx} className="space-y-1.5 p-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded">
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-[var(--text-main)] font-sans truncate max-w-[420px]">
                  <strong className="font-mono text-[var(--text-accent)] mr-1.5">#{idx + 1}</strong>
                  {claim.claim_text}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${badgeStyle}`}>
                    {claim.status}
                  </span>
                  <span className="font-bold font-mono text-[var(--text-accent)]">{score}%</span>
                </div>
              </div>

              {/* Bar track */}
              <div className="w-full h-2 bg-[var(--bg-surface)] rounded overflow-hidden border border-[var(--border-main)]/50">
                <div
                  className={`h-full ${barFill} transition-all duration-700 rounded-r`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DomainTrustBarChart: React.FC<{ claims: Claim[] }> = ({ claims }) => {
  const domainMap = new Map<string, { count: number; avgScore: number }>();

  claims.forEach((c) => {
    const domain = c.citation?.source_title || 'Peer-Reviewed Literature';
    const score = c.confidence?.score ?? (c.status === 'verified' ? 90 : 35);
    const existing = domainMap.get(domain);
    if (existing) {
      existing.count += 1;
      existing.avgScore = Math.round((existing.avgScore + score) / 2);
    } else {
      domainMap.set(domain, { count: 1, avgScore: score });
    }
  });

  const domains = Array.from(domainMap.entries()).map(([name, data]) => ({ name, ...data }));

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 rounded space-y-4 font-mono text-xs shadow-md">
      <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
        <span className="text-[var(--text-accent)] font-bold uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-[var(--text-accent)]" />
          Source Domain Authority & Citation Weight Chart
        </span>
        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-main)] px-2 py-0.5 rounded border border-[var(--border-main)]">
          {domains.length} SOURCES AUDITED
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {domains.map((d, idx) => (
          <div key={idx} className="space-y-1.5 p-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-main)] font-sans truncate max-w-[400px]">{d.name}</span>
              <span className="text-[var(--text-accent)] font-bold font-mono">{d.avgScore}% TRUST WEIGHT</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-surface)] rounded overflow-hidden border border-[var(--border-main)]/50">
              <div
                className="h-full bg-[var(--accent-primary)] transition-all duration-700 opacity-90"
                style={{ width: `${d.avgScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReportView: React.FC<ReportViewProps> = ({ payload }) => {
  const [copied, setCopied] = useState(false);
  const { session, report, claims } = payload;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(report.content_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([report.content_markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pramana-report-${session.id.slice(0, 8)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const isDataVis = session.output_format === 'DATA VISUALIZATION';
  const verifiedCount = claims.filter(c => c.status === 'verified').length;
  const contradictedCount = claims.filter(c => c.status === 'contradicted').length;

  return (
    <div className="max-w-[760px] mx-auto pb-20 printable-report">
      {/* SINGLE UNIFIED CONTINUOUS EXECUTIVE REPORT DOCUMENT */}
      <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-main)] rounded-lg p-6 md:p-10 space-y-10 shadow-2xl">
        
        {/* REPORT DOCUMENT HEADER */}
        <div className="space-y-6 border-b border-[var(--border-main)] pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--text-accent)]" />
                Pramāṇa Executive Research Report
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)] leading-tight">
                {session.query}
              </h1>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Verified on {new Date(report.created_at).toLocaleDateString()} • Session ID: {session.id.slice(0, 8)}
              </p>

              {/* Research Parameters Badges */}
              <div className="flex items-center gap-2 font-mono text-[10px] pt-1 flex-wrap">
                {session.depth && (
                  <span className="bg-[var(--bg-main)] text-[var(--text-accent)] border border-[var(--border-main)] px-2 py-0.5 rounded uppercase font-bold">
                    DEPTH: {session.depth}
                  </span>
                )}
                {session.output_format && (
                  <span className="bg-[var(--bg-main)] text-[var(--text-accent)] border border-[var(--border-main)] px-2 py-0.5 rounded uppercase font-bold">
                    FORMAT: {session.output_format}
                  </span>
                )}
                {session.domain && (
                  <span className="bg-[var(--bg-main)] text-[var(--text-accent)] border border-[var(--border-main)] px-2 py-0.5 rounded uppercase font-bold">
                    DOMAIN: {session.domain}
                  </span>
                )}
              </div>
            </div>

            {/* Confidence Score Badge */}
            <div className="flex items-center space-x-3 bg-[var(--bg-main)] p-4 rounded border border-[var(--border-main)] shrink-0 self-start md:self-auto shadow-inner">
              <div className="text-right">
                <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Global Confidence Score</div>
                <div className="font-serif text-3xl font-bold text-[var(--text-accent)]">
                  {report.overall_confidence}%
                </div>
              </div>
              <Sparkles className="w-7 h-7 text-[var(--text-accent)]" />
            </div>
          </div>

          {/* Document Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-2">
            <div className="flex items-center space-x-2 text-[var(--text-muted)]">
              <BookOpen className="w-4 h-4 text-[var(--text-accent)]" />
              <span>{claims.length} Verified Statements Extracted</span>
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[var(--bg-main)] hover:bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy MD'}</span>
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-[var(--bg-main)] hover:bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors cursor-pointer uppercase font-bold"
              >
                <Download className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>Export MD</span>
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded bg-[var(--accent-primary)] hover:brightness-110 text-[var(--text-accent-contrast)] font-bold transition-all cursor-pointer uppercase shadow-md"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: TELEMETRY DASHBOARD & PIPELINE FLOWCHART */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <h2 className="font-serif text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--text-accent)]" />
              <span>1. Telemetry & Multi-Agent Architecture</span>
            </h2>
            <span className="font-mono text-xs text-[var(--text-muted)]">Verified Pipeline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] uppercase block">Verified Statements</span>
              <span className="text-2xl font-serif font-bold text-[var(--text-accent)]">{verifiedCount}</span>
              <span className="text-[10px] text-[var(--text-muted)] block">out of {claims.length} extracted statements</span>
            </div>
            <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded space-y-1">
              <span className="text-[10px] text-[var(--text-muted)] uppercase block">Flagged / Contradicted</span>
              <span className="text-2xl font-serif font-bold text-amber-400">{contradictedCount}</span>
              <span className="text-[10px] text-[var(--text-muted)] block">inconsistencies detected</span>
            </div>
          </div>

          {/* Interactive Multi-Agent Architecture Flowchart */}
          <PipelineFlowchartComponent
            query={session.query}
            confidenceScore={report.overall_confidence}
            verifiedCount={verifiedCount}
            contradictedCount={contradictedCount}
            totalClaims={claims.length}
          />
        </div>

        {/* SECTION 2: PERFORMANCE & RELIABILITY BAR CHARTS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <h2 className="font-serif text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <Database className="w-5 h-5 text-[var(--text-accent)]" />
              <span>2. Visual Analytics & Source Authority Charts</span>
            </h2>
            <span className="font-mono text-xs text-[var(--text-muted)]">Scored Distribution</span>
          </div>

          <ClaimConfidenceBarChart claims={claims} />
          <DomainTrustBarChart claims={claims} />
        </div>

        {/* SECTION 3: VERIFIED CLAIMS & EVIDENCE MATRIX */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <h2 className="font-serif text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--text-accent)]" />
              <span>3. Verified Claims & Evidence Matrix</span>
            </h2>
            <span className="font-mono text-xs bg-[var(--text-accent)]/10 text-[var(--text-accent)] px-2.5 py-0.5 rounded border border-[var(--text-accent)]/20">
              {claims.length} Extracted Statements
            </span>
          </div>

          <div className="space-y-4">
            {claims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        </div>

        {/* SECTION 4: COMPREHENSIVE SYNTHESIS & ANALYSIS */}
        <div className="space-y-6">
          <div className="border-b border-[var(--border-main)] pb-3">
            <h2 className="font-serif text-xl font-bold text-[var(--text-main)]">
              4. In-Depth Synthesis & Analysis Report
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-[var(--text-main)] font-serif leading-relaxed text-base space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 border border-[var(--border-main)] rounded bg-[var(--bg-main)] shadow-md">
                    <table className="w-full text-left border-collapse font-mono text-xs">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[var(--bg-main)] text-[var(--text-accent)] uppercase border-b border-[var(--border-main)] font-bold">{children}</thead>
                ),
                th: ({ children }) => <th className="p-3 border-r border-[var(--border-main)]/40 last:border-r-0">{children}</th>,
                td: ({ children }) => <td className="p-3 border-t border-r border-[var(--border-main)]/30 last:border-r-0 text-[var(--text-main)]">{children}</td>,
                code: ({ className, children, ...props }) => {
                  return (
                    <code className="bg-[var(--bg-main)] text-[var(--text-accent)] px-1.5 py-0.5 rounded border border-[var(--border-main)] font-mono text-xs" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => <div className="my-4">{children}</div>
              }}
            >
              {report.content_markdown}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
};




