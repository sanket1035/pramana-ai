import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, History, Bot, Settings, ShieldCheck, Sparkles } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'New Research', icon: PlusCircle, path: '/research/new' },
    { label: 'Research History', icon: History, path: '/history' },
    { label: 'Multi-Agents', icon: Bot, path: '/agents' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 border-r border-[#27272A] bg-[#09090B] flex flex-col justify-between p-4 shrink-0 hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Nav Links */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
            Platform OS
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-purple-950/40 text-purple-200 border border-purple-800/40 shadow-sm shadow-purple-950/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#111113]'
                }`
              }
            >
              <item.icon className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Pipeline Agents Badge */}
        <div className="p-3.5 rounded-xl bg-[#111113] border border-[#27272A] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-purple-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              6-Agent Pipeline
            </span>
            <span className="text-[10px] bg-green-950/60 text-green-400 px-1.5 py-0.5 rounded border border-green-800/50 font-mono">
              ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Gemini 2.5 Flash model scoring every claim with transparent source citations.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#27272A] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <span>Pramāṇa v1.0.0</span>
        <span className="flex items-center gap-1 text-purple-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified
        </span>
      </div>
    </aside>
  );
};
