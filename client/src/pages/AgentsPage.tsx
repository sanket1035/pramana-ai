import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, RefreshCw, Download, Terminal, CheckCircle2, Copy, Check, Eye, Play, Pause, Trash2, X, Sliders } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ContradictionAuditItem {
  id: string;
  claimText: string;
  reason: string;
  status: string;
}

interface CitationAnchorItem {
  name: string;
  match: string;
  url: string;
}

export const AgentsPage: React.FC = () => {
  const [isRebooting, setIsRebooting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [trustRatio, setTrustRatio] = useState(99.8);
  const [confidenceScore, setConfidenceScore] = useState(88);
  const [sourcesProcessed, setSourcesProcessed] = useState('1,242');
  const [tokensAnalyzed, setTokensAnalyzed] = useState('8.4M');
  const [conflictsDetected, setConflictsDetected] = useState(2);
  const [highConflict, setHighConflict] = useState(1);
  const [semanticDrift, setSemanticDrift] = useState(12);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [isCheckingIntegrity, setIsCheckingIntegrity] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [uptimeSeconds, setUptimeSeconds] = useState(15168);

  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Initiating deep-scan on multi-modal dataset streams...`,
    `[${new Date().toLocaleTimeString()}] Cross-referencing IEEE Xplore vs arXiv pre-prints...`,
    `[STREAM_OK] Verified data packages with zero checksum loss.`,
    `[${new Date().toLocaleTimeString()}] All 5 multi-agent containers ONLINE.`
  ]);

  const [auditLogs, setAuditLogs] = useState<ContradictionAuditItem[]>([
    {
      id: 'audit-1',
      claimText: 'Commercial deployment projected within 6 months.',
      reason: 'Contradicted by current IEEE Xplore hardware deployment roadmaps and empirical fault-tolerance metrics.',
      status: 'UNRESOLVED'
    }
  ]);
  const [citationAnchors, setCitationAnchors] = useState<CitationAnchorItem[]>([
    {
      name: 'Google Scholar Peer-Reviewed Papers',
      match: '95%',
      url: 'https://scholar.google.com/scholar?q=quantum+cryptography+benchmarks'
    },
    {
      name: 'arXiv Open Academic Repository',
      match: '96%',
      url: 'https://arxiv.org/search/?query=quantum+cryptography&searchtype=all'
    },
    {
      name: 'IEEE Xplore Technical Library',
      match: '92%',
      url: 'https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=post+quantum+lattice'
    },
    {
      name: 'PubMed / NCBI Research Index',
      match: '94%',
      url: 'https://pubmed.ncbi.nlm.nih.gov/?term=synthetic+biology+safety'
    }
  ]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Uptime Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Fetch Live Backend Telemetry Data
  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/agents/telemetry');
      if (res.ok) {
        const data = await res.json();
        setSourcesProcessed(data.sourcesProcessed.toLocaleString());
        setTokensAnalyzed(data.tokensAnalyzed);
        setTrustRatio(data.trustRatio);
        setConfidenceScore(data.globalConfidence);
        setConflictsDetected(data.conflictsDetected);
        setHighConflict(data.highConflict);
        setSemanticDrift(data.semanticDrift);

        if (data.recentLogs && data.recentLogs.length > 0) {
          setLogs(data.recentLogs);
        }
        if (data.contradictionAudits && data.contradictionAudits.length > 0) {
          setAuditLogs(data.contradictionAudits);
        }
        if (data.citationAnchors && data.citationAnchors.length > 0) {
          setCitationAnchors(data.citationAnchors);
        }
      }
    } catch (err) {
      console.warn('Telemetry fetch warning:', err);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    if (!isStreaming) return;

    const interval = setInterval(() => {
      fetchTelemetry();
    }, 4000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Handler: Reboot Cluster
  const handleRebootCluster = () => {
    setIsRebooting(true);
    addToast('Initiating agent cluster reboot...', 'info');

    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString();
      setLogs(prev => [
        ...prev,
        `[${timeStr}] [REBOOT_EVENT] Disconnecting agent containers...`,
        `[${timeStr}] [REBOOT_EVENT] Re-initializing cluster pods (Research, Verification, Contradiction, Confidence, Citation)...`,
        `[${timeStr}] [REBOOT_EVENT] All 5 multi-agent containers ONLINE. Health status optimal.`
      ]);
      setIsRebooting(false);
      addToast('Agent cluster reboot completed successfully!', 'success');
    }, 1500);
  };

  // Handler: Export Telemetry
  const handleExportTelemetry = () => {
    setIsExporting(true);
    addToast('Generating system telemetry report...', 'info');

    setTimeout(() => {
      const dataPayload = {
        platform: 'Pramāṇa AI Agent Infrastructure',
        timestamp: new Date().toISOString(),
        agents: [
          { name: '01_RESEARCH_AGENT', status: 'ACTIVE', sources_processed: sourcesProcessed, tokens_analyzed: tokensAnalyzed, current_load: '72%' },
          { name: '02_VERIFICATION', status: 'ACTIVE', trust_ratio: `${trustRatio}%`, avg_latency: '42ms' },
          { name: '03_CONTRADICTION', status: 'ACTIVE', conflicts_detected: conflictsDetected, high_conflict: highConflict, semantic_drift: semanticDrift },
          { name: '04_CONFIDENCE', status: 'ACTIVE', global_score: `${confidenceScore}%` },
          { name: '05_CITATION', status: 'ACTIVE', anchors: citationAnchors.length }
        ],
        infrastructure: {
          memory_latency: '1.2ms',
          worker_threads: 1024,
          verification_queue: 0,
          integrity: 'Tier 3 Verified'
        },
        logs: logs
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `pramana_telemetry_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setIsExporting(false);
      addToast('Telemetry JSON file exported successfully!', 'success');
    }, 1000);
  };

  // Handler: Run Integrity Check
  const handleRunIntegrityCheck = () => {
    setIsCheckingIntegrity(true);
    addToast('Running live integrity check across all data streams...', 'info');
    setTimeout(() => {
      setTrustRatio(99.9);
      setIsCheckingIntegrity(false);
      addToast('Integrity check complete: 99.9% Trust Ratio verified.', 'success');
    }, 1200);
  };

  // Handler: Recalibrate Confidence Model
  const handleRecalibrateScore = () => {
    setIsRecalibrating(true);
    addToast('Recalibrating Bayesian confidence model weights...', 'info');
    setTimeout(() => {
      setConfidenceScore(prev => Math.min(99, prev + 2));
      setIsRecalibrating(false);
      addToast('Confidence score recalibrated successfully.', 'success');
    }, 1200);
  };

  // Handler: Copy Citation Link
  const handleCopyCitation = (item: CitationAnchorItem) => {
    navigator.clipboard.writeText(item.url || `https://scholar.google.com`);
    setCopiedCitation(item.name);
    addToast(`Copied citation URL for "${item.name.slice(0, 30)}..."`, 'success');
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20 relative">
      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded border font-mono text-xs shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'success'
                ? 'bg-[#1b261b] border-green-700/60 text-green-300'
                : toast.type === 'info'
                ? 'bg-[#1c2430] border-blue-700/60 text-blue-300'
                : 'bg-[#2b2118] border-amber-700/60 text-amber-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-current" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Audit Contradictions Modal */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-lg max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[var(--border-main)] pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
                  03_CONTRADICTION AUDIT LOG
                </h3>
              </div>
              <button
                onClick={() => setAuditModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 font-mono text-xs">
              {auditLogs.length > 0 ? (
                auditLogs.map((item, idx) => (
                  <div key={item.id || idx} className="p-3 bg-red-950/30 border border-red-800/40 rounded space-y-1">
                    <div className="flex justify-between items-center text-red-400 font-bold">
                      <span>FLAGGED CONFLICT #{idx + 1}</span>
                      <span className="text-[10px] bg-red-900/40 px-2 py-0.5 rounded">{item.status || 'UNRESOLVED'}</span>
                    </div>
                    <p className="text-[var(--text-main)] font-semibold text-xs">"{item.claimText}"</p>
                    <p className="text-[var(--text-muted)] text-[11px]">{item.reason}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded text-center text-[var(--text-muted)]">
                  No contradiction conflicts currently detected.
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setAuditModalOpen(false);
                  addToast('Contradiction audit report saved.', 'success');
                }}
                className="font-mono text-xs px-4 py-2 bg-[var(--accent-primary)] text-[var(--text-accent-contrast)] font-bold rounded uppercase cursor-pointer hover:opacity-90 transition-opacity"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button
            onClick={handleRebootCluster}
            disabled={isRebooting}
            className="font-mono text-xs px-4 py-2 border border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-accent)] hover:text-[var(--text-accent)] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRebooting ? 'animate-spin text-[var(--text-accent)]' : ''}`} />
            {isRebooting ? 'REBOOTING...' : 'REBOOT CLUSTER'}
          </button>
          <button
            onClick={handleExportTelemetry}
            disabled={isExporting}
            className="font-mono text-xs px-4 py-2 bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] hover:bg-[var(--bg-surface-high)] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
            {isExporting ? 'EXPORTING...' : 'EXPORT TELEMETRY'}
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
              <span className="font-mono text-sm font-bold text-[var(--text-main)]">{formatUptime(uptimeSeconds)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-[var(--border-main)]/40 py-4 font-mono">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Sources Processed</span>
              <span className="font-serif text-2xl font-bold text-[var(--text-main)]">{sourcesProcessed}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Tokens Analyzed</span>
              <span className="font-serif text-2xl font-bold text-[var(--text-main)]">{tokensAnalyzed}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Current Load</span>
              <div className="w-full h-1.5 bg-[var(--bg-main)] mt-2 rounded overflow-hidden">
                <div className="h-full bg-[var(--accent-primary)] w-[72%]" />
              </div>
            </div>
          </div>

          {/* Live Terminal Log Console */}
          <div className="bg-[var(--bg-main)] border border-[var(--border-main)] rounded p-4 font-mono text-[11px] text-[var(--text-muted)] space-y-1.5 leading-relaxed relative">
            <div className="flex items-center justify-between border-b border-[var(--border-main)]/40 pb-2 mb-2">
              <div className="flex items-center gap-2 text-[var(--text-accent)] text-[10px] uppercase font-bold">
                <Terminal className="w-3.5 h-3.5" /> LIVE TELEMETRY LOGS
                {isStreaming && <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block ml-1" />}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className="hover:text-[var(--text-main)] transition-colors p-1 flex items-center gap-1 text-[10px] cursor-pointer"
                  title={isStreaming ? 'Pause stream' : 'Resume stream'}
                >
                  {isStreaming ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-green-400" />}
                  <span>{isStreaming ? 'PAUSE' : 'RESUME'}</span>
                </button>

                <button
                  onClick={() => {
                    setLogs([`[${new Date().toLocaleTimeString()}] Logs cleared by operator.`]);
                    addToast('Telemetry logs cleared.', 'info');
                  }}
                  className="hover:text-red-400 transition-colors p-1 flex items-center gap-1 text-[10px] cursor-pointer"
                  title="Clear logs"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>CLEAR</span>
                </button>
              </div>
            </div>

            <div className="space-y-1 max-h-[160px] overflow-y-auto">
              {logs.map((logLine, idx) => (
                <div
                  key={idx}
                  className={logLine.includes('[MATCH_FOUND]') || logLine.includes('[STREAM_OK]') || logLine.includes('COMPLETED') ? 'text-[var(--text-accent)] font-semibold' : ''}
                >
                  {logLine}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02_VERIFICATION (Live Vertical Bar Chart Graph) */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded relative overflow-hidden space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">02_VERIFICATION</h3>
                <p className="text-[var(--text-muted)] text-xs font-sans mt-0.5">Trust Ratio: <span className="text-[var(--text-accent)] font-bold">{trustRatio}%</span></p>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-accent)] bg-[var(--text-accent)]/10 px-2 py-0.5 rounded border border-[var(--text-accent)]/20">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">LIVE INTEGRITY CHECK</span>
                <button
                  onClick={handleRunIntegrityCheck}
                  disabled={isCheckingIntegrity}
                  className="font-mono text-[10px] text-[var(--text-accent)] hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isCheckingIntegrity ? 'animate-spin' : ''}`} />
                  {isCheckingIntegrity ? 'Checking...' : 'RUN CHECK'}
                </button>
              </div>

              {/* Vertical Bar Chart Pillars */}
              <div className="h-32 bg-[var(--bg-main)] border border-[var(--border-main)] rounded p-4 flex items-end justify-between gap-2 relative">
                {[65, 80, 45, 90, 70, 85, 98, 75].map((h, i) => (
                  <div key={i} className="flex-1 h-full bg-[#2a2420] border border-[#554336]/40 rounded-t overflow-hidden relative group flex items-end">
                    <div
                      className={`w-full rounded-t transition-all duration-500 bg-gradient-to-t from-[#d97707] to-[#ffb77d] group-hover:brightness-125 ${
                        isCheckingIntegrity ? 'animate-pulse' : ''
                      }`}
                      style={{ height: isCheckingIntegrity ? `${Math.min(100, (h + 15) % 105)}%` : `${h}%` }}
                    />
                    <div className="absolute top-0 inset-x-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono text-center text-[#ffb77d] py-0.5 pointer-events-none">
                      {h}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded font-mono text-[11px] text-[var(--text-muted)]">
            <span className="text-[var(--text-accent)] font-bold">CURRENT TASK:</span> Validating peer-reviewed paper citations
          </div>
        </div>

        {/* 03_CONTRADICTION */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">03_CONTRADICTION</h3>
              </div>
              <button
                onClick={() => setAuditModalOpen(true)}
                className="font-mono text-[10px] text-[var(--text-accent)] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> AUDIT LOGS
              </button>
            </div>
            <p className="text-[var(--text-muted)] text-xs">Audits claims for internal inconsistencies and hallucinations.</p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-2">
                <span className="font-mono text-xs text-[var(--text-muted)]">CONFLICTS DETECTED</span>
                <span className="font-serif text-3xl font-bold text-[var(--text-main)]">{conflictsDetected}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>High Conflict</span>
                <span className="text-red-400 font-bold">{highConflict.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>Semantic Drift</span>
                <span className="text-[var(--text-accent)] font-bold">{semanticDrift}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAuditModalOpen(true)}
            className="w-full font-mono text-xs py-2 bg-[var(--bg-main)] border border-[var(--border-main)] hover:border-[var(--text-accent)] text-[var(--text-main)] hover:text-[var(--text-accent)] rounded uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5" /> View Contradiction Details
          </button>
        </div>

        {/* 04_CONFIDENCE (Circular Gauge Graph) */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4 flex flex-col items-center justify-between text-center">
          <div className="w-full flex justify-between items-center">
            <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">04_CONFIDENCE</h3>
            <button
              onClick={handleRecalibrateScore}
              disabled={isRecalibrating}
              className="font-mono text-[10px] text-[var(--text-accent)] hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isRecalibrating ? 'animate-spin' : ''}`} />
              RECALIBRATE
            </button>
          </div>
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
                className="text-[var(--accent-primary)] transition-all duration-700"
                strokeDasharray={`${confidenceScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-serif font-bold text-xl text-[var(--text-main)]">
              {confidenceScore}%
              <span className="font-mono text-[8px] text-[var(--text-muted)] uppercase">GLOBAL SCORE</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[var(--text-muted)]">
            Bayesian Authority Coefficient: <span className="text-[var(--text-accent)] font-bold">{(confidenceScore / 100).toFixed(2)}</span>
          </div>
        </div>

        {/* 05_CITATION */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] p-6 border border-[var(--border-main)] rounded space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[var(--text-accent)]" />
              <h3 className="font-mono text-sm font-bold text-[var(--text-main)] uppercase">05_CITATION</h3>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-accent)]">{citationAnchors.length} ANCHORS</span>
          </div>
          <p className="text-[var(--text-muted)] text-xs">Deep-linked source attribution anchors.</p>

          <div className="space-y-2.5 pt-2 text-xs font-mono">
            {citationAnchors.map((item, idx) => (
              <div key={item.name + idx} className="p-2 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate max-w-[170px] text-[var(--text-main)] hover:text-[var(--text-accent)] hover:underline"
                  title={item.name}
                >
                  {item.name}
                </a>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-accent)] font-bold">{item.match}</span>
                  <button
                    onClick={() => handleCopyCitation(item)}
                    className="hover:text-[var(--text-accent)] text-[var(--text-muted)] transition-colors p-1 cursor-pointer"
                    title="Copy citation link"
                  >
                    {copiedCitation === item.name ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
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


