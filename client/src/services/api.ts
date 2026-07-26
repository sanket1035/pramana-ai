import { FullReportPayload, HistoryItem } from '../types/index.js';

const API_BASE = '/api';

export async function createResearchSession(
  query: string,
  options?: {
    depth?: 'SURFACE' | 'DEEP';
    outputFormat?: 'EXECUTIVE SUMMARY' | 'FULL DOSSIER' | 'DATA VISUALIZATION';
    domain?: 'ACADEMIC' | 'JOURNALISM' | 'EDUCATION';
    userId?: string;
  }
): Promise<{ sessionId: string }> {
  const res = await fetch(`${API_BASE}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      userId: options?.userId || 'default-user-id',
      depth: options?.depth || 'SURFACE',
      outputFormat: options?.outputFormat || 'EXECUTIVE SUMMARY',
      domain: options?.domain || 'ACADEMIC'
    })
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

export async function getResearchHistory(userId?: string): Promise<HistoryItem[]> {
  const url = userId ? `${API_BASE}/history?userId=${encodeURIComponent(userId)}` : `${API_BASE}/history`;
  const res = await fetch(url);
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
