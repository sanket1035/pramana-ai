import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAnonymously } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleGoogleLogin = () => {
    login('researcher.google@pramana.ai');
    navigate('/dashboard');
  };

  const handleAnonLogin = () => {
    loginAnonymously();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#151310] text-[#e8e1dd] flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-[440px] space-y-6">
        <div className="bg-[#1e1b19] border border-[#554336] p-8 md:p-10 rounded shadow-2xl flex flex-col items-center">
          {/* Logo Section */}
          <header className="mb-8 text-center">
            <h1 className="font-serif text-4xl font-bold text-[#e8e1dd] mb-1">Pramāṇa</h1>
            <p className="font-mono text-xs text-[#dbc2b0] uppercase tracking-widest">Research Workspace</p>
          </header>

          {/* Main Auth Form */}
          <form onSubmit={handleFormSubmit} className="w-full space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-[#dbc2b0] flex items-center gap-2 uppercase tracking-wider" htmlFor="email">
                <Mail className="w-3.5 h-3.5 text-[#ffb77d]" />
                EMAIL IDENTIFIER
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@org.ai"
                className="w-full bg-[#151310] border border-[#554336] focus:border-[#ffb77d] text-[#e8e1dd] placeholder-[#a38c7c]/50 font-sans text-xs px-4 py-3 rounded outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-[#dbc2b0] flex items-center gap-2 uppercase tracking-wider" htmlFor="password">
                <Lock className="w-3.5 h-3.5 text-[#ffb77d]" />
                PASSPHRASE
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#151310] border border-[#554336] focus:border-[#ffb77d] text-[#e8e1dd] placeholder-[#a38c7c]/50 font-sans text-xs px-4 py-3 rounded outline-none transition-all"
              />
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffb77d] hover:brightness-110 active:scale-[0.98] transition-all py-3.5 px-6 font-mono text-xs text-[#4d2600] font-bold tracking-widest uppercase flex justify-center items-center gap-2 group cursor-pointer"
            >
              <span>{loading ? 'VERIFYING...' : 'INITIATE SESSION'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 my-6">
            <div className="h-[1px] flex-grow bg-[#554336]" />
            <span className="font-mono text-[10px] text-[#a38c7c] tracking-widest">OR</span>
            <div className="h-[1px] flex-grow bg-[#554336]" />
          </div>

          {/* Secondary Options */}
          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-[#554336] hover:bg-[#2d2927] text-[#e8e1dd] font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>CONTINUE WITH GOOGLE</span>
            </button>

            <button
              type="button"
              onClick={handleAnonLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#554336] hover:bg-[#2d2927] text-[#e8e1dd] font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#ffb77d]" />
              <span>ENTER ANONYMOUSLY</span>
            </button>
          </div>
        </div>

        {/* Decorative Info Bit */}
        <div className="flex items-start gap-3 p-4 border-l-2 border-[#ffb77d] bg-[#1e1b19]">
          <ShieldCheck className="w-5 h-5 text-[#ffb77d] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-[#dbc2b0]/80 font-sans">
            <strong className="text-[#e8e1dd]">Precision Protocols Active:</strong> Workspace is monitored for academic integrity and verification standards. All sessions use Post-Quantum cryptographic layers.
          </p>
        </div>
      </main>
    </div>
  );
};
