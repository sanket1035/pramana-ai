import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sliders, Cpu, Globe, Scale, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { createResearchSession } from '../services/api.js';

export const NewResearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [depth, setDepth] = useState<'SURFACE' | 'DEEP'>('SURFACE');
  const [outputFormat, setOutputFormat] = useState<'EXECUTIVE SUMMARY' | 'FULL DOSSIER' | 'DATA VISUALIZATION'>('EXECUTIVE SUMMARY');
  const [domain, setDomain] = useState<'ACADEMIC' | 'JOURNALISM'>('ACADEMIC');
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const navigate = useNavigate();

  const promptTemplates = [
    {
      icon: Cpu,
      title: 'Quantum Computing Impact',
      query: 'What are the verified impacts of quantum computing on modern RSA cryptography and PQC standards?'
    },
    {
      icon: Globe,
      title: 'Global AI Governance',
      query: 'How does the EU AI Act enforce strict risk-based compliance on foundational multimodal models?'
    },
    {
      icon: Scale,
      title: 'Climate Science Metrics',
      query: 'What is the empirical consensus regarding carbon capture efficiency in industrial power generation?'
    },
    {
      icon: BookOpen,
      title: 'CRISPR Gene Editing',
      query: 'What are the peer-reviewed clinical trial outcomes of Casgevy cell therapy for sickle cell disease?'
    }
  ];

  const handleGenerateAiPrompt = () => {
    setAiGenerating(true);
    const aiQueries = [
      "Analyze the peer-reviewed consensus on room-temperature superconductor claims in LK-99 replications.",
      "Fact-check the empirical efficiency benchmarks of solid-state sodium-ion battery EV architectures.",
      "What are the verified regulatory compliance requirements for autonomous surgical robotics under FDA guidelines?",
      "Deconstruct the post-quantum lattice-based encryption security proofs approved by NIST 2024 standards."
    ];
    const randomIndex = Math.floor(Math.random() * aiQueries.length);
    setTimeout(() => {
      setQuery(aiQueries[randomIndex]);
      setAiGenerating(false);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const { sessionId } = await createResearchSession(query.trim());
      navigate(`/research/${sessionId}/progress`);
    } catch (err) {
      console.error('Failed to start research:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[720px] mx-auto p-4 md:p-8 space-y-10 pb-20">
      {/* Header Section */}
      <section className="text-center space-y-3">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--text-main)]">
          Initiate Analysis
        </h1>
        <p className="font-serif text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Define your research claim or complex query. Our multi-agent system will cross-reference academic, journalistic, and real-time data sources.
        </p>
      </section>

      {/* Primary Input Canvas */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="State your research objective or hypothesis..."
            rows={4}
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] focus:border-[var(--text-accent)] font-serif text-xl text-[var(--text-main)] p-6 rounded placeholder-[var(--text-muted)]/40 outline-none resize-none transition-all"
            autoFocus
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateAiPrompt}
              className="font-mono text-[10px] text-[var(--text-accent)] hover:underline flex items-center gap-1 bg-[var(--text-accent)]/10 px-2 py-1 rounded border border-[var(--text-accent)]/20 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[var(--text-accent)]" />
              <span>{aiGenerating ? 'Generating Prompt...' : 'Generate AI Prompt'}</span>
            </button>
            <span className="font-mono text-[10px] text-[var(--text-muted)]/40">⌘ + ENTER</span>
          </div>
        </div>

        {/* Research Parameters Box (Stitch Design) */}
        <div className="bg-[var(--bg-sidebar)] border border-[var(--border-main)] rounded p-6 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-semibold">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--text-accent)]" />
              <span>RESEARCH PARAMETERS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-[var(--border-main)]/40">
            {/* Context Depth */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block">Context Depth</label>
              <div className="flex gap-1 p-1 bg-[var(--bg-surface-high)] rounded">
                <button
                  type="button"
                  onClick={() => setDepth('SURFACE')}
                  className={`flex-1 py-1.5 px-2 font-mono text-[11px] font-bold rounded transition-colors cursor-pointer ${
                    depth === 'SURFACE' ? 'bg-[var(--accent-primary)] text-[var(--text-accent-contrast)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  SURFACE
                </button>
                <button
                  type="button"
                  onClick={() => setDepth('DEEP')}
                  className={`flex-1 py-1.5 px-2 font-mono text-[11px] font-bold rounded transition-colors cursor-pointer ${
                    depth === 'DEEP' ? 'bg-[var(--accent-primary)] text-[var(--text-accent-contrast)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  DEEP
                </button>
              </div>
            </div>

            {/* Output Format */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block">Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as any)}
                className="w-full bg-[var(--bg-surface-high)] border border-[var(--border-main)] text-[var(--text-main)] font-mono text-[11px] py-2 px-2 rounded outline-none cursor-pointer"
              >
                <option value="EXECUTIVE SUMMARY">EXECUTIVE SUMMARY</option>
                <option value="FULL DOSSIER">FULL DOSSIER</option>
                <option value="DATA VISUALIZATION">DATA VISUALIZATION</option>
              </select>
            </div>

            {/* Domain Focus */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block">Domain Focus</label>
              <div className="flex gap-2">
                <span
                  onClick={() => setDomain('ACADEMIC')}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded cursor-pointer border transition-colors ${
                    domain === 'ACADEMIC' ? 'bg-[var(--text-accent)]/20 text-[var(--text-accent)] border-[var(--text-accent)]/40 font-bold' : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--border-main)]'
                  }`}
                >
                  ACADEMIC
                </span>
                <span
                  onClick={() => setDomain('JOURNALISM')}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded cursor-pointer border transition-colors ${
                    domain === 'JOURNALISM' ? 'bg-[var(--text-accent)]/20 text-[var(--text-accent)] border-[var(--text-accent)]/40 font-bold' : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--border-main)]'
                  }`}
                >
                  JOURNALISM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="w-full bg-[var(--accent-primary)] hover:brightness-110 disabled:opacity-50 text-[var(--text-accent-contrast)] font-mono font-bold text-xs py-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider shadow-lg"
        >
          <span>{loading ? 'Initiating Pipeline...' : 'START MULTI-AGENT VERIFICATION'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Suggested Templates */}
      <div className="space-y-3 pt-4">
        <h2 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold flex items-center justify-between">
          <span>SUGGESTED RESEARCH OBJECTIVES</span>
          <button onClick={handleGenerateAiPrompt} className="text-[var(--text-accent)] hover:underline flex items-center gap-1 cursor-pointer">
            <RefreshCw className="w-3 h-3" /> Refresh AI Suggestions
          </button>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {promptTemplates.map((t, i) => (
            <button
              key={i}
              onClick={() => setQuery(t.query)}
              className="p-4 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--text-accent)] text-left transition-all group cursor-pointer space-y-1"
            >
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-accent)]">
                <t.icon className="w-4 h-4 text-[var(--text-accent)]" />
                <span>{t.title}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 font-sans">
                "{t.query}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
