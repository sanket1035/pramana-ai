import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, CheckSquare, AlertTriangle, BarChart3, History, ShieldCheck, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#151310] text-[#e8e1dd] font-sans selection:bg-[#ffb77d] selection:text-[#4d2600]">
      {/* Landing Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#151310]/80 backdrop-blur-md border-b border-[#554336] h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <span className="font-serif text-2xl font-bold text-[#e8e1dd]">Pramāṇa</span>
          <span className="font-mono text-[10px] text-[#ffb77d] bg-[#ffb77d]/10 px-2 py-0.5 rounded border border-[#ffb77d]/20 uppercase">
            AI Research OS
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="font-mono text-xs text-[#dbc2b0] hover:text-[#e8e1dd] transition-colors"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs px-5 py-2 rounded transition-all cursor-pointer uppercase tracking-wider"
          >
            INITIATE SESSION
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative min-h-[750px] flex flex-col items-center justify-center text-center px-6 space-y-6 max-w-4xl mx-auto pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#221f1c] border border-[#554336] rounded-full text-xs font-mono text-[#ffb77d]">
            <span className="w-2 h-2 bg-[#ffb77d] rounded-full animate-pulse" />
            <span>VERIFICATION PROTOCOL v4.2 ACTIVE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-[70px] md:leading-[78px] font-bold text-[#e8e1dd]">
            The Research Operating System for the Truth.
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#dbc2b0] max-w-2xl mx-auto leading-relaxed">
            Autonomous multi-agent verification for analysts, journalists, and researchers who demand absolute accuracy in a world of algorithmic noise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-widest shadow-xl shadow-[#ffb77d]/10"
            >
              <span>INITIATE SESSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-[#554336] text-[#e8e1dd] font-mono text-xs px-8 py-4 rounded-full hover:bg-[#2d2927] transition-all cursor-pointer uppercase tracking-widest"
            >
              ENTER ANONYMOUSLY
            </button>
          </div>
        </section>

        {/* Multi-Agent Pipeline Diagram */}
        <section className="py-20 border-y border-[#554336] bg-[#1e1b19]">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#e8e1dd]">The Multi-Agent Pipeline</h2>
              <p className="font-mono text-xs text-[#ffb77d] tracking-widest uppercase">SERIAL CROSS-EXAMINATION ARCHITECTURE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
              <div className="p-6 bg-[#221f1c] border border-[#554336] rounded space-y-3">
                <Search className="w-8 h-8 text-[#ffb77d] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd]">1. RESEARCH</h3>
                <p className="text-xs text-[#dbc2b0]/70">Deep crawling of arXiv, IEEE, NIST & real-time sources.</p>
              </div>

              <div className="p-6 bg-[#221f1c] border border-[#554336] rounded space-y-3">
                <CheckSquare className="w-8 h-8 text-[#ffb77d] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd]">2. VERIFICATION</h3>
                <p className="text-xs text-[#dbc2b0]/70">Triple-blind cross-referencing against primary docs.</p>
              </div>

              <div className="p-6 bg-[#221f1c] border border-[#554336] rounded space-y-3">
                <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd]">3. CONTRADICTION</h3>
                <p className="text-xs text-[#dbc2b0]/70">Active pursuit of counter-evidence to stress-test claims.</p>
              </div>

              <div className="p-6 bg-[#221f1c] border border-[#554336] rounded space-y-3">
                <BarChart3 className="w-8 h-8 text-[#ffb77d] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd]">4. CONFIDENCE</h3>
                <p className="text-xs text-[#dbc2b0]/70">Probabilistic 0-100% scoring based on evidence density.</p>
              </div>

              <div className="p-6 bg-[#221f1c] border border-[#554336] rounded space-y-3">
                <History className="w-8 h-8 text-[#ffb77d] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd]">5. CITATION</h3>
                <p className="text-xs text-[#dbc2b0]/70">Granular attribution linked to the exact point of origin.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
