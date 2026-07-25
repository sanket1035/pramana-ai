# 05 — Backend Schema Document
## Pramāṇa AI

---

### 1. Tables

**users**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, from Supabase Auth |
| email | text | nullable (anonymous users) |
| name | text | |
| avatar_url | text | nullable |
| role | text | `user` \| `admin`, default `user` |
| is_anonymous | boolean | default false |
| created_at | timestamp | default now() |

**research_sessions**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users.id |
| query | text | original user question |
| status | text | `pending`\|`running`\|`completed`\|`failed` |
| current_stage | text | which agent is active |
| created_at | timestamp | |
| completed_at | timestamp | nullable |

**research_reports**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| session_id | uuid | FK → research_sessions.id |
| summary | text | |
| content_markdown | text | full report body |
| overall_confidence | numeric | 0–100 |
| created_at | timestamp | |

**claims**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| session_id | uuid | FK → research_sessions.id |
| claim_text | text | |
| status | text | `verified`\|`contradicted`\|`unverified` |
| order_index | int | position in report |

**citations**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| claim_id | uuid | FK → claims.id |
| source_url | text | |
| source_title | text | |
| snippet | text | supporting excerpt |

**confidence_scores**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| claim_id | uuid | FK → claims.id |
| score | numeric | 0–100 |
| reasoning | text | why this score, from Confidence Agent |

**agent_logs**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| session_id | uuid | FK → research_sessions.id |
| agent_name | text | Research\|Verification\|Contradiction\|Confidence\|Citation\|ReportGenerator |
| status | text | `started`\|`completed`\|`failed` |
| output_summary | text | short log of what agent produced |
| started_at | timestamp | |
| finished_at | timestamp | nullable |

**settings**
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users.id, unique |
| theme | text | `dark`\|`light`, default `dark` |
| default_privacy | text | `private`\|`shareable` |

### 2. Relationships

```
research_sessions.user_id      → users.id            (many-to-one)
research_reports.session_id    → research_sessions.id (one-to-one)
claims.session_id              → research_sessions.id (many-to-one)
citations.claim_id             → claims.id            (many-to-one)
confidence_scores.claim_id     → claims.id             (one-to-one)
agent_logs.session_id          → research_sessions.id (many-to-one)
settings.user_id               → users.id             (one-to-one)
```

### 3. Indexes

- `research_sessions(user_id)` — fast history lookup per user
- `claims(session_id)` — fast claim fetch per session
- `citations(claim_id)` — fast citation fetch per claim
- `agent_logs(session_id, started_at)` — ordered progress timeline

### 4. Auth Provider

Supabase Auth — JWT tokens, Google OAuth + Email/Password, anonymous sessions via Supabase's anonymous sign-in (upgradeable to full account later).

### 5. Row Level Security (RLS)

- `research_sessions`, `research_reports`, `claims`, `citations`, `confidence_scores`, `agent_logs`, `settings`: user can only `SELECT`/`INSERT`/`UPDATE`/`DELETE` rows where `user_id` (or session's `user_id` via join) matches `auth.uid()`
- `admin` role bypasses RLS for support/debug via service role key (server-side only, never exposed to client)

### 6. User Roles

| Role | Access |
|---|---|
| `admin` | Full access, all sessions (internal/debug only) |
| `user` | Own sessions/reports/settings only |
| anonymous | Own session only, tied to temp Supabase anon UID, lost if not upgraded |

### 7. File Storage

Not required for v1 (no uploads). Reserved for v2: `research-uploads/{user_id}/{session_id}/` for RAG source documents.

### 8. Sensitive Fields

None in v1 (no payment data, no PII beyond email/name from OAuth). Gemini API key and Supabase service role key live only in backend env vars, never in DB or client.

### 9. Key API Endpoints (reference)

```
POST   /research              → create session, kick off pipeline
GET    /research/:id/progress → poll/stream agent_logs status
GET    /report/:id            → fetch research_reports + claims + citations
GET    /history                → list research_sessions for user
DELETE /report/:id            → delete session + cascade
GET    /profile                → users + settings
PATCH  /settings               → update settings
```
