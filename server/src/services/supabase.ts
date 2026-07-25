import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/env.js';

let supabaseClient: any = null;

if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
    console.log('Connected to Supabase PostgreSQL');
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
  }
} else {
  console.log('Supabase URL/Key missing. Using in-memory store fallback mode.');
}

export const supabase = supabaseClient;
