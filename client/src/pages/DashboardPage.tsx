import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, FileSpreadsheet, PlusCircle, Network, Clock } from 'lucide-react';
import { createResearchSession, getResearchHistory } from '../services/api.js';
import { HistoryItem } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

export const DashboardPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentResearch, setRecentResearch] = useState<HistoryItem[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getResearchHistory(user?.uid || user?.email)
      .then(setRecentResearch)
      .catch(console.error);
  }, [user]);

  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const { sessionId } = await createResearchSession(query.trim(), {
        userId: user?.uid || user?.email
      });
      navigate(`/research/${sessionId}/progress`);
    } catch (err) {
      console.error('Failed to initiate research:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="space-y-1.5">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[var(--text-main)] leading-tight">
          Welcome back, Researcher.
        </h1>
        <p className="font-serif text-sm md:text-base text-[var(--text-muted)]">
          Our multi-agent research pipeline verified claims & citations across academic literature.
        </p>
      </div>

      {/* Immediate Initiation Prompt Card */}
      <div className="p-6 md:p-8 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-6 shadow-xl">
        <div className="flex items-center space-x-2 font-mono text-xs text-[var(--text-accent)] uppercase tracking-widest font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span>IMMEDIATE INITIATION</span>
        </div>

        <form onSubmit={handleStartResearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a claim, research topic, or academic prompt..."
            className="flex-1 bg-[var(--bg-main)] border border-[var(--border-main)] focus:border-[var(--text-accent)] text-sm font-sans text-[var(--text-main)] p-4 rounded placeholder-[var(--text-muted)]/50 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="bg-[var(--accent-primary)] hover:brightness-110 disabled:opacity-50 text-[var(--text-accent-contrast)] font-mono font-bold text-xs px-8 py-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider shrink-0"
          >
            <span>{loading ? 'INITIATING...' : 'START'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[11px] font-mono text-[var(--text-muted)] flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-[var(--text-muted)]/60">Popular:</span>
          <button onClick={() => setQuery("Macroeconomic impacts of synthetic biology")} className="hover:text-[var(--text-accent)] transition-colors cursor-pointer">
            "Macroeconomic impacts of synthetic biology"
          </button>
          <span>•</span>
          <button onClick={() => setQuery("Fact-check: Quantum Cryptography Benchmarks")} className="hover:text-[var(--text-accent)] transition-colors cursor-pointer">
            "Fact-check: Quantum Cryptography Benchmarks"
          </button>
        </div>
      </div>

      {/* Bento Grid Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
              RESEARCH SESSIONS
            </span>
            <ShieldCheck className="w-5 h-5 text-[var(--text-accent)]" />
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--text-main)]">
            {recentResearch.length > 0 ? recentResearch.length : '1'}
          </div>
          <p className="font-mono text-[10px] text-[var(--text-accent)]">↗ +12% from last month</p>
        </div>

        <div className="p-6 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
              VERIFIED CLAIMS
            </span>
            <CheckCircle2 className="w-5 h-5 text-[var(--text-accent)]" />
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--text-main)]">
            {recentResearch.length > 0 ? recentResearch.length * 4 : '4'}
          </div>
          <p className="font-mono text-[10px] text-green-500">98.2% Accuracy Rating</p>
        </div>

        <div className="p-6 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
              CITATIONS GATHERED
            </span>
            <span className="font-serif text-2xl font-bold text-[var(--text-accent)]">99</span>
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--text-main)]">14.5k</div>
          <p className="font-mono text-[10px] text-[var(--text-muted)]">Across 420 Peer-reviewed sources</p>
        </div>
      </div>

      {/* Recent Research & Vault Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Research List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[var(--text-main)]">Recent Research</h2>
            <button
              onClick={() => navigate('/history')}
              className="font-mono text-xs text-[var(--text-accent)] hover:underline cursor-pointer uppercase"
            >
              View All ↵
            </button>
          </div>

          <div className="space-y-3">
            {recentResearch.length > 0 ? (
              recentResearch.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/research/${item.id}`)}
                  className="p-4 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--text-accent)] transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-semibold text-sm text-[var(--text-main)] group-hover:text-[var(--text-accent)] transition-colors truncate max-w-md">
                      {item.query}
                    </h3>
                    <span className="font-mono text-[10px] bg-[var(--text-accent)]/10 text-[var(--text-accent)] border border-[var(--text-accent)]/20 px-2 py-0.5 rounded uppercase shrink-0">
                      {item.overallConfidence}% Verified
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-[11px] font-mono text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                onClick={() => navigate('/research/new')}
                className="p-6 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--text-accent)] transition-all cursor-pointer text-center space-y-2 group"
              >
                <PlusCircle className="w-8 h-8 text-[var(--text-accent)] mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-xs font-mono text-[var(--text-main)]">No active sessions yet. Initiate your first research topic!</p>
              </div>
            )}
          </div>
        </div>

        {/* Global Evidence Map & Reports Vault */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-main)]">Vault Reports</h2>

          <div className="space-y-3">
            <div
              onClick={() => navigate('/history')}
              className="p-4 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--text-accent)] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-5 h-5 text-[var(--text-accent)] shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-main)] group-hover:text-[var(--text-accent)]">Quantum_Encryption_Audit.md</h4>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">14 KB • Verified Citation</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-accent)] group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => navigate('/history')}
              className="p-4 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--text-accent)] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-5 h-5 text-[var(--text-accent)] shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-main)] group-hover:text-[var(--text-accent)]">EU_AI_Act_Compliance.pdf</h4>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">2.8 MB • Formal Standard</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-accent)] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
