import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, BookOpen, Cpu, Globe, Scale } from 'lucide-react';
import { createResearchSession } from '../services/api.js';

export const NewResearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
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
    <div className="max-w-3xl mx-auto space-y-8 pt-4 pb-20">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/50 text-xs font-mono text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Perplexity × NotebookLM Synthesis Engine</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
          Initiate Verified Multi-Agent Research
        </h1>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Enter any research question or statement. 6 specialized AI agents will extract, verify, score confidence, and cite primary sources.
        </p>
      </div>

      {/* Main Input Box */}
      <form onSubmit={handleSubmit} className="p-4 rounded-2xl glass-panel glow-border space-y-4 shadow-2xl">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a complex research question (e.g., 'What are the verified impacts of quantum computing on RSA encryption?')..."
            rows={4}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-between border-t border-[#27272A] pt-3 text-xs">
          <div className="flex items-center space-x-2 text-zinc-400 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Gemini 2.5 Flash Pipeline</span>
          </div>

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <span>{loading ? 'Initiating Agents...' : 'Run Pipeline'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Topic Templates */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          Suggested Research Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {promptTemplates.map((t, i) => (
            <button
              key={i}
              onClick={() => setQuery(t.query)}
              className="p-3.5 rounded-xl bg-[#111113] border border-[#27272A] hover:border-purple-500/40 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-purple-300 mb-1">
                <t.icon className="w-4 h-4 text-purple-400" />
                <span>{t.title}</span>
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-2 font-sans group-hover:text-zinc-200">
                "{t.query}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
