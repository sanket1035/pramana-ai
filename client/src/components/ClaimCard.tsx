import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';
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
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-green-400 bg-green-950/40 px-2 py-0.5 rounded border border-green-800/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        );
      case 'contradicted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
            <AlertTriangle className="w-3.5 h-3.5" /> Contradicted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            <HelpCircle className="w-3.5 h-3.5" /> Unverified
          </span>
        );
    }
  };

  const confidenceScore = claim.confidence?.score ?? (claim.status === 'verified' ? 95 : 30);

  return (
    <div className="p-4 rounded-xl bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] transition-all space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            #{claim.order_index}
          </span>
          <p className="text-sm font-medium text-zinc-100 leading-snug">
            {claim.claim_text}
            {claim.citation && <CitationPopover citation={claim.citation} />}
          </p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Confidence Score Bar */}
      <div className="pt-2 border-t border-[#27272A] flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-zinc-400 text-[11px]">Confidence:</span>
          <div className="h-1.5 w-full bg-[#1C1C1F] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                confidenceScore >= 80 ? 'bg-green-500' : confidenceScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
          <span className="text-white font-bold text-[11px]">{confidenceScore}%</span>
        </div>

        {claim.confidence?.reasoning && (
          <span className="text-[11px] text-zinc-400 truncate max-w-xs font-sans hidden md:block">
            {claim.confidence.reasoning}
          </span>
        )}
      </div>
    </div>
  );
};
