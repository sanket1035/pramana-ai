import React from 'react';
import { Bot, Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, FileSpreadsheet, RefreshCw, Download } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const agents = [
    {
      id: '01_Research_Agent',
      name: 'Research Agent',
      icon: Search,
      desc: 'Primary heuristic parsing of multi-modal dataset streams.',
      sources: '1,242',
      tokens: '8.4M',
      load: '72%'
    },
    {
      id: '02_Claim_Extraction',
      name: 'Claim Extraction',
      icon: FileText,
      desc: 'Deconstructs research text into verifiable atomic statements.',
      sources: '840',
      tokens: '5.1M',
      load: '48%'
    },
    {
      id: '03_Fact_Verification',
      name: 'Fact Verification',
      icon: CheckCircle2,
      desc: 'Cross-checks statements against primary academic sources.',
      sources: '2,841',
      tokens: '12.8M',
      load: '91%'
    },
    {
      id: '04_Contradiction_Detection',
      name: 'Contradiction Detection',
      icon: AlertTriangle,
      desc: 'Audits claims for internal inconsistencies and hallucinations.',
      sources: '412',
      tokens: '3.2M',
      load: '35%'
    },
    {
      id: '05_Confidence_Engine',
      name: 'Confidence Engine',
      icon: ShieldCheck,
      desc: 'Calculates transparent 0-100% confidence rationale.',
      sources: '2,841',
      tokens: '6.4M',
      load: '82%'
    },
    {
      id: '06_Report_Generator',
      name: 'Report Generator',
      icon: FileSpreadsheet,
      desc: 'Synthesizes cited Markdown executive reports.',
      sources: '142',
      tokens: '1.9M',
      load: '20%'
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      {/* Header Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 mb-1 font-mono text-[10px] text-[#dbc2b0] tracking-widest uppercase">
            <span>Workspace</span>
            <span>›</span>
            <span className="text-[#ffb77d]">Agent Infrastructure</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-[#e8e1dd]">System Monitoring</h1>
        </div>

        <div className="flex gap-3">
          <button className="font-mono text-xs px-4 py-2 border border-[#554336] text-[#dbc2b0] hover:border-[#ffb77d] hover:text-[#ffb77d] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> REBOOT CLUSTER
          </button>
          <button className="font-mono text-xs px-4 py-2 bg-[#221f1c] text-[#e8e1dd] border border-[#554336] hover:bg-[#383431] transition-all rounded uppercase cursor-pointer flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> EXPORT TELEMETRY
          </button>
        </div>
      </div>

      {/* Agent Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#221f1c] p-6 border border-[#554336] rounded relative overflow-hidden space-y-6 group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb77d]" />

            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <agent.icon className="w-5 h-5 text-[#ffb77d]" />
                  <h3 className="font-mono text-sm font-bold text-[#e8e1dd] uppercase">{agent.id}</h3>
                </div>
                <p className="text-[#dbc2b0]/70 text-xs font-sans">{agent.desc}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-[#dbc2b0] block mb-1">STATUS</span>
                <span className="font-mono text-xs text-[#ffb77d] font-bold bg-[#ffb77d]/10 px-2 py-0.5 rounded border border-[#ffb77d]/20">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#554336]/40 pt-4">
              <div>
                <span className="font-mono text-[10px] text-[#dbc2b0]/60 block uppercase">Processed</span>
                <span className="font-serif text-xl font-bold text-[#e8e1dd]">{agent.sources}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#dbc2b0]/60 block uppercase">Tokens</span>
                <span className="font-serif text-xl font-bold text-[#e8e1dd]">{agent.tokens}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#dbc2b0]/60 block uppercase">Load</span>
                <span className="font-serif text-xl font-bold text-[#ffb77d]">{agent.load}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
