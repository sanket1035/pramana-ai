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
      <div className="bg-[#221f1c] border border-[#554336] p-6 md:p-8 rounded space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#554336] pb-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ffb77d]" />
              Pramāṇa Executive Research Report
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#e8e1dd] leading-tight">
              {session.query}
            </h1>
            <p className="font-mono text-xs text-[#dbc2b0]/70">
              Verified on {new Date(report.created_at).toLocaleDateString()} • Session: {session.id.slice(0, 8)}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#151310] p-3.5 rounded border border-[#554336] shrink-0">
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#dbc2b0] uppercase">Confidence Score</div>
              <div className="font-serif text-2xl font-bold text-[#ffb77d]">
                {report.overall_confidence}%
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[#ffb77d]" />
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#dbc2b0]">
            <BookOpen className="w-4 h-4 text-[#ffb77d]" />
            <span>{claims.length} Verified Claims</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1e1b19] hover:bg-[#383431] text-[#e8e1dd] border border-[#554336] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-bold transition-all cursor-pointer uppercase"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Claims Matrix */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#e8e1dd] flex items-center gap-2">
          <span>Claims & Evidence Matrix</span>
          <span className="font-mono text-xs bg-[#ffb77d]/10 text-[#ffb77d] px-2 py-0.5 rounded border border-[#ffb77d]/20">
            {claims.length}
          </span>
        </h2>
        <div className="space-y-3">
          {claims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>

      {/* Editorial Long-Form Report Body */}
      <div className="bg-[#221f1c] border border-[#554336] p-6 md:p-10 rounded font-serif text-[18px] leading-[30px] text-[#e8e1dd] prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-[#e8e1dd] prose-p:text-[#e8e1dd] prose-code:font-mono prose-code:text-[#ffb77d]">
        <ReactMarkdown>{report.content_markdown}</ReactMarkdown>
      </div>
    </div>
  );
};
