import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, CheckCircle2, AlertTriangle, ShieldCheck, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onToggleSidebar,
  sidebarCollapsed = false
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 1,
      title: 'Multi-Agent Verification Pipeline Active',
      desc: '4-agent autonomous pipeline connected to Gemini reasoning cluster.',
      time: 'Just now',
      icon: CheckCircle2,
      color: 'text-[var(--text-accent)]'
    },
    {
      id: 2,
      title: 'Live Academic Search Anchors Synced',
      desc: 'Direct query anchors active for arXiv, Google Scholar & IEEE.',
      time: '5m ago',
      icon: ShieldCheck,
      color: 'text-[#38bdf8]'
    },
    {
      id: 3,
      title: 'System Telemetry Synced',
      desc: 'Real-time telemetry and claim matrix auditing operational.',
      time: '12m ago',
      icon: CheckCircle2,
      color: 'text-green-500'
    }
  ];

  return (
    <header className={`fixed top-0 right-0 left-0 ${sidebarCollapsed ? 'md:left-[76px]' : 'md:left-[260px]'} z-40 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-main)] h-16 px-4 md:px-8 flex items-center justify-between transition-all duration-300`}>
      {/* Left side: Hamburger (3 lines) on both desktop & mobile + Search trigger */}
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Menu className="w-5 h-5 text-[var(--text-accent)]" />
        </button>

        <div
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-2 bg-[var(--bg-sidebar)] border border-[var(--border-main)] hover:border-[var(--text-accent)] rounded px-3.5 py-1.5 text-xs text-[var(--text-muted)] cursor-pointer w-full max-w-sm transition-all"
        >
          <Search className="w-4 h-4 text-[var(--text-accent)] shrink-0" />
          <span className="truncate">Search research vault...</span>
          <kbd className="hidden sm:inline-block ml-auto bg-[var(--bg-surface-highest)] text-[var(--text-muted)] text-[10px] px-1.5 py-0.5 rounded font-mono border border-[var(--border-main)]">
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
            className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-accent)] hover:bg-[var(--bg-surface)] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--text-accent)] rounded-full ring-2 ring-[var(--bg-main)] animate-ping" />
            )}
            {unread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--text-accent)] rounded-full ring-2 ring-[var(--bg-main)]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[var(--bg-sidebar)] border border-[var(--border-main)] rounded shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-[var(--border-main)] flex items-center justify-between bg-[var(--bg-main)]">
                <span className="font-serif text-sm font-bold text-[var(--text-main)]">System Notifications</span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border-main)]/40 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-[var(--bg-surface)] transition-colors space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <n.icon className={`w-4 h-4 ${n.color}`} />
                        <h4 className="text-xs font-semibold text-[var(--text-main)] font-sans">{n.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]/60 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] font-sans pl-6">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[var(--border-main)] bg-[var(--bg-main)] text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/history');
                  }}
                  className="font-mono text-[10px] text-[var(--text-accent)] hover:underline uppercase cursor-pointer"
                >
                  View All Activity Logs ↵
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <div
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-[var(--bg-surface)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--bg-surface-highest)] border border-[var(--border-main)] text-[var(--text-accent)] flex items-center justify-center font-serif font-bold text-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PA'}
            </div>
            <span className="hidden lg:inline-block text-xs font-mono text-[var(--text-main)]">
              {user?.name || 'Researcher'}
            </span>
          </div>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-sidebar)] border border-[var(--border-main)] rounded shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 font-mono text-xs">
              <div className="p-3 bg-[var(--bg-main)] border-b border-[var(--border-main)] space-y-0.5">
                <span className="font-bold text-[var(--text-main)] block truncate">{user?.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] block truncate">{user?.email}</span>
              </div>
              <div className="p-1 space-y-1">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-[var(--text-main)] hover:bg-[var(--bg-surface-high)] rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                  <span>View Account Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-950/40 rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

