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
    { title: 'View Past History', icon: History, path: '/history' },
    { title: 'Explore 6 AI Agents', icon: Bot, path: '/agents' },
    { title: 'System Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-[#221f1c] border border-[#554336] rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header & Input */}
        <form onSubmit={handleStartResearch} className="flex items-center px-4 py-3.5 border-b border-[#554336]">
          <Search className="w-5 h-5 text-[#ffb77d] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research vault or enter prompt..."
            className="w-full bg-transparent text-sm font-sans text-[#e8e1dd] placeholder-[#dbc2b0]/50 focus:outline-none"
            autoFocus
          />
          <button type="button" onClick={onClose} className="p-1 text-[#dbc2b0] hover:text-[#e8e1dd]">
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Command Body */}
        <div className="p-3 space-y-3 max-h-[360px] overflow-y-auto">
          {query.trim() ? (
            <button
              onClick={handleStartResearch}
              disabled={loading}
              className="w-full flex items-center justify-between p-3 rounded bg-[#1e1b19] border border-[#554336] text-left hover:border-[#ffb77d] transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#ffb77d] shrink-0" />
                <div>
                  <div className="text-xs font-mono font-semibold text-[#ffb77d]">
                    INITIATE VERIFICATION PIPELINE
                  </div>
                  <div className="text-xs text-[#e8e1dd] truncate max-w-md">
                    "{query}"
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#ffb77d] group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono font-semibold text-[#dbc2b0]/60 uppercase tracking-wider">
                Quick Navigation
              </div>
              {quickNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onClose();
                    navigate(item.path);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-[#383431] text-xs font-sans text-[#dbc2b0] hover:text-[#e8e1dd] transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4 text-[#ffb77d]" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a38c7c]">Jump ↵</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#554336] bg-[#151310] flex items-center justify-between text-[10px] font-mono text-[#dbc2b0]/60">
          <span>Pramāṇa Research OS</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
