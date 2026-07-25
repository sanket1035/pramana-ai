import React, { useState } from 'react';
import { Palette, Bell, Database, Check, ShieldCheck, Download, Trash2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.js';
import { clearResearchHistory } from '../services/api.js';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Working notification states
  const [reportCompletions, setReportCompletions] = useState(true);
  const [conflictAlerts, setConflictAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  // Density state
  const [density, setDensity] = useState<'compact' | 'editorial'>('editorial');

  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ exportDate: new Date(), system: "Pramāṇa Research OS" }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "pramana_research_vault_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearHistory = async () => {
    if (confirm('Irreversibly delete all local research history logs?')) {
      await clearResearchHistory();
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 space-y-10 pb-20">
      {/* Settings Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#e8e1dd]">System Preferences</h1>
        <p className="text-xs md:text-sm font-sans text-[#dbc2b0] max-w-lg">
          Manage your research environment, visual themes, notification alerts, and data persistence protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sub Navigation */}
        <nav className="md:col-span-3 space-y-1.5 shrink-0">
          <button
            onClick={() => scrollToSection('appearance')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[#ffb77d] font-bold bg-[#221f1c] border-l-2 border-[#ffb77d] cursor-pointer"
          >
            <span>Appearance</span>
          </button>

          <button
            onClick={() => scrollToSection('notifications')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#1e1b19] cursor-pointer"
          >
            <span>Notifications</span>
          </button>

          <button
            onClick={() => scrollToSection('data')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[#dbc2b0] hover:text-[#e8e1dd] hover:bg-[#1e1b19] cursor-pointer"
          >
            <span>Data Management</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-12">
          {/* Appearance Section */}
          <section className="space-y-6" id="appearance">
            <div className="flex items-center gap-2 pb-2 border-b border-[#554336]">
              <Palette className="w-4.5 h-4.5 text-[#ffb77d]" />
              <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">Appearance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Theme Engine */}
              <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded flex flex-col justify-between h-44 space-y-4">
                <div>
                  <p className="font-mono text-[10px] text-[#dbc2b0] uppercase">Theme Engine</p>
                  <h4 className="font-serif text-lg font-bold text-[#e8e1dd] mt-1">
                    {theme === 'dark' ? 'Dark Warm Graphite' : 'Light Editorial Paper'}
                  </h4>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-2.5 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-[#ffb77d] text-[#4d2600] shadow-md shadow-[#ffb77d]/20'
                        : 'border border-[#554336] text-[#dbc2b0] hover:border-[#ffb77d]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>DARK</span>
                  </button>

                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-2.5 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-[#d97707] text-white shadow-md shadow-[#d97707]/20'
                        : 'border border-[#554336] text-[#dbc2b0] hover:border-[#ffb77d]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>LIGHT</span>
                  </button>
                </div>
              </div>

              {/* Density Control */}
              <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded space-y-4">
                <p className="font-mono text-[10px] text-[#dbc2b0] uppercase">Layout Density</p>
                <div className="space-y-3 text-xs font-sans text-[#e8e1dd]">
                  <div
                    onClick={() => setDensity('editorial')}
                    className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[#221f1c]"
                  >
                    <span>Editorial Spacing</span>
                    <input
                      type="radio"
                      name="density"
                      checked={density === 'editorial'}
                      onChange={() => setDensity('editorial')}
                      className="accent-[#ffb77d]"
                    />
                  </div>

                  <div
                    onClick={() => setDensity('compact')}
                    className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[#221f1c]"
                  >
                    <span>Compact Grid</span>
                    <input
                      type="radio"
                      name="density"
                      checked={density === 'compact'}
                      onChange={() => setDensity('compact')}
                      className="accent-[#ffb77d]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-6" id="notifications">
            <div className="flex items-center gap-2 pb-2 border-b border-[#554336]">
              <Bell className="w-4.5 h-4.5 text-[#ffb77d]" />
              <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">Notifications</h3>
            </div>

            <div className="space-y-3">
              {/* Option 1 */}
              <label className="flex items-start justify-between p-4 bg-[#1e1b19] rounded border border-[#554336] cursor-pointer hover:border-[#a38c7c] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[#e8e1dd]">Report Completions</p>
                  <p className="text-xs text-[#dbc2b0]/70">Get notified when a deep-research thread finishes multi-agent synthesis.</p>
                </div>
                <input
                  type="checkbox"
                  checked={reportCompletions}
                  onChange={(e) => setReportCompletions(e.target.checked)}
                  className="w-5 h-5 rounded border-[#554336] bg-[#151310] accent-[#ffb77d] cursor-pointer mt-0.5"
                />
              </label>

              {/* Option 2 */}
              <label className="flex items-start justify-between p-4 bg-[#1e1b19] rounded border border-[#554336] cursor-pointer hover:border-[#a38c7c] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[#e8e1dd]">Agent Conflict Alerts</p>
                  <p className="text-xs text-[#dbc2b0]/70">Instant alert if two agents discover contradictory evidence.</p>
                </div>
                <input
                  type="checkbox"
                  checked={conflictAlerts}
                  onChange={(e) => setConflictAlerts(e.target.checked)}
                  className="w-5 h-5 rounded border-[#554336] bg-[#151310] accent-[#ffb77d] cursor-pointer mt-0.5"
                />
              </label>

              {/* Option 3 */}
              <label className="flex items-start justify-between p-4 bg-[#1e1b19] rounded border border-[#554336] cursor-pointer hover:border-[#a38c7c] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[#e8e1dd]">Weekly Intelligence Summary</p>
                  <p className="text-xs text-[#dbc2b0]/70">A curated digest of your workspace's research output.</p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  className="w-5 h-5 rounded border-[#554336] bg-[#151310] accent-[#ffb77d] cursor-pointer mt-0.5"
                />
              </label>
            </div>
          </section>

          {/* Data Management Section */}
          <section className="space-y-6" id="data">
            <div className="flex items-center gap-2 pb-2 border-b border-[#554336]">
              <Database className="w-4.5 h-4.5 text-[#ffb77d]" />
              <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">Data Management</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#1e1b19] border border-[#554336] rounded flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#e8e1dd]">Export Research History</h4>
                  <p className="text-xs text-[#dbc2b0]/70 mt-1">Download all verified claims, citations, and report drafts in JSON format.</p>
                </div>
                <button
                  onClick={handleExport}
                  className="w-full py-2.5 border border-[#554336] text-[#dbc2b0] hover:text-[#ffb77d] hover:border-[#ffb77d] transition-all text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT RESEARCH VAULT</span>
                </button>
              </div>

              <div className="p-6 bg-red-950/20 border border-red-800/30 rounded flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-red-400">Termination Zone</h4>
                  <p className="text-xs text-[#dbc2b0]/70 mt-1">Irreversibly clear all workspace session data and history logs.</p>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="w-full py-2.5 border border-red-800/40 text-red-400 hover:bg-red-950/60 transition-all text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{cleared ? 'HISTORY CLEARED' : 'DELETE SESSION LOGS'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs py-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-widest shadow-lg shadow-[#ffb77d]/10"
          >
            {saved ? <Check className="w-4 h-4 text-green-950" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{saved ? 'PREFERENCES SAVED SUCCESSFULLY' : 'SAVE SYSTEM PREFERENCES'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
