import React, { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FullReportPayload } from '../types/index.js';
import { ClaimCard } from './ClaimCard.js';

interface ReportViewProps {
  payload: FullReportPayload;
}

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

  return (
    <div className="max-w-[720px] mx-auto space-y-10 pb-20">
      {/* Header Document Card */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 md:p-8 rounded space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--text-accent)]" />
              Pramāṇa Executive Research Report
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)] leading-tight">
              {session.query}
            </h1>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              Verified on {new Date(report.created_at).toLocaleDateString()} • Session: {session.id.slice(0, 8)}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[var(--bg-main)] p-3.5 rounded border border-[var(--border-main)] shrink-0">
            <div className="text-right">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Confidence Score</div>
              <div className="font-serif text-2xl font-bold text-[var(--text-accent)]">
                {report.overall_confidence}%
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[var(--text-accent)]" />
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[var(--text-muted)]">
            <BookOpen className="w-4 h-4 text-[var(--text-accent)]" />
            <span>{claims.length} Verified Statements Extracted</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[var(--bg-sidebar)] hover:bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded bg-[var(--accent-primary)] hover:brightness-110 text-[var(--text-accent-contrast)] font-bold transition-all cursor-pointer uppercase"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Claims Matrix */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <span>Claims & Evidence Matrix</span>
          <span className="font-mono text-xs bg-[var(--text-accent)]/10 text-[var(--text-accent)] px-2.5 py-0.5 rounded border border-[var(--text-accent)]/20">
            {claims.length} Extracted Statements
          </span>
        </h2>
        <div className="space-y-3">
          {claims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>

      {/* Synthesized Report Content */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 md:p-10 rounded space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-main)] border-b border-[var(--border-main)] pb-4">
          Synthesis & Analysis
        </h2>
        <div className="prose prose-invert max-w-none text-[var(--text-main)] font-serif leading-relaxed text-base space-y-4">
          <ReactMarkdown>{report.content_markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
