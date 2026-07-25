import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Search, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { getResearchHistory, deleteResearchReport } from '../services/api.js';
import { HistoryItem } from '../types/index.js';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = () => {
    setLoading(true);
    getResearchHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this research session?')) return;
    try {
      await deleteResearchReport(id);
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredHistory = history.filter(item =>
    item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            <span>Research History</span>
          </h1>
          <p className="text-xs text-zinc-400">All past verified reports and citation logs</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past sessions..."
            className="w-full bg-[#111113] border border-[#27272A] focus:border-purple-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* History Items */}
      {loading ? (
        <div className="p-8 text-center text-xs font-mono text-zinc-500 bg-[#111113] rounded-xl border border-[#27272A]">
          Loading research history...
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="p-12 text-center bg-[#111113] rounded-xl border border-[#27272A] space-y-3">
          <p className="text-xs text-zinc-400">No matching research sessions found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/research/${item.id}`)}
              className="p-4 rounded-xl bg-[#111113] border border-[#27272A] hover:border-purple-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                    {item.overallConfidence}% Confidence
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {item.query}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-1 font-sans">{item.summary}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="p-1.5 rounded bg-[#1C1C1F] hover:bg-red-950/60 hover:text-red-400 text-zinc-500 transition-colors"
                  title="Delete Session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
