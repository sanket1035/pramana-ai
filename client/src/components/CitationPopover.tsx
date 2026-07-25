import React, { useState } from 'react';
import { ExternalLink, BookmarkCheck } from 'lucide-react';
import { Citation } from '../types/index.js';

interface CitationPopoverProps {
  citation: Citation;
}

export const CitationPopover: React.FC<CitationPopoverProps> = ({ citation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-[10px] font-mono text-purple-300 transition-colors cursor-pointer ml-1.5"
      >
        <BookmarkCheck className="w-3 h-3 text-purple-400" />
        <span>Cite</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 p-3 bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[11px] font-semibold text-white flex items-center justify-between mb-1">
            <span className="truncate pr-2">{citation.source_title}</span>
            <a
              href={citation.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-0.5 shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-zinc-300 italic font-sans bg-[#09090B] p-2 rounded border border-[#27272A] leading-relaxed">
            "{citation.snippet}"
          </p>
          <div className="mt-1.5 text-[9px] font-mono text-zinc-500 truncate">
            {citation.source_url}
          </div>
        </div>
      )}
    </div>
  );
};
