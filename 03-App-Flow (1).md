# 03 — App Flow Document
## Pramāṇa AI

---

### 1. Pages

| Route | Purpose |
|---|---|
| `/` | Landing — pitch, CTA to start research |
| `/login` | Login / Signup (Google, Email, Anonymous) |
| `/dashboard` | Entry point after auth — start new research, see recent history |
| `/research/new` | Input research topic/question |
| `/research/:id/progress` | Live agent pipeline progress view |
| `/research/:id` | Final research report view |
| `/history` | List of all past research sessions |
| `/profile` | User info, account settings |
| `/settings` | App preferences (theme, defaults) |
| `*` | 404 |

### 2. Navigation Structure

- Top navbar (logo, nav links, profile menu) on desktop
- Left sidebar in dashboard/history views (Linear/Raycast-style) for quick nav between New Research / History / Settings
- Back button on report and progress pages returns to dashboard/history

### 3. First Screen (New Visitor)

Landing page: tagline, short explainer of the 5-agent pipeline, example query, "Start Research" CTA → routes to `/login` if unauthenticated, `/research/new` if session exists (anonymous mode allowed).

### 4. Auth Flow

```
Landing → Login/Signup choice
  → Google OAuth  → Dashboard
  → Email signup  → Verify (if required) → Dashboard
  → Anonymous     → Dashboard (limited history persistence)
```

### 5. Core User Journey 1 — New Research

1. User on `/dashboard`, clicks "New Research"
2. Enters topic/question on `/research/new`, submits
3. Redirected to `/research/:id/progress` — sees live agent cards: Research → Verification → Contradiction → Confidence → Citation → Report Generator, each updating status (pending/running/done)
4. On completion, auto-redirect to `/research/:id` — final report with citations, confidence badges, summary
5. User can download (PDF/Markdown) or return to dashboard

### 6. Core User Journey 2 — Revisit Past Research

1. User on `/history`, sees list of past sessions (title, date, top-line confidence)
2. Clicks a session → `/research/:id` loads saved report directly (no re-run)
3. Option to "Re-run" triggers a new session with same query

### 7. Empty States

- `/history` with no sessions: "No research yet — start your first query" + CTA
- `/dashboard` with no recent activity: prompt to start new research

### 8. Error States

- Query submission fails (API/network) → inline error on `/research/new`, retry button
- Agent pipeline fails mid-run → progress page shows failed agent stage, "Retry from this stage" option
- Report fetch fails (`/research/:id`) → error card with "Back to history"

### 9. Modal / Overlay Interactions

- Delete report confirmation modal (from `/history`)
- Share report modal (generates shareable link)
- Settings changes (theme, defaults) via drawer from sidebar

### 10. Redirects

| Action | Redirect |
|---|---|
| Login success | `/dashboard` |
| Logout | `/` |
| Research submit | `/research/:id/progress` |
| Pipeline complete | `/research/:id` |
| Delete report | `/history` |
