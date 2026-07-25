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
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-[#1e1b19] dark:bg-[#1e1b19] border-r border-[#554336] flex flex-col py-6 px-4 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="mb-8 px-2 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => handleNavClick('/dashboard')}>
            <h1 className="font-serif text-3xl font-bold text-[#e8e1dd] tracking-tight">Pramāṇa</h1>
            <p className="font-mono text-[10px] text-[#ffb77d] uppercase tracking-widest mt-0.5">
              AI Research Platform
            </p>
          </div>

          {/* Theme Quick Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-[#554336] hover:border-[#ffb77d] text-[#dbc2b0] hover:text-[#ffb77d] transition-colors"
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
                    ? 'font-bold text-[#e8e1dd] bg-[#2d2927] border-r-2 border-[#ffb77d]'
                    : 'text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#221f1c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ffb77d]' : 'text-[#dbc2b0]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA & Profile */}
        <div className="mt-auto pt-6 border-t border-[#554336]/60 space-y-3">
          <button
            onClick={() => handleNavClick('/research/new')}
            className="w-full bg-[#ffb77d] hover:brightness-110 active:scale-95 text-[#4d2600] font-mono text-xs font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider shadow-lg shadow-[#ffb77d]/10"
          >
            <Plus className="w-4 h-4" />
            <span>NEW RESEARCH</span>
          </button>

          <button
            onClick={() => handleNavClick('/profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded font-sans text-xs transition-colors cursor-pointer text-left ${
              location.pathname === '/profile'
                ? 'font-bold text-[#e8e1dd] bg-[#2d2927]'
                : 'text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#221f1c]'
            }`}
          >
            <User className="w-4 h-4 text-[#ffb77d]" />
            <span>Profile</span>
          </button>
        </div>
      </aside>
    </>
  );
};
