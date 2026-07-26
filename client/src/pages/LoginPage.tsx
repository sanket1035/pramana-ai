import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, User, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, signupWithEmail, loginWithGoogle, loginAnonymously } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp && password !== confirmPassword) {
      setError('Passphrases do not match. Please verify your passphrase.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signupWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      const msg = err?.message || 'Authentication error. Please check your credentials.';
      if (msg.includes('auth/user-not-found') || msg.includes('auth/invalid-credential')) {
        setError('Invalid email or passphrase. Please try again or create an account.');
      } else if (msg.includes('auth/email-already-in-use')) {
        setError('Account with this email already exists. Please sign in instead.');
      } else if (msg.includes('auth/weak-password')) {
        setError('Passphrase should be at least 6 characters long.');
      } else {
        setError(msg);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      console.error('Google Auth Error:', err);
      const msg = err?.message || 'Failed to sign in with Google.';
      if (msg.includes('auth/popup-closed-by-user')) {
        setError('Google sign-in window was closed. Click Continue with Google to try again.');
      } else if (msg.includes('auth/unauthorized-domain')) {
        setError('Domain not authorized in Firebase Console. Please add localhost to Authorized Domains.');
      } else {
        setError(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#151310] text-[#e8e1dd] flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-[460px] space-y-6">
        <div className="bg-[#1e1b19] border border-[#554336] p-8 md:p-10 rounded shadow-2xl flex flex-col items-center">
          {/* Logo Header */}
          <header className="mb-6 text-center flex flex-col items-center">
            <img src="/Pramana-Ai.png" alt="Pramāṇa AI" className="w-12 h-12 object-contain rounded mb-2" />
            <h1 className="font-serif text-4xl font-bold text-[#e8e1dd] mb-1">Pramāṇa</h1>
            <p className="font-mono text-xs text-[#dbc2b0] uppercase tracking-widest">Research Workspace</p>
          </header>

          {/* Auth Tab Switcher (SIGN IN / SIGN UP) */}
          <div className="grid grid-cols-2 gap-2 w-full p-1 bg-[#151310] border border-[#554336] rounded mb-6 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className={`py-2 text-center rounded transition-all cursor-pointer uppercase font-bold ${
                !isSignUp ? 'bg-[#ffb77d] text-[#4d2600]' : 'text-[#dbc2b0] hover:text-[#e8e1dd]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className={`py-2 text-center rounded transition-all cursor-pointer uppercase font-bold ${
                isSignUp ? 'bg-[#ffb77d] text-[#4d2600]' : 'text-[#dbc2b0] hover:text-[#e8e1dd]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="w-full mb-5 p-3 bg-red-950/40 border border-red-800/60 rounded text-red-300 font-mono text-xs flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Main Auth Form */}
          <form onSubmit={handleFormSubmit} className="w-full space-y-4">
            {/* Full Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <label className="font-mono text-[11px] text-[#dbc2b0] flex items-center gap-2 uppercase tracking-wider" htmlFor="name">
                  <User className="w-3.5 h-3.5 text-[#ffb77d]" />
                  FULL NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Sanket Chaudhari"
                  className="w-full bg-[#151310] border border-[#554336] focus:border-[#ffb77d] text-[#e8e1dd] placeholder-[#a38c7c]/50 font-sans text-xs px-4 py-3 rounded outline-none transition-all"
                />
              </div>
            )}

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

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <label className="font-mono text-[11px] text-[#dbc2b0] flex items-center gap-2 uppercase tracking-wider" htmlFor="confirmPassword">
                  <Lock className="w-3.5 h-3.5 text-[#ffb77d]" />
                  CONFIRM PASSPHRASE
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required={isSignUp}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#151310] border border-[#554336] focus:border-[#ffb77d] text-[#e8e1dd] placeholder-[#a38c7c]/50 font-sans text-xs px-4 py-3 rounded outline-none transition-all"
                />
              </div>
            )}

            {/* Primary CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffb77d] hover:brightness-110 active:scale-[0.98] transition-all py-3.5 px-6 font-mono text-xs text-[#4d2600] font-bold tracking-widest uppercase flex justify-center items-center gap-2 group cursor-pointer mt-2"
            >
              <span>{loading ? 'VERIFYING...' : isSignUp ? 'CREATE RESEARCH ACCOUNT' : 'INITIATE SESSION'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 my-6">
            <div className="h-[1px] flex-grow bg-[#554336]" />
            <span className="font-mono text-[10px] text-[#a38c7c] tracking-widest">OR</span>
            <div className="h-[1px] flex-grow bg-[#554336]" />
          </div>

          {/* Google OAuth Button */}
          <div className="w-full">
            <button
              type="button"
              onClick={handleGoogleAuth}
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

