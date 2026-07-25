import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, History, FileText, Bot, Settings, User, Plus } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'History', icon: History, path: '/history' },
    { label: 'Reports', icon: FileText, path: '/research/new' },
    { label: 'Agents', icon: Bot, path: '/agents' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-[#554336] bg-[#221f1c] flex flex-col py-6 px-4 z-50 shrink-0 hidden md:flex">
      {/* Brand Header */}
      <div className="mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="font-serif text-3xl font-bold text-[#e8e1dd] leading-none tracking-tight">
          Pramāṇa
        </div>
        <div className="font-mono text-xs text-[#dbc2b0] mt-1 tracking-wider">
          AI Research Platform
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 transition-colors duration-200 text-sm ${
                isActive
                  ? 'text-[#e8e1dd] font-bold border-r-2 border-[#ffb77d] bg-[#383431]/30'
                  : 'text-[#dbc2b0] font-medium hover:bg-[#383431] hover:text-[#e8e1dd]'
              }`
            }
          >
            <item.icon className="w-4 h-4 text-[#ffb77d] shrink-0" />
            <span className="font-sans">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer & New Research CTA */}
      <div className="mt-auto pt-6 border-t border-[#554336]">
        <button
          onClick={() => navigate('/research/new')}
          className="w-full bg-[#ffb77d] text-[#4d2600] font-mono font-bold text-xs py-3 rounded mb-4 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Research</span>
        </button>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 transition-colors duration-200 text-xs font-medium ${
              isActive ? 'text-[#ffb77d]' : 'text-[#dbc2b0] hover:text-[#e8e1dd]'
            }`
          }
        >
          <User className="w-4 h-4" />
          <span className="font-sans">Profile</span>
        </NavLink>
      </div>
    </aside>
  );
};
