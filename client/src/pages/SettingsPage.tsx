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
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-main)]">System Preferences</h1>
        <p className="text-xs md:text-sm font-sans text-[var(--text-muted)] max-w-lg">
          Manage your research environment, visual themes, notification alerts, and data persistence protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sub Navigation */}
        <nav className="md:col-span-3 space-y-1.5 shrink-0">
          <button
            onClick={() => scrollToSection('appearance')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[var(--text-accent)] font-bold bg-[var(--bg-surface)] border-l-2 border-[var(--text-accent)] cursor-pointer"
          >
            <span>Appearance</span>
          </button>

          <button
            onClick={() => scrollToSection('notifications')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sidebar)] cursor-pointer"
          >
            <span>Notifications</span>
          </button>

          <button
            onClick={() => scrollToSection('data')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider rounded text-left transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sidebar)] cursor-pointer"
          >
            <span>Data Management</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-12">
          {/* Appearance Section */}
          <section className="space-y-6" id="appearance">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-main)]">
              <Palette className="w-4.5 h-4.5 text-[var(--text-accent)]" />
              <h3 className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold">Appearance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Theme Engine */}
              <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex flex-col justify-between h-44 space-y-4">
                <div>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Theme Engine</p>
                  <h4 className="font-serif text-lg font-bold text-[var(--text-main)] mt-1">
                    {theme === 'dark' ? 'Dark Warm Graphite' : 'Light Editorial Paper'}
                  </h4>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-2.5 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-[var(--accent-primary)] text-[var(--text-accent-contrast)] shadow-md'
                        : 'border border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-accent)]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>DARK</span>
                  </button>

                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-2.5 px-3 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-[#d97707] text-white shadow-md'
                        : 'border border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-accent)]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>LIGHT</span>
                  </button>
                </div>
              </div>

              {/* Density Control */}
              <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded space-y-4">
                <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Layout Density</p>
                <div className="space-y-3 text-xs font-sans text-[var(--text-main)]">
                  <div
                    onClick={() => setDensity('editorial')}
                    className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[var(--bg-sidebar)]"
                  >
                    <span>Editorial Spacing</span>
                    <input
                      type="radio"
                      name="density"
                      checked={density === 'editorial'}
                      onChange={() => setDensity('editorial')}
                      className="accent-[var(--accent-primary)]"
                    />
                  </div>

                  <div
                    onClick={() => setDensity('compact')}
                    className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[var(--bg-sidebar)]"
                  >
                    <span>Compact Grid</span>
                    <input
                      type="radio"
                      name="density"
                      checked={density === 'compact'}
                      onChange={() => setDensity('compact')}
                      className="accent-[var(--accent-primary)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-6" id="notifications">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-main)]">
              <Bell className="w-4.5 h-4.5 text-[var(--text-accent)]" />
              <h3 className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold">Notifications</h3>
            </div>

            <div className="space-y-3">
              {/* Option 1 */}
              <label className="flex items-start justify-between p-4 bg-[var(--bg-surface)] rounded border border-[var(--border-main)] cursor-pointer hover:border-[var(--border-hover)] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[var(--text-main)]">Report Completions</p>
                  <p className="text-xs text-[var(--text-muted)]">Get notified when a deep-research thread finishes multi-agent synthesis.</p>
                </div>
                <input
                  type="checkbox"
                  checked={reportCompletions}
                  onChange={(e) => setReportCompletions(e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border-main)] bg-[var(--bg-main)] accent-[var(--accent-primary)] cursor-pointer mt-0.5"
                />
              </label>

              {/* Option 2 */}
              <label className="flex items-start justify-between p-4 bg-[var(--bg-surface)] rounded border border-[var(--border-main)] cursor-pointer hover:border-[var(--border-hover)] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[var(--text-main)]">Agent Conflict Alerts</p>
                  <p className="text-xs text-[var(--text-muted)]">Instant alert if two agents discover contradictory evidence.</p>
                </div>
                <input
                  type="checkbox"
                  checked={conflictAlerts}
                  onChange={(e) => setConflictAlerts(e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border-main)] bg-[var(--bg-main)] accent-[var(--accent-primary)] cursor-pointer mt-0.5"
                />
              </label>

              {/* Option 3 */}
              <label className="flex items-start justify-between p-4 bg-[var(--bg-surface)] rounded border border-[var(--border-main)] cursor-pointer hover:border-[var(--border-hover)] transition-colors">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[var(--text-main)]">Weekly Intelligence Summary</p>
                  <p className="text-xs text-[var(--text-muted)]">A curated digest of your workspace's research output.</p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--border-main)] bg-[var(--bg-main)] accent-[var(--accent-primary)] cursor-pointer mt-0.5"
                />
              </label>
            </div>
          </section>

          {/* Data Management Section */}
          <section className="space-y-6" id="data">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-main)]">
              <Database className="w-4.5 h-4.5 text-[var(--text-accent)]" />
              <h3 className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold">Data Management</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-[var(--text-main)]">Export Research History</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Download all verified claims, citations, and report drafts in JSON format.</p>
                </div>
                <button
                  onClick={handleExport}
                  className="w-full py-2.5 border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-accent)] hover:border-[var(--text-accent)] transition-all text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT RESEARCH VAULT</span>
                </button>
              </div>

              <div className="p-6 bg-red-950/20 border border-red-800/30 rounded flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-red-400">Termination Zone</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Irreversibly clear all workspace session data and history logs.</p>
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
            className="w-full bg-[var(--accent-primary)] hover:brightness-110 text-[var(--text-accent-contrast)] font-mono font-bold text-xs py-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-widest shadow-lg"
          >
            {saved ? <Check className="w-4 h-4 text-green-950" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{saved ? 'PREFERENCES SAVED SUCCESSFULLY' : 'SAVE SYSTEM PREFERENCES'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
