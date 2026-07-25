import React from 'react';
import { Search, Bell } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-260px)] z-40 bg-[#151310]/80 backdrop-blur-md border-b border-[#554336] flex justify-between items-center h-16 px-6">
      {/* Search Input Trigger */}
      <div
        onClick={onOpenCommandPalette}
        className="flex items-center w-80 md:w-96 bg-[#1e1b19] px-3.5 py-1.5 rounded border border-[#554336]/40 cursor-pointer hover:border-[#ffb77d]/40 transition-colors"
      >
        <Search className="w-4 h-4 text-[#dbc2b0] mr-2 shrink-0" />
        <span className="text-xs text-[#dbc2b0]/70 font-sans w-full">Search research vault...</span>
        <span className="font-mono text-[10px] text-[#a38c7c] border border-[#a38c7c]/30 px-1.5 py-0.5 rounded ml-2">
          ⌘K
        </span>
      </div>

      {/* Right User Badge */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-[#dbc2b0] hover:text-[#ffb77d] cursor-pointer transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 bg-[#ffb77d] rounded-full absolute -top-0.5 -right-0.5" />
        </div>

        <div className="h-8 w-8 rounded bg-[#383431] border border-[#554336] flex items-center justify-center font-mono text-xs font-bold text-[#ffb77d]">
          PA
        </div>
      </div>
    </header>
  );
};
