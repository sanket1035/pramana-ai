import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'Pramāṇa AI Agent Server',
    timestamp: new Date().toISOString()
  });
});

export default router;
