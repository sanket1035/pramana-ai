import React, { useState, useRef } from 'react';
import { ExternalLink, BookmarkCheck } from 'lucide-react';
import { Citation } from '../types/index.js';

interface CitationPopoverProps {
  citation: Citation;
}

export const CitationPopover: React.FC<CitationPopoverProps> = ({ citation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[var(--text-accent)]/10 hover:bg-[var(--text-accent)]/20 border border-[var(--text-accent)]/30 text-[10px] font-mono text-[var(--text-accent)] transition-colors cursor-pointer ml-1.5 align-middle"
      >
        <BookmarkCheck className="w-3 h-3 text-[var(--text-accent)]" />
        <span>Cite</span>
      </button>

      {isOpen && (
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-full left-0 mb-2 w-72 sm:w-80 p-3 bg.var(--bg-surface)] border border-[var(--border-main)] rounded-xl shadow-2xl z-50 block animate-in fade-in zoom-in-95 duration-150 text-left bg-[var(--bg-surface)]"
          style={{ minWidth: '280px' }}
        >
          <span className="text-xs font-semibold text-[var(--text-main)] flex items-center justify-between mb-1.5 font-sans block">
            <span className="truncate pr-2">{citation.source_title}</span>
            <a
              href={citation.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-accent)] hover:underline flex items-center gap-1 shrink-0 font-mono text-[10px]"
            >
              <span>Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </span>

          <span className="text-[11px] text-[var(--text-muted)] italic font-sans bg-[var(--bg-main)] p-2.5 rounded border border-[var(--border-main)] leading-relaxed block">
            "{citation.snippet}"
          </span>

          <a
            href={citation.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[10px] font-mono text-[var(--text-accent)] hover:underline truncate block"
          >
            {citation.source_url}
          </a>
        </span>
      )}
    </span>
  );
};
