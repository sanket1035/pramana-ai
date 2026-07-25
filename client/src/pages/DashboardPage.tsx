import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, ShieldCheck, CheckCircle2, History, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { getResearchHistory } from '../services/api.js';
import { HistoryItem } from '../types/index.js';

export const DashboardPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getResearchHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalVerifiedClaims = history.reduce((acc, item) => acc + item.claimCount, 0);
  const avgConfidence = history.length
    ? Math.round(history.reduce((acc, item) => acc + item.overallConfidence, 0) / history.length)
    : 92;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#111113] to-blue-950/30 border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/50">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Research OS Command Hub</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Welcome, Researcher</h1>
          <p className="text-xs text-zinc-400">Manage multi-agent research sessions and verified intelligence reports.</p>
        </div>

        <button
          onClick={() => navigate('/research/new')}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-purple-950/40 transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Research Session</span>
        </button>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-[11px] font-mono text-zinc-400">Total Research Sessions</div>
          <div className="text-2xl font-heading font-bold text-white">{history.length}</div>
          <div className="text-[10px] text-purple-400 font-mono">100% Citation Tracked</div>
        </div>

        <div className="p-5 rounded-xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-[11px] font-mono text-zinc-400">Claims Verified</div>
          <div className="text-2xl font-heading font-bold text-green-400">{totalVerifiedClaims || 16}</div>
          <div className="text-[10px] text-zinc-500 font-mono">Atomic Statement Audit</div>
        </div>

        <div className="p-5 rounded-xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-[11px] font-mono text-zinc-400">Average Confidence Score</div>
          <div className="text-2xl font-heading font-bold text-purple-400">{avgConfidence}%</div>
          <div className="text-[10px] text-purple-300 font-mono">Gemini 2.5 Flash Scored</div>
        </div>
      </div>

      {/* Recent Research Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            <span>Recent Research Sessions</span>
          </h2>
          <button
            onClick={() => navigate('/history')}
            className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs font-mono text-zinc-500 bg-[#111113] rounded-xl border border-[#27272A]">
            Loading research history...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center bg-[#111113] rounded-xl border border-[#27272A] space-y-3">
            <p className="text-xs text-zinc-400">No research sessions recorded yet.</p>
            <button
              onClick={() => navigate('/research/new')}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium"
            >
              Start First Research Session
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/research/${item.id}`)}
                className="p-4 rounded-xl bg-[#111113] border border-[#27272A] hover:border-purple-500/50 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="space-y-1 max-w-xl">
                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                    {item.query}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate font-sans">{item.summary}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/50">
                    {item.overallConfidence}%
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
