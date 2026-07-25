import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Bot, CheckCircle2, Sparkles, Zap, FileText, Database, Lock } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: '6-Agent Verification Pipeline',
      desc: 'Collaborative research, claim extraction, verification, contradiction detection, confidence scoring & report synthesis.'
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Confidence Scores',
      desc: 'Every claim is scored 0–100% with mathematical transparency and explicit reasoning instead of single-LLM guesswork.'
    },
    {
      icon: FileText,
      title: 'Academic & Official Citations',
      desc: 'Direct snippets and links to primary sources (arXiv, IEEE, NIST, Nature) attached to every verified statement.'
    },
    {
      icon: Zap,
      title: 'Powered by Gemini 2.5 Flash',
      desc: 'Lightning-fast reasoning across large context windows, executed with retry queues for 100% uptime reliability.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section (Vercel x Linear Glow) */}
      <section className="relative pt-12 md:pt-20 text-center max-w-4xl mx-auto space-y-8">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/50 text-xs font-mono text-purple-300 shadow-lg shadow-purple-950/30 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Next-Gen Multi-Agent Research Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
          Evidence. Intelligence. <br />
          <span className="shimmer-text">Unwavering Trust.</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
          Stop relying on hallucinated single-model LLM responses. Pramāṇa AI runs a 6-agent collaborative verification pipeline so every claim is checked, scored, and citation-backed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/research/new')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-purple-950/50 transition-all cursor-pointer hover:scale-[1.03] flex items-center justify-center space-x-2"
          >
            <span>Start Verification Query</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111113] hover:bg-[#161619] text-zinc-300 hover:text-white border border-[#27272A] hover:border-purple-500/40 text-sm font-medium transition-all cursor-pointer"
          >
            Explore Dashboard
          </button>
        </div>

        {/* Hero Preview Card */}
        <div className="pt-8">
          <div className="p-4 md:p-6 rounded-2xl glass-panel glow-border text-left max-w-3xl mx-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-purple-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                Verified Research Sample
              </span>
              <span className="text-green-400 bg-green-950/50 px-2 py-0.5 rounded border border-green-800/40">
                Score: 96% Confidence
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white">
                "What are the verified impacts of quantum computing on modern RSA cryptography?"
              </p>
              <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A] text-xs text-zinc-300 font-mono flex items-center justify-between">
                <span>[Verified Claim #1] Shor's algorithm factors RSA-2048 in polynomial time.</span>
                <span className="text-purple-400 underline cursor-pointer text-[11px]">arXiv:quant-ph</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Architected for Absolute Verification
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Instead of asking "What does the AI think?", Pramāṇa AI answers "What can be verified with primary evidence?"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl glass-card space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">{f.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#111113] to-blue-950/40 border border-purple-900/50 text-center space-y-6">
        <h2 className="text-2xl font-heading font-bold text-white">
          Ready for Traceable & Reliable AI Research?
        </h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Start your first multi-agent research session in instant anonymous mode or sign in for persistent session storage.
        </p>
        <button
          onClick={() => navigate('/research/new')}
          className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
        >
          Launch Research Session 🚀
        </button>
      </section>
    </div>
  );
};
