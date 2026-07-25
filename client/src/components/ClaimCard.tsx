import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { Claim } from '../types/index.js';
import { CitationPopover } from './CitationPopover.js';

interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const getStatusBadge = () => {
    switch (claim.status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-[var(--text-accent)] bg-[var(--text-accent)]/10 px-2 py-0.5 rounded border border-[var(--text-accent)]/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        );
      case 'contradicted':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-red-500 bg-red-950/20 px-2 py-0.5 rounded border border-red-800/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Flagged
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-500 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-800/30">
            <HelpCircle className="w-3.5 h-3.5" /> Unverified
          </span>
        );
    }
  };

  const confidenceScore = claim.confidence?.score ?? (claim.status === 'verified' ? 95 : 30);

  return (
    <div className="p-4 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--border-hover)] transition-all space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <span className="text-xs font-mono font-bold text-[var(--text-accent)] bg-[var(--bg-surface-highest)] px-2 py-0.5 rounded border border-[var(--border-main)] shrink-0">
            #{claim.order_index}
          </span>
          <p className="text-sm font-sans font-medium text-[var(--text-main)] leading-snug">
            {claim.claim_text}
            {claim.citation && <CitationPopover citation={claim.citation} />}
          </p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Confidence Score Bar */}
      <div className="pt-2 border-t border-[var(--border-main)]/40 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-[var(--text-muted)] text-[11px]">Confidence:</span>
          <div className="h-1.5 w-full bg-[var(--bg-main)] rounded overflow-hidden">
            <div
              className={`h-full transition-all ${
                confidenceScore >= 80 ? 'bg-[var(--accent-primary)]' : confidenceScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
          <span className="text-[var(--text-main)] font-bold text-[11px]">{confidenceScore}%</span>
        </div>

        {claim.confidence?.reasoning && (
          <span className="text-[11px] text-[var(--text-muted)] truncate max-w-xs font-sans hidden md:block">
            {claim.confidence.reasoning}
          </span>
        )}
      </div>
    </div>
  );
};
