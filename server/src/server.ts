import express, { Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import healthRouter from './routes/health.js';
import researchRouter from './routes/research.js';
import historyRouter from './routes/history.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for dev/deploy
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api', researchRouter);
app.use('/api', historyRouter);

// Fallback 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(ENV.PORT, () => {
  console.log(`Pramāṇa AI Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
});
