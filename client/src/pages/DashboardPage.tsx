import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Quote, Clock, FileText, Database, Upload, Globe } from 'lucide-react';
import { getResearchHistory, createResearchSession } from '../services/api.js';
import { HistoryItem } from '../types/index.js';

export const DashboardPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getResearchHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || submitting) return;

    setSubmitting(true);
    try {
      const { sessionId } = await createResearchSession(query.trim());
      navigate(`/research/${sessionId}/progress`);
    } catch (err) {
      console.error('Error starting research:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const totalVerifiedClaims = history.reduce((acc, item) => acc + item.claimCount, 0) || 2841;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-10">
      {/* Welcome Header */}
      <section className="space-y-1">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#e8e1dd]">
          Welcome back, Researcher.
        </h1>
        <p className="text-sm font-sans text-[#dbc2b0] max-w-2xl">
          Your multi-agent research pipeline verified claims & citations across academic literature.
        </p>
      </section>

      {/* Immediate Initiation Card */}
      <section>
        <div className="bg-[#221f1c] border border-[#554336]/60 p-6 md:p-8 rounded relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <h2 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">
              Immediate Initiation
            </h2>
            <form onSubmit={handleStartResearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a claim, research topic, or academic prompt..."
                className="flex-1 bg-[#151310] border border-[#554336] focus:border-[#ffb77d] rounded px-5 py-3.5 font-sans text-sm text-[#e8e1dd] placeholder-[#dbc2b0]/50 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!query.trim() || submitting}
                className="bg-[#ffb77d] hover:brightness-110 disabled:opacity-50 text-[#4d2600] px-8 py-3.5 font-mono font-bold text-xs rounded flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer uppercase tracking-wider shrink-0"
              >
                <span>{submitting ? 'Initiating...' : 'START'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-3 text-xs font-sans text-[#dbc2b0]/60 pt-1">
              <span>Popular: "Macroeconomic impacts of synthetic biology"</span>
              <span>•</span>
              <span>"Fact-check: Quantum Cryptography Benchmarks"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded flex flex-col justify-between space-y-4">
          <div>
            <ShieldCheck className="w-6 h-6 text-[#ffb77d] mb-2" />
            <div className="font-mono text-xs text-[#dbc2b0] uppercase tracking-wider">Research Sessions</div>
          </div>
          <div className="font-serif text-4xl font-bold text-[#e8e1dd]">{history.length || 142}</div>
          <div className="text-xs font-mono text-[#ffb77d] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% from last month
          </div>
        </div>

        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded flex flex-col justify-between space-y-4">
          <div>
            <ShieldCheck className="w-6 h-6 text-[#ffb77d] mb-2" />
            <div className="font-mono text-xs text-[#dbc2b0] uppercase tracking-wider">Verified Claims</div>
          </div>
          <div className="font-serif text-4xl font-bold text-[#e8e1dd]">{totalVerifiedClaims}</div>
          <div className="text-xs font-mono text-[#dbc2b0]">
            98.2% Accuracy Rating
          </div>
        </div>

        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded flex flex-col justify-between space-y-4">
          <div>
            <Quote className="w-6 h-6 text-[#ffb77d] mb-2" />
            <div className="font-mono text-xs text-[#dbc2b0] uppercase tracking-wider">Citations Gathered</div>
          </div>
          <div className="font-serif text-4xl font-bold text-[#e8e1dd]">14.5k</div>
          <div className="text-xs font-mono text-[#dbc2b0]">
            Across 420 Peer-reviewed sources
          </div>
        </div>
      </section>

      {/* Content Split: Recent Research & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Research Sessions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-[#e8e1dd]">Recent Research</h3>
            <button onClick={() => navigate('/history')} className="font-mono text-xs text-[#ffb77d] hover:underline">
              View All
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-[#dbc2b0] bg-[#221f1c] rounded border border-[#554336]">
              Loading research sessions...
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((session) => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/research/${session.id}`)}
                  className="bg-[#2d2927]/40 border border-[#554336] p-5 rounded hover:bg-[#2d2927] transition-colors cursor-pointer group space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-sans font-semibold text-sm text-[#e8e1dd] group-hover:text-[#ffb77d] transition-colors truncate max-w-md">
                      {session.query}
                    </h4>
                    <span className="bg-[#ffb77d]/10 text-[#ffb77d] border border-[#ffb77d]/20 text-[10px] px-2 py-0.5 rounded font-mono uppercase shrink-0">
                      {session.overallConfidence}% Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#dbc2b0]/70">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(session.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {session.claimCount} claims</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reports Side Panel */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#e8e1dd]">Vault Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded bg-[#221f1c] border border-[#554336]">
              <FileText className="w-5 h-5 text-[#ffb77d]" />
              <div>
                <div className="text-xs font-semibold text-[#e8e1dd]">Quantum_Encryption_Audit.md</div>
                <div className="text-[10px] font-mono text-[#dbc2b0]/60">14 KB • Verified Citation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded bg-[#221f1c] border border-[#554336]">
              <FileText className="w-5 h-5 text-[#ffb77d]" />
              <div>
                <div className="text-xs font-semibold text-[#e8e1dd]">EU_AI_Act_Compliance.pdf</div>
                <div className="text-[10px] font-mono text-[#dbc2b0]/60">2.8 MB • Formal Standard</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1b19] border border-[#554336] p-5 rounded text-center space-y-3 mt-4">
            <Upload className="w-8 h-8 text-[#a38c7c] mx-auto" />
            <p className="text-xs font-sans text-[#dbc2b0]">Ingest custom papers to expand research scope</p>
            <button className="w-full border border-[#a38c7c] text-[#e8e1dd] font-mono text-xs py-2 rounded hover:bg-[#383431] transition-colors cursor-pointer">
              Upload Dataset
            </button>
          </div>
        </div>
      </div>

      {/* Global Evidence Map Preview */}
      <section className="pt-6 border-t border-[#554336]/40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest font-semibold">Global Evidence Map</h3>
            <p className="text-xs font-sans text-[#dbc2b0]">Spatial distribution of active research citations</p>
          </div>
          <span className="font-mono text-xs text-[#ffb77d] bg-[#ffb77d]/10 px-2 py-0.5 rounded border border-[#ffb77d]/20">GLOBAL</span>
        </div>
        <div className="h-48 w-full bg-[#1e1b19] rounded border border-[#554336] flex items-center justify-center relative overflow-hidden">
          <Globe className="w-16 h-16 text-[#ffb77d]/20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#dbc2b0]/60">
            Node Clusters Connected • 420 Academic Sources Indexed
          </div>
        </div>
      </section>
    </div>
  );
};
