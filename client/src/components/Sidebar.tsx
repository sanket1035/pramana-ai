import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, FileText, Bot, Settings, Plus, User, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.js';
import { useAuth } from '../context/AuthContext.js';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile, collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'History', path: '/history', icon: History },
    { label: 'Generate Report', path: '/research/new', icon: FileText },
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
        className={`fixed top-0 left-0 bottom-0 z-50 ${
          collapsed ? 'w-[76px] px-2' : 'w-[260px] px-4'
        } bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] flex flex-col py-6 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-2'}`}>
          <div className="cursor-pointer flex items-center gap-2.5" onClick={() => handleNavClick('/dashboard')} title="Pramāṇa AI">
            <img src="/Pramana-Ai.png" alt="Pramāṇa AI" className="w-8 h-8 object-contain rounded shrink-0" />
            {!collapsed && (
              <div className="overflow-hidden transition-all duration-200">
                <h1 className="font-serif text-2xl font-bold text-[var(--text-main)] tracking-tight leading-none">Pramāṇa</h1>
                <p className="font-mono text-[9px] text-[var(--text-accent)] uppercase tracking-widest mt-1">
                  AI Research Platform
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-accent)] text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#ffb77d]" /> : <Moon className="w-4 h-4 text-[#d97707]" />}
            </button>
          )}
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
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5'} rounded font-sans text-xs transition-all cursor-pointer text-left ${
                  isActive
                    ? 'font-bold text-[var(--text-main)] bg-[var(--bg-surface-high)] border-r-2 border-[var(--text-accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)]'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA & Profile */}
        <div className="mt-auto pt-6 border-t border-[var(--border-main)]/60 space-y-3">
          <button
            onClick={() => handleNavClick('/research/new')}
            title={collapsed ? "New Research" : undefined}
            className={`w-full bg-[var(--accent-primary)] hover:brightness-110 active:scale-95 text-[var(--text-accent-contrast)] font-mono text-xs font-bold ${
              collapsed ? 'p-3 justify-center' : 'py-3 px-4 justify-center gap-2'
            } rounded flex items-center transition-all cursor-pointer uppercase tracking-wider shadow-lg`}
          >
            <Plus className="w-4 h-4 shrink-0" />
            {!collapsed && <span>NEW RESEARCH</span>}
          </button>

          <div className={`flex items-center ${collapsed ? 'flex-col gap-2' : 'gap-2'}`}>
            <button
              onClick={() => handleNavClick('/profile')}
              title={collapsed ? "Profile" : undefined}
              className={`flex-grow flex items-center ${collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'} rounded font-sans text-xs transition-colors cursor-pointer text-left ${
                location.pathname === '/profile'
                  ? 'font-bold text-[var(--text-main)] bg-[var(--bg-surface-high)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <User className="w-4 h-4 text-[var(--text-accent)] shrink-0" />
              {!collapsed && <span className="truncate">Profile</span>}
            </button>

            <button
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
              className="p-2 rounded text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Sign Out Session"
            >
              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

