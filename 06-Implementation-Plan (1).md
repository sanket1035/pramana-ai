# 06 — Implementation Plan
## Pramāṇa AI

---

### Phase 1 — Project Setup
- Init monorepo (`client/`, `server/`, `agents/`, `docs/`)
- Vite + React + TS client scaffold; Express + TS server scaffold
- Configure Tailwind, Shadcn UI, ESLint, Prettier
- Set up env vars (`.env.example` for all keys from TRD)
- Push initial repo, README with setup steps (no Docker)
- **Done when:** client + server run locally, hit a health-check endpoint successfully

### Phase 2 — Database
- Create Supabase project, write migrations for all tables (users, research_sessions, research_reports, claims, citations, confidence_scores, agent_logs, settings)
- Set up RLS policies per Backend Schema doc
- Seed minimal test data (1 dummy user, 1 dummy session)
- **Done when:** all tables exist in Supabase, RLS verified with a test query from client SDK

### Phase 3 — Auth
- Integrate Supabase Auth: Google OAuth, Email/Password, Anonymous sign-in
- Protected route wrapper on client (redirect to `/login` if unauthenticated)
- Session persistence + logout flow
- **Done when:** user can sign up/log in/log out via all 3 methods, protected routes enforced

### Phase 4 — Research Agent
- Gemini API integration (service wrapper in `services/gemini.ts`)
- Research Agent prompt: given a query, extract claims + candidate sources
- Store output into `claims` table, log to `agent_logs`
- **Done when:** submitting a query produces stored claims for that session

### Phase 5 — Verification Agent
- Prompt to cross-check each claim against gathered sources, mark `verified`/`unverified`
- Store citations per verified claim
- **Done when:** claims table updates with verification status + linked citations

### Phase 6 — Contradiction Agent
- Prompt to compare claims against each other and against sources, flag contradictions/hallucinations/weak evidence
- Update claim status to `contradicted` where relevant, store reasoning
- **Done when:** contradictory/weak claims are correctly flagged in test queries

### Phase 7 — Confidence Engine
- Prompt to score each claim 0–100 with reasoning, store in `confidence_scores`
- Aggregate into `research_reports.overall_confidence`
- **Done when:** every claim has a score, session has an overall confidence value

### Phase 8 — Report Generator
- Compile claims + citations + confidence into markdown report (`research_reports.content_markdown`)
- Citation Agent: format sources consistently (title, url, snippet)
- **Done when:** `/research/:id` returns a complete, well-formatted report end-to-end from a single query

### Phase 9 — Frontend: Core Pages
- Build Landing, Login, Dashboard, New Research, Agent Progress (live status via polling/streaming), Research Result, History, Profile, Settings, 404
- Wire to backend endpoints via TanStack Query
- Framer Motion for progress/typing/streaming states
- **Done when:** full user journey (query → progress → report → history) works in UI

### Phase 10 — Polish, Testing, Deployment
- Responsive pass (mobile breakpoints), empty/error/loading states per App Flow doc
- Manual test all flows incl. failure/retry paths
- Deploy: client → Vercel, server → Railway, confirm env vars + CORS + Supabase connection in prod
- **Done when:** full flow works end-to-end on production URLs, no local-only dependencies

---

### Overall Done Criteria
- New user can sign up, submit a query, watch live agent progress, and get a cited, confidence-scored markdown report — entirely on deployed URLs, free-tier services, no manual intervention.
