import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, History, Bot, Settings, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { createResearchSession } from '../services/api.js';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const { sessionId } = await createResearchSession(query.trim());
      onClose();
      setQuery('');
      navigate(`/research/${sessionId}/progress`);
    } catch (err) {
      console.error('Error in command palette:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickNavItems = [
    { title: 'Start New Research', icon: PlusCircle, path: '/research/new' },
    { title: 'View Past Research History', icon: History, path: '/history' },
    { title: 'Explore 6 AI Agents', icon: Bot, path: '/agents' },
    { title: 'System Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Header & Search Bar */}
        <form onSubmit={handleStartResearch} className="flex items-center px-4 py-3.5 border-b border-[#27272A]">
          <Search className="w-5 h-5 text-purple-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a research question or command..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button type="button" onClick={onClose} className="p-1 text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Content Body */}
        <div className="p-3 space-y-4 max-h-[360px] overflow-y-auto">
          {query.trim() ? (
            <button
              onClick={handleStartResearch}
              disabled={loading}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-purple-950/40 border border-purple-800/50 text-left hover:bg-purple-900/40 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-purple-200">
                    Run Multi-Agent Verification Pipeline
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate max-w-md">
                    "{query}"
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                Quick Navigation
              </div>
              {quickNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onClose();
                    navigate(item.path);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#161619] text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4 text-purple-400" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Jump ↵</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#27272A] bg-[#09090B] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Pramāṇa AI Command Hub</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
