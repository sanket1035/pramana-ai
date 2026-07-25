-- Pramāṇa AI PostgreSQL Database Schema (Supabase)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  name TEXT NOT NULL DEFAULT 'Researcher',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Research Sessions Table
CREATE TABLE IF NOT EXISTS research_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | running | completed | failed
  current_stage TEXT NOT NULL DEFAULT 'Research',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 3. Research Reports Table
CREATE TABLE IF NOT EXISTS research_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE UNIQUE,
  summary TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  overall_confidence NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Claims Table
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
  claim_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unverified', -- verified | contradicted | unverified
  order_index INT NOT NULL DEFAULT 0
);

-- 5. Citations Table
CREATE TABLE IF NOT EXISTS citations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  source_title TEXT NOT NULL,
  snippet TEXT NOT NULL
);

-- 6. Confidence Scores Table
CREATE TABLE IF NOT EXISTS confidence_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE UNIQUE,
  score NUMERIC NOT NULL CHECK (score >= 0 AND score <= 100),
  reasoning TEXT NOT NULL
);

-- 7. Agent Logs Table
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES research_sessions(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL, -- Research | Verification | Contradiction | Confidence | Citation | ReportGenerator
  status TEXT NOT NULL DEFAULT 'started', -- started | completed | failed
  output_summary TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  finished_at TIMESTAMP WITH TIME ZONE
);

-- 8. User Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  theme TEXT NOT NULL DEFAULT 'dark',
  default_privacy TEXT NOT NULL DEFAULT 'private',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for optimal performance
CREATE INDEX IF NOT EXISTS idx_sessions_user ON research_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_session ON claims(session_id);
CREATE INDEX IF NOT EXISTS idx_citations_claim ON citations(claim_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_session ON agent_logs(session_id, started_at);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE confidence_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
