import { FullReportPayload, HistoryItem } from '../types/index.js';

const API_BASE = '/api';

export async function createResearchSession(query: string): Promise<{ sessionId: string }> {
  const res = await fetch(`${API_BASE}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to start research session');
  }

  return res.json();
}

export async function getResearchProgress(sessionId: string) {
  const res = await fetch(`${API_BASE}/research/${sessionId}/progress`);
  if (!res.ok) {
    throw new Error('Failed to fetch progress');
  }
  return res.json();
}

export async function getResearchReport(sessionId: string): Promise<FullReportPayload> {
  const res = await fetch(`${API_BASE}/report/${sessionId}`);
  if (!res.ok) {
    throw new Error('Report not ready or session not found');
  }
  return res.json();
}

export async function getResearchHistory(): Promise<HistoryItem[]> {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }
  const data = await res.json();
  return data.history || [];
}

export async function deleteResearchReport(sessionId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/report/${sessionId}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error('Failed to delete report');
  }
}

export async function clearResearchHistory(): Promise<void> {
  const history = await getResearchHistory();
  await Promise.all(history.map(item => deleteResearchReport(item.id).catch(() => {})));
}
