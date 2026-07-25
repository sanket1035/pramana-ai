import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, ShieldCheck, Database, Key, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="border-b border-[#27272A] pb-4">
        <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-purple-400" />
          <span>System Settings</span>
        </h1>
        <p className="text-xs text-zinc-400">Configure theme, Gemini API parameters, and report defaults</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Appearance & Theme</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                theme === 'dark'
                  ? 'bg-purple-950/40 border-purple-600 text-purple-200'
                  : 'bg-[#09090B] border-[#27272A] text-zinc-400'
              }`}
            >
              Linear Dark (#09090B)
            </button>
            <button
              onClick={() => setTheme('paper')}
              className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                theme === 'paper'
                  ? 'bg-purple-950/40 border-purple-600 text-purple-200'
                  : 'bg-[#09090B] border-[#27272A] text-zinc-400'
              }`}
            >
              Paper High-Contrast
            </button>
          </div>
        </div>

        {/* AI Model Settings */}
        <div className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" />
            <span>Gemini API Integration</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-between font-mono">
              <span className="text-zinc-300">Active AI Model: Gemini 2.5 Flash</span>
              <span className="text-green-400 bg-green-950/50 px-2 py-0.5 rounded border border-green-800/40">CONNECTED</span>
            </div>
            <p className="text-zinc-500 text-[11px]">
              Multi-agent reasoning pipeline runs using Google Gemini API with automated fallback handling.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-2 cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4 text-green-400" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{saved ? 'Settings Saved' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );
};
