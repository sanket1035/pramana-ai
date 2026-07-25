import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResearchProgress } from '../services/api.js';
import { AgentPipelineProgress } from '../components/AgentPipelineProgress.js';
import { AgentLog } from '../types/index.js';

export const ProgressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('running');
  const [currentStage, setCurrentStage] = useState<string>('Research');
  const [logs, setLogs] = useState<AgentLog[]>([]);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const pollInterval = setInterval(async () => {
      try {
        const data = await getResearchProgress(id);
        if (!isMounted) return;

        setQuery(data.query);
        setStatus(data.status);
        setCurrentStage(data.currentStage);
        setLogs(data.logs);

        if (data.status === 'completed') {
          clearInterval(pollInterval);
          setTimeout(() => {
            navigate(`/research/${id}`);
          }, 1200);
        } else if (data.status === 'failed') {
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('Progress polling error:', err);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [id, navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-white">
          Multi-Agent Pipeline Executing...
        </h1>
        <p className="text-xs font-mono text-purple-300 truncate">
          Query: "{query || 'Processing...'}"
        </p>
      </div>

      <AgentPipelineProgress currentStage={currentStage} logs={logs} status={status} />

      {status === 'failed' && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-mono text-center">
          Pipeline failed to complete. Please try submitting your query again.
        </div>
      )}
    </div>
  );
};
