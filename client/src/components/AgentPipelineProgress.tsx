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
    { name: 'Research', label: '1. Research Agent', desc: 'Collects background & primary academic sources', icon: Search },
    { name: 'ClaimExtraction', label: '2. Claim Extraction', desc: 'Deconstructs research into atomic statements', icon: FileText },
    { name: 'Verification', label: '3. Fact Verification', desc: 'Cross-checks statements against primary sources', icon: CheckCircle2 },
    { name: 'Contradiction', label: '4. Contradiction Detection', desc: 'Identifies conflicting info & hallucinations', icon: AlertTriangle },
    { name: 'Confidence', label: '5. Confidence Engine', desc: 'Calculates transparent 0-100% confidence rationale', icon: ShieldCheck },
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
      {/* Header status */}
      <div className="p-6 rounded bg-[#221f1c] border border-[#554336] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded bg-[#151310] border border-[#554336] flex items-center justify-center shrink-0">
            {status === 'running' ? (
              <Loader2 className="w-5 h-5 text-[#ffb77d] animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#ffb77d]" />
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#e8e1dd] flex items-center gap-2">
              Multi-Agent Verification Pipeline
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                status === 'completed' ? 'bg-green-950/60 text-green-400 border-green-800/50' : 'bg-[#ffb77d]/10 text-[#ffb77d] border-[#ffb77d]/30'
              }`}>
                {status}
              </span>
            </h3>
            <p className="text-xs font-mono text-[#dbc2b0]/70 mt-0.5">
              Active Stage: <span className="text-[#ffb77d] font-bold">{currentStage}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentStages.map((stage) => {
          const state = getStageState(stage.name);
          const stageLog = logs.find(l => l.agent_name === stage.name);

          return (
            <div
              key={stage.name}
              className={`p-4 rounded border transition-all relative overflow-hidden ${
                state === 'completed'
                  ? 'bg-[#1e1b19] border-[#554336]'
                  : state === 'running'
                  ? 'bg-[#221f1c] border-[#ffb77d] shadow-lg shadow-[#ffb77d]/5'
                  : 'bg-[#151310]/50 border-[#554336]/40 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${
                    state === 'completed'
                      ? 'bg-[#383431] text-[#ffb77d] border border-[#554336]'
                      : state === 'running'
                      ? 'bg-[#ffb77d] text-[#4d2600] animate-pulse'
                      : 'bg-[#151310] text-[#a38c7c] border border-[#554336]'
                  }`}>
                    <stage.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs text-[#e8e1dd]">{stage.label}</h4>
                    <span className="text-[10px] font-mono text-[#dbc2b0]/60 block">{stage.desc}</span>
                  </div>
                </div>

                {state === 'completed' && (
                  <span className="text-[10px] font-mono text-[#ffb77d] bg-[#ffb77d]/10 px-1.5 py-0.5 rounded border border-[#ffb77d]/20 uppercase">✓ Done</span>
                )}
                {state === 'running' && (
                  <span className="text-[10px] font-mono text-[#ffb77d] bg-[#ffb77d]/20 px-1.5 py-0.5 rounded border border-[#ffb77d]/40 animate-pulse uppercase">Active</span>
                )}
              </div>

              {stageLog && (
                <div className="mt-3 pt-2 border-t border-[#554336]/40 text-[11px] text-[#dbc2b0] font-mono leading-tight bg-[#151310] p-2 rounded">
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
