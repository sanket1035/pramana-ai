import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ENV } from './config/env.js';
import healthRouter from './routes/health.js';
import researchRouter from './routes/research.js';
import historyRouter from './routes/history.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api', researchRouter);
app.use('/api', historyRouter);

// Serve static client dist if available
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

app.get('*', (req: Request, res: Response) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/health')) {
    const indexPath = path.join(clientDist, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    } else {
      return res.json({
        status: 'online',
        service: 'Pramāṇa AI Server & Agent Orchestrator',
        version: '1.0.0'
      });
    }
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});

app.listen(ENV.PORT, () => {
  console.log(`Pramāṇa AI Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
});
