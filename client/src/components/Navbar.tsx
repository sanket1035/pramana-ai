import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Command, Plus, Sparkles, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 p-[1px] shadow-lg shadow-purple-950/40">
            <div className="w-full h-full bg-[#09090B] rounded-[7px] flex items-center justify-center group-hover:bg-purple-950/20 transition-colors">
              <ShieldCheck className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Pramāṇa <span className="text-xs px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono border border-purple-800/50">AI</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wide hidden sm:block">Multi-Agent Verification</span>
          </div>
        </Link>
      </div>

      {/* Center Command Bar Trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center space-x-3 px-3.5 py-1.5 rounded-lg bg-[#111113] border border-[#27272A] hover:border-purple-500/40 text-sm text-zinc-400 hover:text-zinc-200 transition-all w-80 justify-between group cursor-pointer"
      >
        <span className="flex items-center space-x-2">
          <Command className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium">Search query or commands...</span>
        </span>
        <kbd className="text-[10px] font-mono bg-[#1C1C1F] text-zinc-400 px-1.5 py-0.5 rounded border border-[#27272A] group-hover:border-purple-500/30">
          ⌘K
        </kbd>
      </button>

      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate('/research/new')}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-purple-950/30 transition-all cursor-pointer hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Research</span>
        </button>

        <Link
          to="/profile"
          className="w-8 h-8 rounded-lg bg-[#111113] border border-[#27272A] hover:border-purple-500/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          title="User Profile"
        >
          <UserIcon className="w-4 h-4 text-purple-400" />
        </Link>
      </div>
    </header>
  );
};
