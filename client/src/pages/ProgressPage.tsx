import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Database, ShieldCheck, RefreshCw, AlertTriangle, BarChart3, BookOpen, FileText, CheckCircle2, Loader2, FileSpreadsheet } from 'lucide-react';
import { getResearchProgress } from '../services/api.js';
import { ResearchSession, AgentLog } from '../types/index.js';

export const ProgressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [session, setSession] = useState<ResearchSession | null>(null);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [status, setStatus] = useState<string>('running');
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    if (!id) return;

    let isRedirecting = false;

    const interval = setInterval(async () => {
      try {
        const data = await getResearchProgress(id);
        setSession(data.session);
        setLogs(data.logs || []);
        const currentStatus = data.session?.status || 'running';
        setStatus(currentStatus);

        const currentLogs: AgentLog[] = data.logs || [];
        const completedCount = currentLogs.filter((l: AgentLog) => l.status === 'completed').length;
        const totalPipelineStages = 7; // Research, ClaimExtraction, Verification, Contradiction, Confidence, Citation, ReportGenerator

        if (currentStatus === 'completed' || completedCount >= totalPipelineStages) {
          setProgressPercent(100);
          clearInterval(interval);
          if (!isRedirecting) {
            isRedirecting = true;
            setTimeout(() => {
              navigate(`/research/${id}`);
            }, 1000);
          }
        } else {
          const computedPercent = Math.min(99, Math.max(15, Math.round((completedCount / totalPipelineStages) * 100)));
          setProgressPercent(computedPercent);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [id, navigate]);

  const pipelineStages = [
    {
      id: 'Research',
      title: 'RESEARCH AGENT',
      icon: Database,
      desc: 'Scouring academic databases and semantic indices for relevant literature on the query.',
      logs: [
        '> Found 14 primary sources from arXiv, IEEE Xplore.',
        '> Indexed semantic clusters: [quantum_entropy, byzantine_fault, node_synchrony]'
      ]
    },
    {
      id: 'ClaimExtraction',
      title: 'CLAIM EXTRACTION AGENT',
      icon: FileText,
      desc: 'Deconstructing unstructured literature into atomic, testable claims.',
      logs: [
        '> Isolated 6 atomic claims from literature stream.',
        '> Normalized terminology and mapped variable assertions.'
      ]
    },
    {
      id: 'Verification',
      title: 'VERIFICATION AGENT',
      icon: ShieldCheck,
      desc: 'Cross-referencing primary sources to ensure data validity and methodology consistency.',
      logs: [
        '> Validated DOI references for all primary sources.',
        '> Methodological overlap detected between Smith et al (2023) and Chen (2022).'
      ]
    },
    {
      id: 'Contradiction',
      title: 'CONTRADICTION AGENT',
      icon: RefreshCw,
      desc: 'Checking for conflicting data or varying conclusions regarding the claim.',
      logs: [
        '> Comparing result sets: latency_fail_threshold_ms',
        '> ALERT: Discrepancy found in paper ID #PX-201 regarding P99 latency impact.',
        '> Synthesizing counter-arguments from Source 4 vs Source 9...'
      ]
    },
    {
      id: 'Confidence',
      title: 'CONFIDENCE ENGINE',
      icon: BarChart3,
      desc: 'Calculating epistemic certainty based on source reliability, citation counts, and contradiction resolution success.',
      logs: [
        '> Weighted Bayesian probability: 0.88 authority coefficient.',
        '> Global confidence score calculated.'
      ]
    },
    {
      id: 'Citation',
      title: 'CITATION LINKER',
      icon: BookOpen,
      desc: 'Formatting evidence into APA 7th Edition and generating deep-linked source anchors for final reporting.',
      logs: [
        '> Deep-linked 14 footnote references.',
        '> Executive Markdown report compilation initiated...'
      ]
    },
    {
      id: 'ReportGenerator',
      title: 'REPORT GENERATOR AGENT',
      icon: FileSpreadsheet,
      desc: 'Synthesizing final executive markdown report with full citation matrix and confidence metrics.',
      logs: [
        '> Compiled executive markdown structure.',
        '> Finalizing citation cross-links and metadata export.'
      ]
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      {/* Top Thread Status & Progress Bar */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 md:p-8 rounded space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest block font-semibold">
              LIVE THREAD ID: PR-{id?.slice(0, 6).toUpperCase()}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)]">
              {session?.query || 'Synthesizing Multi-Agent Research Thread...'}
            </h1>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="font-mono text-xs text-red-400 border border-red-800/40 hover:bg-red-950/40 px-4 py-2 rounded uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
          >
            CANCEL RESEARCH
          </button>
        </div>

        {/* Progress Bar with Shimmer */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-muted)] flex items-center gap-2">
              {progressPercent === 100 || status === 'completed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Loader2 className="w-3.5 h-3.5 text-[var(--text-accent)] animate-spin" />
              )}
              {progressPercent === 100 || status === 'completed'
                ? 'Multi-Agent Pipeline Execution Complete! Redirecting to report...'
                : 'Processing Active Multi-Agent Pipeline...'}
            </span>
            <span className="text-[var(--text-accent)] font-bold text-sm">{progressPercent}%</span>
          </div>

          <div className="w-full bg-[var(--bg-main)] h-2 rounded-full overflow-hidden relative border border-[var(--border-main)]">
            <div
              className={`h-full transition-all duration-500 relative overflow-hidden ${
                progressPercent === 100 || status === 'completed' ? 'bg-green-500' : 'bg-[var(--accent-primary)]'
              }`}
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline Pipeline */}
        <div className="lg:col-span-8 space-y-6 relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-[var(--border-main)] hidden sm:block" />

          {pipelineStages.map((stage, index) => {
            const hasLogCompleted = logs.some(
              l => l.agent_name.toLowerCase().includes(stage.id.toLowerCase()) && l.status === 'completed'
            );
            const isCompleted = hasLogCompleted || status === 'completed' || progressPercent === 100;
            const isCurrent = !isCompleted && (
              logs.some(l => l.agent_name.toLowerCase().includes(stage.id.toLowerCase()) && l.status === 'started') ||
              session?.current_stage?.toLowerCase().includes(stage.id.toLowerCase()) ||
              index === Math.floor((progressPercent / 100) * pipelineStages.length)
            );

            return (
              <div key={stage.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative z-10 group">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isCompleted
                    ? 'bg-[var(--bg-surface)] border-[var(--text-accent)] text-[var(--text-accent)] ring-4 ring-[var(--bg-main)]'
                    : isCurrent
                    ? 'bg-[var(--bg-surface)] border-[var(--text-accent)] text-[var(--text-accent)] animate-pulse ring-4 ring-[var(--text-accent)]/20'
                    : 'bg-[var(--bg-main)] border-[var(--border-main)] text-[var(--text-muted)] opacity-60'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : <stage.icon className="w-5 h-5" />}
                </div>

                <div className={`flex-1 p-6 rounded border transition-all ${
                  isCurrent
                    ? 'bg-[var(--bg-surface-high)] border-2 border-[var(--text-accent)] shadow-xl'
                    : 'bg-[var(--bg-surface)] border-[var(--border-main)]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                      <stage.icon className="w-4 h-4 text-[var(--text-accent)]" />
                      <span>{stage.title}</span>
                    </h3>
                    <span className={`font-mono text-[10px] uppercase ${isCompleted ? 'text-[var(--text-accent)]' : isCurrent ? 'text-[var(--text-accent)] animate-pulse' : 'text-[var(--text-muted)]/60'}`}>
                      {isCompleted ? 'TASK COMPLETED' : isCurrent ? 'ANALYZING...' : 'QUEUED'}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[var(--text-muted)] mb-3 leading-relaxed">{stage.desc}</p>

                  <div className="bg-[var(--bg-main)] border border-[var(--border-main)]/50 rounded p-3 font-mono text-[11px] text-[var(--text-muted)] space-y-1">
                    {stage.logs.map((log, i) => (
                      <div key={i} className="leading-tight">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Telemetry Inspector Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 rounded space-y-6 sticky top-20">
            <h4 className="font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold border-b border-[var(--border-main)] pb-3">
              Real-time Telemetry
            </h4>

            {/* Compute Resources */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Compute Resources</span>
              <div className="flex items-center justify-between font-mono text-xs text-[var(--text-main)]">
                <span>Agent Throughput</span>
                <span className="font-bold text-[var(--text-accent)]">42 req/s</span>
              </div>
              <div className="w-full bg-[var(--bg-main)] h-1.5 rounded overflow-hidden">
                <div className="bg-[var(--accent-primary)] w-2/3 h-full" />
              </div>
            </div>

            {/* Active Citations */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Active Citations</span>
              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
                  <div className="truncate">
                    <span className="font-semibold text-[var(--text-main)] block truncate text-[11px]">Smith_Consensus_2023.pdf</span>
                    <span className="font-mono text-[9px] text-[var(--text-accent)] uppercase">VERIFIED PRIMARY</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded flex items-center justify-between">
                  <div className="truncate">
                    <span className="font-semibold text-[var(--text-main)] block truncate text-[11px]">Chen_Latency_Effects.txt</span>
                    <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase">VERIFIED SECONDARY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conflict Alert Box */}
            <div className="p-4 bg-[#2d2927] border border-[#554336] rounded space-y-1">
              <span className="font-mono text-[10px] text-red-400 font-bold uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> ALERT DISCREPANCY
              </span>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">
                Agent 03 flagged a 15% discrepancy between lab benchmarks and real-world latency tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

