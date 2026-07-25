import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Search, Trash2, ArrowRight, Clock, FileText } from 'lucide-react';
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
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#554336] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#e8e1dd] flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-[#ffb77d]" />
            <span>Research Vault History</span>
          </h1>
          <p className="text-xs font-sans text-[#dbc2b0]">Archived multi-agent verified sessions and primary citation records.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#dbc2b0] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vault history..."
            className="w-full bg-[#1e1b19] border border-[#554336] focus:border-[#ffb77d] rounded pl-9 pr-3 py-1.5 font-sans text-xs text-[#e8e1dd] placeholder-[#dbc2b0]/50 outline-none"
          />
        </div>
      </div>

      {/* History Items */}
      {loading ? (
        <div className="p-8 text-center text-xs font-mono text-[#dbc2b0] bg-[#221f1c] rounded border border-[#554336]">
          Loading research vault history...
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="p-12 text-center bg-[#221f1c] rounded border border-[#554336] space-y-3">
          <p className="text-xs text-[#dbc2b0]">No matching research sessions found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/research/${item.id}`)}
              className="bg-[#2d2927]/40 border border-[#554336] p-5 rounded hover:bg-[#2d2927] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#ffb77d]/10 text-[#ffb77d] border border-[#ffb77d]/20 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                    {item.overallConfidence}% Verified
                  </span>
                  <span className="font-mono text-[10px] text-[#dbc2b0]/60">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-sm text-[#e8e1dd] group-hover:text-[#ffb77d] transition-colors">
                  {item.query}
                </h3>
                <p className="text-xs text-[#dbc2b0]/70 line-clamp-1 font-sans">{item.summary}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="p-1.5 rounded bg-[#151310] hover:bg-red-950/60 hover:text-red-400 text-[#dbc2b0]/60 transition-colors"
                  title="Delete Session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ArrowRight className="w-4 h-4 text-[#dbc2b0] group-hover:text-[#ffb77d] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
