import React from 'react';
import { Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, FileSpreadsheet, RefreshCw, Download, Terminal, Activity, Layers, Cpu } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      {/* Header Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 mb-1 font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
            <span>Workspace</span>
            <span>›</span>
            <span className="text-[var(--text-accent)]">Agent Infrastructure</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-main)]">System Monitoring</h1>
        </div>

        <div className="flex gap-3">
          <button className="font-mono text-xs px-4 py-2 border border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-accent)] hover:text-[var(--text-accent)] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> REBOOT CLUSTER
          </button>
          <button className="font-mono text-xs px-4 py-2 bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] hover:bg-[var(--bg-surface-high)] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> EXPORT TELEMETRY
          </button>
        </div>
      </div>

      {/* Main Agent Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 01_RESEARCH_AGENT (Large Terminal Box) */}
        <div className="lg:col-span-8 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-primary)]" />

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Search className="w-5 h-5 text-[var(--text-accent)]" />
                <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">01_RESEARCH_AGENT</h3>
              </div>
              <p className="text-[var(--text-muted)] text-xs font-sans">Primary heuristic parsing of multi-modal dataset streams.</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[var(--text-muted)] block mb-1">UPTIME</span>
              <span className="font-mono text-sm font-bold text-[var(--text-main)]">04:12:88</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-[var(--border-main)]/40 py-4 font-mono">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Sources Processed</span>
              <span className="font-serif text-2xl font-bold text-[var(--text-main)]">1,242</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Tokens Analyzed</span>
              <span className="font-serif text-2xl font-bold text-[var(--text-main)]">8.4M</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Current Load</span>
              <div className="w-full h-1.5 bg-[var(--bg-main)] mt-2 rounded overflow-hidden">
                <div className="h-full bg-[var(--accent-primary)] w-[72%]" />
              </div>
            </div>
          </div>

          {/* Live Terminal Log Console */}
          <div className="bg-[var(--bg-main)] border border-[var(--border-main)] rounded p-4 font-mono text-[11px] text-[var(--text-muted)] space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-2 text-[var(--text-accent)] text-[10px] uppercase font-bold border-b border-[var(--border-main)]/40 pb-2 mb-2">
              <Terminal className="w-3.5 h-3.5" /> LIVE TELEMETRY LOGS
            </div>
            <div>[14:02:11] // Initiating deep-scan on "Quantum Computing Stability" datasets...</div>
            <div>[14:02:12] Cross-referencing IEEE Xplore vs Arxiv pre-prints...</div>
            <div className="text-[var(--text-accent)]">[MATCH_FOUND] Correlation 0.89 detected in thermal noise thresholding algorithms.</div>
            <div>[14:02:18] Extracting tabular data from PDF/4412-X...</div>
            <div>[14:02:22] Parsing metadata from 12 additional nodes. Waiting for latency spike to subside.</div>
          </div>
        </div>

        {/* 02_VERIFICATION (Live Vertical Bar Chart Graph) */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded relative overflow-hidden space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">02_VERIFICATION</h3>
                <p className="text-[var(--text-muted)] text-xs font-sans mt-0.5">Trust Ratio: <span className="text-[var(--text-accent)] font-bold">99.8%</span></p>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-accent)] bg-[var(--text-accent)]/10 px-2 py-0.5 rounded border border-[var(--text-accent)]/20">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block flex items-center justify-between">
                <span>LIVE INTEGRITY CHECK</span>
                <span>42ms avg</span>
              </span>

              {/* Vertical Bar Chart Pillars */}
              <div className="h-32 bg-[var(--bg-main)] border border-[var(--border-main)] rounded p-4 flex items-end justify-between gap-2">
                {[65, 80, 45, 90, 70, 85, 100, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-[var(--bg-surface-high)] rounded-t overflow-hidden relative group">
                    <div
                      className="bg-[var(--accent-primary)] w-full rounded-t transition-all group-hover:brightness-125"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded font-mono text-[11px] text-[var(--text-muted)]">
            <span className="text-[var(--text-accent)] font-bold">CURRENT TASK:</span> Validating source authorship for "Node-441-A"
          </div>
        </div>

        {/* 03_CONTRADICTION */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">03_CONTRADICTION</h3>
          </div>
          <p className="text-[var(--text-muted)] text-xs">Audits claims for internal inconsistencies and hallucinations.</p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-2">
              <span className="font-mono text-xs text-[var(--text-muted)]">CONFLICTS DETECTED</span>
              <span className="font-serif text-3xl font-bold text-[var(--text-main)]">14</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>High Conflict</span>
              <span className="text-red-400 font-bold">02</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>Semantic Drift</span>
              <span className="text-[var(--text-accent)] font-bold">12</span>
            </div>
          </div>
        </div>

        {/* 04_CONFIDENCE (Circular Gauge Graph) */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4 flex flex-col items-center justify-center text-center">
          <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">04_CONFIDENCE</h3>
          <p className="text-[var(--text-muted)] text-xs">Probabilistic 0-100% mathematical rationale</p>

          {/* SVG Circular Gauge */}
          <div className="relative w-28 h-28 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[var(--border-main)]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[var(--accent-primary)]"
                strokeDasharray="88, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-serif font-bold text-xl text-[var(--text-main)]">
              88%
              <span className="font-mono text-[8px] text-[var(--text-muted)] uppercase">GLOBAL SCORE</span>
            </div>
          </div>
        </div>

        {/* 05_CITATION */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[var(--text-accent)]" />
            <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">05_CITATION</h3>
          </div>
          <p className="text-[var(--text-muted)] text-xs">Deep-linked source attribution anchors.</p>

          <div className="space-y-2.5 pt-2 text-xs font-mono">
            <div className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
              <span className="truncate max-w-[180px] text-[var(--text-main)]">Smith_EtAl_2024_Main.pdf</span>
              <span className="text-[var(--text-accent)] font-bold">100%</span>
            </div>
            <div className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
              <span className="truncate max-w-[180px] text-[var(--text-main)]">reuters.com/tech/research/...</span>
              <span className="text-[var(--text-accent)] font-bold">85%</span>
            </div>
            <div className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
              <span className="truncate max-w-[180px] text-[var(--text-main)]">arXiv-endpoint-alpha-v2</span>
              <span className="text-[var(--text-accent)] font-bold">92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Infrastructure Status Bar */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-4 md:p-6 rounded grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">MEMORY LATENCY</span>
          <span className="font-bold text-[var(--text-main)]">1.2ms <span className="text-green-500 text-[10px]">OPTIMAL</span></span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">THREAD ALLOCATION</span>
          <span className="font-bold text-[var(--text-main)]">1,024 Workers</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">VERIFICATION QUEUE</span>
          <span className="font-bold text-[var(--text-accent)]">0 Pending</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">PLATFORM INTEGRITY</span>
          <span className="font-bold text-[var(--text-main)]">Tier 3 Verified</span>
        </div>
      </div>
    </div>
  );
};
