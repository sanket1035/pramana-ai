<div align="center">

# Pramāṇa AI

**Evidence. Intelligence. Trust.**

[![Google Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)]()
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)]()
![Status](https://img.shields.io/badge/Status-Active%20Development-blueviolet?style=for-the-badge)

</div>

---

## Overview

Pramāṇa AI is an enterprise-grade academic verification platform that uses a 4-agent AI pipeline to eliminate LLM hallucinations, validate factual claims against live academic databases, and generate trust-calibrated research dossiers.

---

## Core Features

- **4-Agent Autonomous Pipeline**:
  - **Research Synthesis Agent**: Formulates initial research dossiers.
  - **Claim Verification Agent**: Extracts atomic claim statements and generates live academic paper search anchors.
  - **Contradiction Audit Agent**: Cross-checks claims against published hardware roadmaps and empirical benchmarks.
  - **Confidence Calibration Agent**: Computes weighted reliability scores (0% to 100%) and global session metrics.

- **Dynamic Search Anchors (Zero 404s)**: Dynamically routes citations to live search query portals across Google Scholar, arXiv, IEEE Xplore, PubMed, NIST, and Nature.
- **Firebase Authentication & User Vaults**: Google OAuth 2.0 & Email/Password Sign Up/In with strict user-scoped history persistence.
- **Interactive Visual Data Suite**: Real-time Recharts & SVG bar charts displaying claim confidence distribution and domain trust ratios.
- **Live System Telemetry**: Real-time polling endpoint (`/api/agents/telemetry`) tracking active agent throughput, citation anchors, and contradiction logs.
- **Multi-Format Export Suite**: Export full verified dossiers directly to Markdown (.md) or clean print-ready PDF (.pdf).

---

## Technical Stack

- **Frontend**: React 19, Vite 6, TailwindCSS 4, React Router v7, Lucide Icons, Recharts, Mermaid.js, `react-markdown`.
- **Backend**: Express.js (TypeScript), Node.js, Gemini API (`gemini-2.0-flash`).
- **Authentication**: Firebase Authentication (Google OAuth + Email/Password).
- **Environment Management**: Vite dotenv environment variable parsing.

---

## Installation & Setup Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/pramana-ai.git
cd pramana-ai

# Install root, client, and server dependencies
npm install
npm install --prefix client
npm install --prefix server
```

### 2. Environment Configuration
Create a `.env` file inside `client/` and in the root directory:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=pramana-ai-af616.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pramana-ai-af616
VITE_FIREBASE_STORAGE_BUCKET=pramana-ai-af616.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1006358447996
VITE_FIREBASE_APP_ID=1:1006358447996:web:...
```

### 3. Run Development Servers
```bash
# Terminal 1: Start Express TypeScript Server (Port 5000)
npm run dev:server

# Terminal 2: Start Vite React Client (Port 5173)
npm run dev:client
```

### 4. Build for Production
```bash
npm run build --prefix client
npm run build --prefix server
```

---

## Architecture Diagram

```
[ User Request ]
       │
       ▼
[ React 19 Frontend ] ──(Firebase Auth)──► [ User-Scoped Vault ]
       │
       ▼ (Express API)
[ Multi-Agent Verification Pipeline ]
 ├── 1. Synthesis Agent ➔ Key Concept Breakdown
 ├── 2. Verification Agent ➔ Atomic Claim Extraction & Live Academic Links
 ├── 3. Contradiction Agent ➔ Benchmark & Roadmap Audit
 └── 4. Confidence Agent ➔ Score Calibration & Telemetry Metrics
       │
       ▼
[ Executive Research Dossier & PDF/MD Export ]
```

---

# Contributors

| Name | Role |
|------|------|
| **Sanket Chaudhari** | Full Stack Development • AI Engineering • System Architecture • Frontend Development • UI/UX Design |
| **Purva Chopade** | Documentation |

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

<div align="center">

## Pramāṇa AI

### Evidence. Intelligence. Trust.

Developed by **Sanket Chaudhari**.

© 2026 Pramāṇa AI. All Rights Reserved.

</div>
