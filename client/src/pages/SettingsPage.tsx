import React, { useState } from 'react';
import { Palette, Key, ShieldCheck, Database, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState('dark');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 space-y-10">
      {/* Settings Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#e8e1dd]">System Preferences</h1>
        <p className="text-sm font-sans text-[#dbc2b0] max-w-lg">
          Manage your research environment, agent configurations, and data persistence protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sub Navigation */}
        <nav className="md:col-span-3 space-y-1.5">
          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all ${
              activeTab === 'appearance'
                ? 'text-[#ffb77d] font-bold bg-[#221f1c] border-l-2 border-[#ffb77d]'
                : 'text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#1e1b19]'
            }`}
          >
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-model')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all ${
              activeTab === 'ai-model'
                ? 'text-[#ffb77d] font-bold bg-[#221f1c] border-l-2 border-[#ffb77d]'
                : 'text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#1e1b19]'
            }`}
          >
            <span>AI Model</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all ${
              activeTab === 'data'
                ? 'text-[#ffb77d] font-bold bg-[#221f1c] border-l-2 border-[#ffb77d]'
                : 'text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#1e1b19]'
            }`}
          >
            <span>Data</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          {/* Appearance */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#554336]">
              <Palette className="w-4 h-4 text-[#ffb77d]" />
              <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">Appearance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded flex flex-col justify-between h-40">
                <div>
                  <p className="font-mono text-[10px] text-[#dbc2b0] uppercase">Theme Engine</p>
                  <h4 className="font-serif text-lg font-bold text-[#e8e1dd] mt-1">Editorial Dark</h4>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-2 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded ${
                      theme === 'dark' ? 'bg-[#ffb77d] text-[#4d2600]' : 'border border-[#554336] text-[#dbc2b0]'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('paper')}
                    className={`flex-1 py-2 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded ${
                      theme === 'paper' ? 'bg-[#ffb77d] text-[#4d2600]' : 'border border-[#554336] text-[#dbc2b0]'
                    }`}
                  >
                    Paper
                  </button>
                </div>
              </div>

              <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded space-y-3">
                <p className="font-mono text-[10px] text-[#dbc2b0] uppercase">Layout Density</p>
                <div className="space-y-2 text-xs font-sans text-[#e8e1dd]">
                  <div className="flex items-center justify-between">
                    <span>Editorial Spacing</span>
                    <span className="font-mono text-[#ffb77d]">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between text-[#dbc2b0]/60">
                    <span>Compact Grid</span>
                    <span className="font-mono text-[10px]">Disabled</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Model Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#554336]">
              <Key className="w-4 h-4 text-[#ffb77d]" />
              <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">AI Model Integration</h3>
            </div>

            <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#e8e1dd]">Google Gemini 2.5 Flash</h4>
                  <p className="text-xs text-[#dbc2b0]/70 font-sans">Multi-Agent reasoning engine with real-time verification queues.</p>
                </div>
                <span className="font-mono text-xs bg-[#ffb77d]/10 text-[#ffb77d] px-2.5 py-1 rounded border border-[#ffb77d]/30">CONNECTED</span>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs px-6 py-3 rounded flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
          >
            {saved ? <Check className="w-4 h-4 text-green-900" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{saved ? 'Preferences Saved' : 'Save System Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
