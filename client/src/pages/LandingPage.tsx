import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, CheckSquare, AlertTriangle, BarChart3, BookOpen, Link, Network, ShieldCheck } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#151310] text-[#e8e1dd] font-sans selection:bg-[#ffb77d]/30 selection:text-[#ffb77d] relative overflow-x-hidden">
      {/* Navigation Shell */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#151310]/80 backdrop-blur-md border-b border-[#554336] transition-all">
        <nav className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span
              onClick={() => navigate('/')}
              className="font-serif text-2xl md:text-3xl text-[#ffb77d] font-bold cursor-pointer"
            >
              Pramāṇa
            </span>
            <div className="hidden md:flex items-center gap-6 font-mono text-xs text-[#dbc2b0]">
              <button onClick={() => navigate('/login')} className="hover:text-[#ffb77d] transition-colors uppercase">DASHBOARD</button>
              <button onClick={() => navigate('/login')} className="hover:text-[#ffb77d] transition-colors uppercase">RESEARCH</button>
              <button onClick={() => navigate('/login')} className="hover:text-[#ffb77d] transition-colors uppercase">AGENTS</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#221f1c] px-3.5 py-1.5 rounded-full border border-[#554336]">
              <Search className="w-4 h-4 text-[#dbc2b0] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search verified reports..."
                className="bg-transparent border-none text-xs text-[#e8e1dd] placeholder-[#dbc2b0]/50 outline-none w-44"
              />
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#ffb77d] text-[#4d2600] font-mono text-xs px-5 py-2.5 rounded-full font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
            >
              START RESEARCH
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[750px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 py-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#221f1c] border border-[#554336] rounded-full font-mono text-xs text-[#ffb77d]">
              <span className="w-2 h-2 bg-[#ffb77d] rounded-full animate-pulse" />
              <span>VERIFICATION PROTOCOL v4.2 ACTIVE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-[72px] md:leading-[80px] text-[#e8e1dd] max-w-3xl mx-auto font-bold tracking-tight">
              The Research Operating System for the Truth.
            </h1>

            <p className="font-serif text-base sm:text-lg text-[#dbc2b0] max-w-2xl mx-auto leading-relaxed">
              Autonomous multi-agent verification for analysts, journalists, and researchers who demand absolute accuracy in a world of algorithmic noise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => navigate('/login')}
                className="bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono text-xs font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest shadow-xl shadow-[#ffb77d]/10"
              >
                <span>INITIATE SESSION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-[#a38c7c] text-[#e8e1dd] font-mono text-xs px-8 py-4 rounded-full hover:bg-[#383431] transition-all cursor-pointer uppercase tracking-widest"
              >
                VIEW METHODOLOGY
              </button>
            </div>
          </div>
        </section>

        {/* Pipeline Graphic Section */}
        <section className="py-24 border-y border-[#554336] bg-[#1e1b19] relative">
          <div className="max-w-[1200px] mx-auto px-6 space-y-16">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#e8e1dd]">The Multi-Agent Pipeline</h2>
              <p className="font-mono text-xs text-[#dbc2b0] tracking-widest uppercase">SERIAL CROSS-EXAMINATION ARCHITECTURE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Connector Line (Desktop Only) */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#554336] to-transparent z-0" />

              {/* Step 1: Research */}
              <div className="relative z-10 flex flex-col items-center group text-center space-y-3">
                <div className="w-20 h-20 bg-[#383431] border border-[#554336] rounded-xl flex items-center justify-center transition-all group-hover:border-[#ffb77d]">
                  <Search className="w-8 h-8 text-[#ffb77d]" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd] tracking-wider uppercase">RESEARCH</h3>
                <p className="text-xs font-sans text-[#dbc2b0]/70 px-2 leading-relaxed">Deep crawling of unstructured archives and real-time feeds.</p>
              </div>

              {/* Step 2: Verification */}
              <div className="relative z-10 flex flex-col items-center group text-center space-y-3">
                <div className="w-20 h-20 bg-[#383431] border border-[#554336] rounded-xl flex items-center justify-center transition-all group-hover:border-[#ffb77d]">
                  <CheckSquare className="w-8 h-8 text-[#ffb77d]" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd] tracking-wider uppercase">VERIFICATION</h3>
                <p className="text-xs font-sans text-[#dbc2b0]/70 px-2 leading-relaxed">Triple-blind cross-referencing against primary documentation.</p>
              </div>

              {/* Step 3: Contradiction */}
              <div className="relative z-10 flex flex-col items-center group text-center space-y-3">
                <div className="w-20 h-20 bg-[#383431] border border-[#554336] rounded-xl flex items-center justify-center transition-all group-hover:border-red-500">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd] tracking-wider uppercase">CONTRADICTION</h3>
                <p className="text-xs font-sans text-[#dbc2b0]/70 px-2 leading-relaxed">Active pursuit of counter-evidence to stress-test claims.</p>
              </div>

              {/* Step 4: Confidence */}
              <div className="relative z-10 flex flex-col items-center group text-center space-y-3">
                <div className="w-20 h-20 bg-[#383431] border border-[#554336] rounded-xl flex items-center justify-center transition-all group-hover:border-[#ffb77d]">
                  <BarChart3 className="w-8 h-8 text-[#ffb77d]" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd] tracking-wider uppercase">CONFIDENCE</h3>
                <p className="text-xs font-sans text-[#dbc2b0]/70 px-2 leading-relaxed">Probabilistic scoring based on source authority & data density.</p>
              </div>

              {/* Step 5: Citation */}
              <div className="relative z-10 flex flex-col items-center group text-center space-y-3">
                <div className="w-20 h-20 bg-[#383431] border border-[#554336] rounded-xl flex items-center justify-center transition-all group-hover:border-[#ffb77d]">
                  <BookOpen className="w-8 h-8 text-[#ffb77d]" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#e8e1dd] tracking-wider uppercase">CITATION</h3>
                <p className="text-xs font-sans text-[#dbc2b0]/70 px-2 leading-relaxed">Granular attribution linked to the exact point of origin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="py-28 bg-[#151310]">
          <div className="max-w-[1200px] mx-auto px-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Feature 1: Evidence-backed reports */}
              <div className="md:col-span-8 bg-[#221f1c] border border-[#554336] p-8 md:p-10 rounded-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4 max-w-lg">
                  <span className="font-mono text-xs text-[#ffb77d] uppercase tracking-wider block">EVIDENCE-BACKED REPORTS</span>
                  <h2 className="font-serif text-3xl font-bold text-[#e8e1dd] leading-tight">Narratives built on bedrock, not hallucination.</h2>
                  <p className="font-serif text-base text-[#dbc2b0] leading-relaxed">Every sentence in a Pramāṇa report is derived from verified data points. Our agents do not generate "best guesses"; they reconstruct the truth from the ground up.</p>
                </div>
              </div>

              {/* Feature 2: Conflict Flagging */}
              <div className="md:col-span-4 bg-[#2d2927] border border-[#554336] p-8 md:p-10 rounded-xl space-y-6">
                <div className="w-12 h-12 bg-red-950/40 border border-red-800/40 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#e8e1dd]">Conflict Flagging</h3>
                <p className="font-sans text-xs text-[#dbc2b0] leading-relaxed">Automated detection of contradictory statements across multiple sources. We don't hide the mess; we highlight the disagreement for your review.</p>
                <ul className="space-y-2 font-mono text-[10px]">
                  <li className="flex items-center gap-2 text-red-400"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> SOURCE A CONTRADICTS SOURCE C</li>
                  <li className="flex items-center gap-2 text-[#dbc2b0]"><span className="w-1.5 h-1.5 bg-[#dbc2b0] rounded-full" /> TEMPORAL DISCREPANCY DETECTED</li>
                </ul>
              </div>

              {/* Feature 3: Transparent Citations */}
              <div className="md:col-span-4 bg-[#1e1b19] border border-[#554336] p-8 md:p-10 rounded-xl space-y-4 border-l-2 border-l-[#ffb77d]">
                <Link className="w-6 h-6 text-[#ffb77d]" />
                <h3 className="font-serif text-2xl font-bold text-[#e8e1dd]">Transparent Citations</h3>
                <p className="font-sans text-xs text-[#dbc2b0] leading-relaxed">Interactive footnotes that reveal the exact snippet, source credibility score, and timestamp of the verified data point.</p>
              </div>

              {/* Feature 4: Autonomous Discovery */}
              <div className="md:col-span-8 bg-[#221f1c] border border-[#554336] p-8 md:p-10 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-[#ffb77d]" />
                  <h3 className="font-serif text-2xl font-bold text-[#e8e1dd]">Autonomous Discovery</h3>
                </div>
                <p className="font-mono text-xs text-[#ffb77d] uppercase tracking-widest">MULTI-AGENT COORDINATION MAP</p>
                <div className="h-40 w-full bg-[#151310] rounded border border-[#554336] flex items-center justify-center font-mono text-xs text-[#dbc2b0]/50">
                  Global Multi-Agent Topology • Real-time Node Dispatching
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#151310] border-t border-[#554336] text-center space-y-8 px-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-4xl font-bold text-[#e8e1dd]">Ready to define the truth?</h2>
            <p className="font-serif text-lg text-[#dbc2b0] leading-relaxed">
              Join elite research institutions and investigative journalists using Pramāṇa to secure their intellectual foundations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#ffb77d] hover:brightness-110 text-[#4d2600] font-mono font-bold text-xs px-10 py-5 rounded-full uppercase tracking-widest transition-all cursor-pointer shadow-xl shadow-[#ffb77d]/10"
            >
              START RESEARCH NOW
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-[#e8e1dd] font-mono text-xs border-b border-[#a38c7c] hover:border-[#ffb77d] transition-colors py-1 cursor-pointer uppercase tracking-wider"
            >
              TALK TO AN ARCHITECT
            </button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#100e0b] border-t border-[#554336] py-16 px-6">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <span className="font-serif text-3xl font-bold text-[#e8e1dd]">Pramāṇa</span>
              <p className="font-mono text-xs text-[#dbc2b0] max-w-xs">
                RESEARCH OPERATING SYSTEM FOR ENTERPRISE TRUTH-VERIFICATION.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 font-mono text-xs">
              <div className="space-y-3">
                <p className="text-[#e8e1dd] font-bold">PLATFORM</p>
                <ul className="space-y-2 text-[#dbc2b0]/70 font-sans text-xs">
                  <li><button onClick={() => navigate('/dashboard')} className="hover:text-[#ffb77d]">Dashboard</button></li>
                  <li><button onClick={() => navigate('/research/new')} className="hover:text-[#ffb77d]">Research Hub</button></li>
                  <li><button onClick={() => navigate('/agents')} className="hover:text-[#ffb77d]">Agent API</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-[#e8e1dd] font-bold">COMPANY</p>
                <ul className="space-y-2 text-[#dbc2b0]/70 font-sans text-xs">
                  <li><a href="#" className="hover:text-[#ffb77d]">Methodology</a></li>
                  <li><a href="#" className="hover:text-[#ffb77d]">Privacy</a></li>
                  <li><a href="#" className="hover:text-[#ffb77d]">Security</a></li>
                </ul>
              </div>

              <div className="space-y-3 hidden sm:block">
                <p className="text-[#e8e1dd] font-bold">CONTACT</p>
                <ul className="space-y-2 text-[#dbc2b0]/70 font-sans text-xs">
                  <li><a href="#" className="hover:text-[#ffb77d]">Support</a></li>
                  <li><a href="#" className="hover:text-[#ffb77d]">Press</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#554336]/40 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#dbc2b0]/50">
            <p>© 2026 PRAMĀṆA AI RESEARCH. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <span>SYSTEM STATUS: OPTIMAL</span>
              <span>ENCRYPTION: AES-256</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
