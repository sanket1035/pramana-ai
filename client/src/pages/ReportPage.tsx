import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResearchReport } from '../services/api.js';
import { FullReportPayload } from '../types/index.js';
import { ReportView } from '../components/ReportView.js';
import confetti from 'canvas-confetti';

export const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [payload, setPayload] = useState<FullReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getResearchReport(id)
      .then((data) => {
        setPayload(data);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      })
      .catch((err) => {
        console.error(err);
        setError('Report not found or research pipeline failed.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono text-zinc-400">Loading citation-backed report...</p>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-3">
          <p className="text-xs text-red-400 font-mono">{error || 'Report unavailable'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <ReportView payload={payload} />;
};
