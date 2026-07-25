import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  const notifications = [
    {
      id: 1,
      title: 'Quantum Encryption Audit Complete',
      desc: '6-agent verification pipeline finished with 96% confidence.',
      time: '10m ago',
      icon: CheckCircle2,
      color: 'text-[#ffb77d]'
    },
    {
      id: 2,
      title: 'Contradiction Flagged in Source B',
      desc: 'Temporal discrepancy detected between 2022 and 2024 benchmarks.',
      time: '1h ago',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      id: 3,
      title: 'System Telemetry Synced',
      desc: 'Gemini 2.0 Flash reasoning cluster running optimally.',
      time: '3h ago',
      icon: ShieldCheck,
      color: 'text-green-400'
    }
  ];

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[260px] z-40 bg-[#151310]/90 backdrop-blur-md border-b border-[#554336] h-16 px-4 md:px-8 flex items-center justify-between transition-all">
      {/* Left side: Hamburger on mobile + Search trigger */}
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#221f1c]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-2 bg-[#1e1b19] border border-[#554336] hover:border-[#ffb77d] rounded px-3 py-1.5 text-xs text-[#dbc2b0] cursor-pointer w-full max-w-sm transition-all"
        >
          <Search className="w-4 h-4 text-[#ffb77d] shrink-0" />
          <span className="truncate">Search research vault...</span>
          <kbd className="hidden sm:inline-block ml-auto bg-[#383431] text-[#dbc2b0] text-[10px] px-1.5 py-0.5 rounded font-mono border border-[#554336]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side: Notifications + User Badge */}
      <div className="flex items-center space-x-4 relative">
        {/* Working Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUnread(false);
            }}
            className="p-2 rounded-full text-[#dbc2b0] hover:text-[#ffb77d] hover:bg-[#221f1c] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ffb77d] rounded-full ring-2 ring-[#151310] animate-ping" />
            )}
            {unread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ffb77d] rounded-full ring-2 ring-[#151310]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1e1b19] border border-[#554336] rounded shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-[#554336] flex items-center justify-between bg-[#151310]">
                <span className="font-serif text-sm font-bold text-[#e8e1dd]">System Notifications</span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[#dbc2b0] hover:text-[#e8e1dd]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-[#554336]/40 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-[#221f1c] transition-colors space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <n.icon className={`w-4 h-4 ${n.color}`} />
                        <h4 className="text-xs font-semibold text-[#e8e1dd] font-sans">{n.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#dbc2b0]/50 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#dbc2b0]/80 font-sans pl-6">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[#554336] bg-[#151310] text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/history');
                  }}
                  className="font-mono text-[10px] text-[#ffb77d] hover:underline uppercase"
                >
                  View All Activity Logs ↵
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-[#221f1c] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#383431] border border-[#554336] text-[#ffb77d] flex items-center justify-center font-serif font-bold text-xs">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PA'}
          </div>
          <span className="hidden lg:inline-block text-xs font-mono text-[#e8e1dd]">
            {user?.name || 'Researcher'}
          </span>
        </div>
      </div>
    </header>
  );
};
