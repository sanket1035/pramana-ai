import { Router, Request, Response } from 'express';
import { executeMultiAgentPipeline } from '../agents/agentRunner.js';
import { memoryStore } from '../services/mockData.js';

const router = Router();

// POST /api/research - Start new multi-agent research pipeline
router.post('/research', async (req: Request, res: Response) => {
  try {
    const { query, userId } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Research query is required.' });
    }

    const sessionId = await executeMultiAgentPipeline(query.trim(), userId || 'default-user-id');
    return res.status(201).json({
      sessionId,
      message: 'Multi-agent research pipeline initiated successfully.',
      progressUrl: `/api/research/${sessionId}/progress`
    });
  } catch (err: any) {
    console.error('Error initiating research pipeline:', err);
    return res.status(500).json({ error: 'Failed to initiate research pipeline.' });
  }
});

// GET /api/research/:id/progress - Fetch live agent pipeline logs & current stage
router.get('/research/:id/progress', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : String(req.params.id);
  const session = memoryStore.getSession(id);

  if (!session) {
    return res.status(404).json({ error: 'Research session not found.' });
  }

  const logs = memoryStore.getLogs(id);
  return res.json({
    sessionId: session.id,
    query: session.query,
    status: session.status,
    currentStage: session.current_stage,
    logs,
    completedAt: session.completed_at
  });
});

// GET /api/report/:id - Fetch complete citation-backed research report payload
router.get('/report/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : String(req.params.id);
  const payload = memoryStore.getFullPayload(id);

  if (!payload) {
    return res.status(404).json({ error: 'Report not found or research pipeline incomplete.' });
  }

  return res.json(payload);
});

// DELETE /api/report/:id - Delete research session
router.delete('/report/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : String(req.params.id);
  memoryStore.deleteSession(id);
  return res.json({ message: 'Session deleted successfully.' });
});

export default router;
