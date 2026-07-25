import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleAnonymousLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto pt-12 pb-20 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 mx-auto flex items-center justify-center text-purple-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-white">Welcome to Pramāṇa AI</h1>
        <p className="text-xs text-zinc-400">Authenticate to persist research sessions & history</p>
      </div>

      <div className="p-6 md:p-8 rounded-2xl bg-[#111113] border border-[#27272A] space-y-6 shadow-2xl">
        {/* Instant Anonymous Mode Option */}
        <button
          onClick={handleAnonymousLogin}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/50 hover:bg-purple-900/40 text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <UserCheck className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-xs font-semibold text-purple-200">Continue as Instant Researcher</div>
              <div className="text-[10px] text-zinc-400">No email required • Instant access</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative flex items-center justify-center">
          <hr className="w-full border-[#27272A]" />
          <span className="absolute bg-[#111113] px-3 text-[10px] font-mono text-zinc-500 uppercase">
            Or Sign In With Email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@university.edu"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-purple-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-purple-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
