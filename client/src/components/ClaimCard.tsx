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
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-[#ffb77d] bg-[#ffb77d]/10 px-2 py-0.5 rounded border border-[#ffb77d]/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        );
      case 'contradicted':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
            <AlertTriangle className="w-3.5 h-3.5" /> Flagged
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            <HelpCircle className="w-3.5 h-3.5" /> Unverified
          </span>
        );
    }
  };

  const confidenceScore = claim.confidence?.score ?? (claim.status === 'verified' ? 95 : 30);

  return (
    <div className="p-4 rounded bg-[#1e1b19] border border-[#554336] hover:border-[#a38c7c]/50 transition-all space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <span className="text-xs font-mono font-bold text-[#ffb77d] bg-[#383431] px-2 py-0.5 rounded border border-[#554336]">
            #{claim.order_index}
          </span>
          <p className="text-sm font-sans font-medium text-[#e8e1dd] leading-snug">
            {claim.claim_text}
            {claim.citation && <CitationPopover citation={claim.citation} />}
          </p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Confidence Score Bar */}
      <div className="pt-2 border-t border-[#554336]/40 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-[#dbc2b0]/60 text-[11px]">Confidence:</span>
          <div className="h-1.5 w-full bg-[#151310] rounded overflow-hidden">
            <div
              className={`h-full transition-all ${
                confidenceScore >= 80 ? 'bg-[#ffb77d]' : confidenceScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
          <span className="text-[#e8e1dd] font-bold text-[11px]">{confidenceScore}%</span>
        </div>

        {claim.confidence?.reasoning && (
          <span className="text-[11px] text-[#dbc2b0]/70 truncate max-w-xs font-sans hidden md:block">
            {claim.confidence.reasoning}
          </span>
        )}
      </div>
    </div>
  );
};
