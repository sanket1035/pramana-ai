import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, FileText, Bot, Settings, Plus, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.js';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'History', path: '/history', icon: History },
    { label: 'Reports', path: '/research/new', icon: FileText },
    { label: 'Agents', path: '/agents', icon: Bot },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col py-6 px-4 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="mb-8 px-2 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => handleNavClick('/dashboard')}>
            <h1 className="font-serif text-3xl font-bold text-[var(--text-main)] tracking-tight">Pramāṇa</h1>
            <p className="font-mono text-[10px] text-[var(--text-accent)] uppercase tracking-widest mt-0.5">
              AI Research Platform
            </p>
          </div>

          {/* Theme Quick Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-accent)] text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#ffb77d]" /> : <Moon className="w-4 h-4 text-[#d97707]" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded font-sans text-xs transition-all cursor-pointer text-left ${
                  isActive
                    ? 'font-bold text-[var(--text-main)] bg-[var(--bg-surface-high)] border-r-2 border-[var(--text-accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA & Profile */}
        <div className="mt-auto pt-6 border-t border-[var(--border-main)]/60 space-y-3">
          <button
            onClick={() => handleNavClick('/research/new')}
            className="w-full bg-[var(--accent-primary)] hover:brightness-110 active:scale-95 text-[var(--text-accent-contrast)] font-mono text-xs font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>NEW RESEARCH</span>
          </button>

          <button
            onClick={() => handleNavClick('/profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded font-sans text-xs transition-colors cursor-pointer text-left ${
              location.pathname === '/profile'
                ? 'font-bold text-[var(--text-main)] bg-[var(--bg-surface-high)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <User className="w-4 h-4 text-[var(--text-accent)]" />
            <span>Profile</span>
          </button>
        </div>
      </aside>
    </>
  );
};
