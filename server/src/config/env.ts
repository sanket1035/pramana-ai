import dotenv from 'dotenv';
import path from 'path';

// Load root .env first, then local .env if present
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  STITCH_API_KEY: process.env.STITCH_API_KEY || '',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
