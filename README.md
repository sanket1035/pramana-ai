<div align="center">

# Pramāṇa AI

### Multi-Agent Research & Fact Verification Platform

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

**Pramāṇa AI** is a next-generation **Multi-Agent Research & Fact Verification Platform** designed to improve the reliability of AI-generated information.

Instead of relying on a single Large Language Model, Pramāṇa AI orchestrates multiple specialized AI agents that collaboratively research topics, verify claims, detect contradictions, assign confidence scores, and generate citation-backed reports.

The platform provides transparent reasoning and trustworthy outputs suitable for research, education, journalism, business intelligence, and knowledge work.

---

## The Problem

Modern AI systems can generate convincing responses but frequently suffer from:

- Hallucinated facts
- Unverified claims
- Missing citations
- Contradictory information
- Low transparency
- Difficult trust assessment

For researchers, students, journalists, and professionals, inaccurate AI responses can lead to misinformation and poor decision-making.

---

## Our Solution

Pramāṇa AI introduces a **Multi-Agent Verification Pipeline** where independent AI agents collaborate before presenting the final response.

Instead of asking:

> "What does the AI think?"

Pramāṇa AI answers:

> "What can be verified with evidence?"

Every generated report contains:

- Verified Claims
- Confidence Score
- Supporting Evidence
- Contradictions
- Source References
- Executive Summary

---
## Multi-Agent AI Pipeline

Pramāṇa AI follows a collaborative multi-agent architecture where each AI agent performs a specialized task before producing the final verified report.

```text
                User Query
                     │
                     ▼
            Research Agent
                     │
                     ▼
          Claim Extraction Agent
                     │
                     ▼
        Fact Verification Agent
                     │
                     ▼
     Contradiction Detection Agent
                     │
                     ▼
         Confidence Scoring Agent
                     │
                     ▼
          Report Generation Agent
                     │
                     ▼
        Citation-backed Final Report
```

Each agent has an independent responsibility, making the system more reliable than traditional single-model AI assistants.

---

# Core Features

## Research Agent

- Understands user queries
- Collects relevant information
- Identifies important claims
- Creates structured research context

---

## Claim Extraction

- Breaks research into atomic claims
- Separates facts from opinions
- Creates verifiable statements

---

## Fact Verification

- Verifies every extracted claim
- Evaluates factual consistency
- Marks unsupported information

---

## Contradiction Detection

- Detects conflicting statements
- Identifies hallucinations
- Highlights inconsistent evidence

---

## Confidence Scoring

Every verified claim receives a confidence score based on available supporting evidence.

Example:

| Claim | Confidence |
|--------|------------|
| AI Act proposed in EU | 96% |
| Statement without evidence | 38% |

---

## Citation Generation

Every verified statement includes supporting references.

Example

```
Claim

Generative AI adoption increased in enterprise software.

Sources

• IEEE
• Nature
• Official Documentation
```

---

## Executive Report

The final report contains:

- Executive Summary
- Research Findings
- Verified Claims
- Contradictions
- Confidence Analysis
- References
- Final Verdict

---

# Project Workflow

```text
Research Topic

↓

Research Agent

↓

Claim Extraction

↓

Fact Verification

↓

Contradiction Analysis

↓

Confidence Scoring

↓

Citation Generation

↓

Final Verified Report
```

---

# Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Node.js |
| Framework | Express.js |
| AI | Google Gemini 2.5 Flash |
| Charts | Recharts |
| Icons | Lucide React |
| Animations | Framer Motion |
| PDF | React PDF |
| Deployment | Vercel + Render |

---

# Project Structure

```text
Pramana-AI

client/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── App.jsx
│
server/
│
├── agents/
│   ├── researchAgent.js
│   ├── claimAgent.js
│   ├── verificationAgent.js
│   ├── contradictionAgent.js
│   ├── confidenceAgent.js
│   └── reportAgent.js
│
├── routes/
├── controllers/
├── services/
└── server.js
```

---

# Why Pramāṇa AI?

Unlike conventional AI assistants that rely on a single model response, Pramāṇa AI introduces a structured verification pipeline where multiple specialized AI agents collaborate to improve factual reliability, transparency, and user trust.

The platform focuses on explainable AI by showing how information was researched, verified, and validated before presenting the final response.

---

# Roadmap

- [ ] Advanced Multi-Agent Orchestration
- [ ] Real-time Web Search Integration
- [ ] PDF & Research Paper Analysis
- [ ] Collaborative Research Workspace
- [ ] Knowledge Graph Visualization
- [ ] Multi-Language Support
- [ ] Browser Extension
- [ ] Enterprise API
- [ ] Research History Sync
- [ ] AI-powered Source Credibility Analysis

---

# Contributors

| Name | Role |
|------|------|
| **Sanket Chaudhari** | Full Stack Development • AI Engineering • System Architecture |
| **Purva Chopade** | Frontend Development • UI/UX Design • Documentation |

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

<div align="center">

## Pramāṇa AI

### Evidence. Intelligence. Trust.

Built with **React**, **Node.js**, **Google Gemini**, **Express**, and **Tailwind CSS**.

Developed by **Sanket Chaudhari**.

© 2026 Pramāṇa AI. All Rights Reserved.

</div>
