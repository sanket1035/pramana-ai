import React, { useState } from 'react';
import { Download, Share2, Copy, Check, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Report Header Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#111113] via-[#141418] to-purple-950/20 border border-[#27272A] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Verified Citation-Backed Report
            </span>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
              {session.query}
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Completed on {new Date(report.created_at).toLocaleDateString()} • ID: {session.id.slice(0, 8)}
            </p>
          </div>

          {/* Overall Confidence Gauge Badge */}
          <div className="flex items-center space-x-3 bg-[#09090B] p-3 rounded-xl border border-[#27272A] shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Overall Confidence</div>
              <div className="text-2xl font-heading font-extrabold text-purple-400">
                {report.overall_confidence}%
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center bg-purple-950/40">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-zinc-400 font-mono">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>{claims.length} Extracted Claims Verified</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1C1C1F] hover:bg-[#27272A] text-zinc-300 hover:text-white border border-[#27272A] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-md shadow-purple-950/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Claims Matrix */}
      <div className="space-y-4">
        <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <span>Verified Claims & Evidence Matrix</span>
          <span className="text-xs font-mono bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded border border-purple-800/50">
            {claims.length}
          </span>
        </h2>
        <div className="space-y-3">
          {claims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>

      {/* Full Markdown Body Document */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#111113] border border-[#27272A] prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-zinc-300 prose-li:text-zinc-300 prose-code:text-purple-300 prose-code:font-mono">
        <ReactMarkdown>{report.content_markdown}</ReactMarkdown>
      </div>
    </div>
  );
};
