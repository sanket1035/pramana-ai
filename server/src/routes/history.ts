import { Router, Request, Response } from 'express';
import { memoryStore } from '../services/mockData.js';

const router = Router();

// GET /api/history - List past research sessions with reports summary
router.get('/history', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? String(req.query.userId) : undefined;
    const sessions = memoryStore.getAllSessions(userId);
    const historyList = sessions.map(session => {
      const report = memoryStore.getReport(session.id);
      const claims = memoryStore.getClaims(session.id);
      return {
        id: session.id,
        query: session.query,
        status: session.status,
        overallConfidence: report?.overall_confidence || 0,
        summary: report?.summary || 'Research in progress...',
        claimCount: claims.length,
        createdAt: session.created_at,
        completedAt: session.completed_at
      };
    });

    res.json({ history: historyList });
  } catch (err: any) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch research history.' });
  }
});

export default router;
