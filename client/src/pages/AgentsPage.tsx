import React from 'react';
import { Bot, Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, BookmarkCheck, FileSpreadsheet, Sparkles } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const agents = [
    {
      name: 'Research Agent',
      icon: Search,
      role: 'Initial Domain Context & Source Discovery',
      prompt: 'Understands complex queries, identifies high-authority primary domains (arXiv, IEEE, NIST), and synthesizes initial background findings.',
      output: 'Context summary & 3-5 verified source URLs.'
    },
    {
      name: 'Claim Extraction Agent',
      icon: FileText,
      role: 'Atomic Statement Deconstruction',
      prompt: 'Breaks raw research text into distinct, atomic, verifiable statements while separating facts from opinions.',
      output: 'Ordered array of verifiable claims.'
    },
    {
      name: 'Fact Verification Agent',
      icon: CheckCircle2,
      role: 'Evidence Cross-Checking',
      prompt: 'Evaluates each extracted claim against collected sources, identifying matching evidence snippets and marking initial status.',
      output: 'Verified / Unverified status + source snippet.'
    },
    {
      name: 'Contradiction Detection Agent',
      icon: AlertTriangle,
      role: 'Hallucination & Inconsistency Audit',
      prompt: 'Audits claims for internal contradictions, exaggerated timelines, unbacked assertions, or conflicting data.',
      output: 'Contradicted flags + contradiction rationale.'
    },
    {
      name: 'Confidence Scoring Engine',
      icon: ShieldCheck,
      role: '0–100% Mathematical Rationale',
      prompt: 'Calculates transparent confidence scores based on source authority, evidence overlap, and logical consistency.',
      output: 'Per-claim scores (0-100%) + overall session score.'
    },
    {
      name: 'Report Generation Agent',
      icon: FileSpreadsheet,
      role: 'Executive Markdown Synthesis',
      prompt: 'Compiles verified claims, evidence matrix, citations, and confidence badges into a clean GitHub Markdown report.',
      output: 'Executive summary & formatted markdown body.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/50 text-xs font-mono text-purple-300">
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>Multi-Agent Architecture</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
          Meet the 6 Specialized AI Agents
        </h1>
        <p className="text-xs text-zinc-400">
          Each agent has an independent responsibility in the verification pipeline before producing the final report.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <div key={i} className="p-6 rounded-2xl glass-card space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
                <agent.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                <span className="text-[11px] font-mono text-purple-300">{agent.role}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-[#09090B] p-3 rounded-lg border border-[#27272A] text-zinc-300 font-sans leading-relaxed">
                <span className="font-mono text-purple-400 font-semibold text-[10px] block mb-1">BEHAVIOR:</span>
                {agent.prompt}
              </div>
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" /> Output: {agent.output}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
