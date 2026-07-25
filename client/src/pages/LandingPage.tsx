import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Quote, Search, Bot } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-20 pb-20">
      {/* Hero Section */}
      <section className="text-center pt-10 md:pt-16 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ffb77d]/10 border border-[#ffb77d]/30 font-mono text-xs text-[#ffb77d] uppercase tracking-wider">
          <span>Multi-Agent Research OS v1.0</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#e8e1dd] leading-tight tracking-tight">
          Absolute Clarity Through <br />
          <span className="text-[#ffb77d]">Multi-Agent Verification</span>
        </h1>

        <p className="font-sans text-base text-[#dbc2b0] max-w-2xl mx-auto leading-relaxed">
          A high-performance operating system for multi-agent synthesis and fact verification. Every claim is deconstructed, cross-checked against peer-reviewed sources, and scored with transparent confidence rationale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/research/new')}
            className="w-full sm:w-auto bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs px-8 py-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
          >
            <span>Launch Research Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto bg-[#221f1c] hover:bg-[#2d2927] text-[#e8e1dd] font-sans font-medium text-xs px-7 py-4 rounded border border-[#554336] transition-all cursor-pointer"
          >
            Explore Vault Dashboard
          </button>
        </div>
      </section>

      {/* Hero Interactive Preview */}
      <section className="bg-[#221f1c] border border-[#554336] p-6 md:p-8 rounded max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-[#554336] pb-4">
          <span className="font-serif font-bold text-lg text-[#e8e1dd]">Quantum Computing & Cryptography Verification</span>
          <span className="font-mono text-xs text-[#ffb77d] bg-[#ffb77d]/10 px-2.5 py-1 rounded border border-[#ffb77d]/30">
            96% Confidence Rating
          </span>
        </div>

        <div className="space-y-3 font-sans text-sm">
          <div className="p-4 bg-[#151310] border border-[#554336] rounded space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#e8e1dd]">[Verified Claim] Shor's algorithm factors RSA-2048 in polynomial time.</span>
              <span className="font-mono text-xs text-[#ffb77d]">Score: 98%</span>
            </div>
            <p className="text-xs text-[#dbc2b0]/70 font-mono">Source: arXiv:quant-ph/9508027 — IEEE Quantum Roadmap</p>
          </div>

          <div className="p-4 bg-[#151310] border border-[#554336] rounded space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#e8e1dd]">[Verified Claim] NIST finalized ML-KEM and ML-DSA PQC standards in 2024.</span>
              <span className="font-mono text-xs text-[#ffb77d]">Score: 96%</span>
            </div>
            <p className="text-xs text-[#dbc2b0]/70 font-mono">Source: NIST FIPS 203 & 204 Standards Publication</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded space-y-3">
          <Bot className="w-6 h-6 text-[#ffb77d]" />
          <h3 className="font-serif font-bold text-lg text-[#e8e1dd]">6-Agent Pipeline</h3>
          <p className="font-sans text-xs text-[#dbc2b0] leading-relaxed">
            Research, Claim Extraction, Fact Verification, Contradiction Detection, Confidence Engine, and Report Generator.
          </p>
        </div>

        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded space-y-3">
          <ShieldCheck className="w-6 h-6 text-[#ffb77d]" />
          <h3 className="font-serif font-bold text-lg text-[#e8e1dd]">0-100% Rationale</h3>
          <p className="font-sans text-xs text-[#dbc2b0] leading-relaxed">
            Mathematical confidence scoring based on source authority, evidence overlap, and logical consistency.
          </p>
        </div>

        <div className="bg-[#1e1b19] border border-[#554336] p-6 rounded space-y-3">
          <Quote className="w-6 h-6 text-[#ffb77d]" />
          <h3 className="font-serif font-bold text-lg text-[#e8e1dd]">Academic Citations</h3>
          <p className="font-sans text-xs text-[#dbc2b0] leading-relaxed">
            Direct excerpts and footnote links from arXiv, IEEE, NIST, and peer-reviewed journals.
          </p>
        </div>
      </section>
    </div>
  );
};
