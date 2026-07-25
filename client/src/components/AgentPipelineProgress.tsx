import React from 'react';
import { Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, BookmarkCheck, FileSpreadsheet, Loader2, Sparkles } from 'lucide-react';
import { AgentLog } from '../types/index.js';

interface AgentPipelineProgressProps {
  currentStage: string;
  logs: AgentLog[];
  status: string;
}

export const AgentPipelineProgress: React.FC<AgentPipelineProgressProps> = ({ currentStage, logs, status }) => {
  const agentStages = [
    { name: 'Research', label: '1. Research Agent', desc: 'Collects topic background & candidate sources', icon: Search },
    { name: 'ClaimExtraction', label: '2. Claim Extraction', desc: 'Deconstructs research into atomic statements', icon: FileText },
    { name: 'Verification', label: '3. Fact Verification', desc: 'Cross-checks statements against primary sources', icon: CheckCircle2 },
    { name: 'Contradiction', label: '4. Contradiction Detection', desc: 'Identifies conflicting info & hallucinations', icon: AlertTriangle },
    { name: 'Confidence', label: '5. Confidence Engine', desc: 'Calculates transparent 0-100% confidence scores', icon: ShieldCheck },
    { name: 'Citation', label: '6. Citation Linker', desc: 'Links verifiable sources to each statement', icon: BookmarkCheck },
    { name: 'ReportGenerator', label: '7. Executive Report', desc: 'Synthesizes cited Markdown report', icon: FileSpreadsheet }
  ];

  const getStageState = (stageName: string) => {
    const isCompleted = logs.some(l => l.agent_name === stageName && l.status === 'completed') || status === 'completed';
    const isCurrent = currentStage === stageName && status === 'running';
    if (isCompleted) return 'completed';
    if (isCurrent) return 'running';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      {/* Header status gauge */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/30 via-[#111113] to-blue-950/30 border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-700/50 flex items-center justify-center shrink-0">
            {status === 'running' ? (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-purple-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              Multi-Agent Verification Pipeline
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                status === 'completed' ? 'bg-green-950/60 text-green-400 border-green-800/50' : 'bg-purple-950/60 text-purple-300 border-purple-800/50'
              }`}>
                {status}
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Active Stage: <span className="text-purple-300 font-mono">{currentStage}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Agent Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {agentStages.map((stage) => {
          const state = getStageState(stage.name);
          const stageLog = logs.find(l => l.agent_name === stage.name);

          return (
            <div
              key={stage.name}
              className={`p-4 rounded-xl border transition-all relative overflow-hidden ${
                state === 'completed'
                  ? 'bg-[#111113] border-purple-900/50 shadow-sm'
                  : state === 'running'
                  ? 'bg-purple-950/20 border-purple-500/60 shadow-lg shadow-purple-950/40 glow-border'
                  : 'bg-[#111113]/40 border-[#27272A] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    state === 'completed'
                      ? 'bg-purple-950 text-purple-400 border border-purple-800/60'
                      : state === 'running'
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-[#1C1C1F] text-zinc-500 border border-[#27272A]'
                  }`}>
                    <stage.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{stage.label}</h4>
                    <span className="text-[10px] font-mono text-zinc-400 block">{stage.desc}</span>
                  </div>
                </div>

                {state === 'completed' && (
                  <span className="text-[10px] font-mono text-green-400 bg-green-950/40 px-1.5 py-0.5 rounded border border-green-800/40">✓ Done</span>
                )}
                {state === 'running' && (
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/60 animate-pulse">Running</span>
                )}
              </div>

              {stageLog && (
                <div className="mt-3 pt-2.5 border-t border-[#27272A] text-[11px] text-zinc-300 font-mono leading-tight bg-[#09090B]/50 p-2 rounded">
                  {stageLog.output_summary}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
